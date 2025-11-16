import serial
import time
import firebase_admin
from firebase_admin import credentials, db

# -------- Firebase Setup --------
cred = credentials.Certificate('c:/Users/vijet/Downloads/sleep-sprout-firebase-adminsdk-fbsvc-22ec7bc517.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://sleep-sprout-default-rtdb.firebaseio.com/'
})

root = db.reference('/CPXData')

# -------- Serial Setup --------
ser = serial.Serial('COM13', 9600)
time.sleep(2)

# -------- Session State --------
current_session_ref = None
session_id = None

def start_new_session():
    global current_session_ref, session_id
    
    start_time = int(time.time())
    session_id = f"session_{start_time}"
    
    current_session_ref = root.child(session_id)
    current_session_ref.set({
        "started": start_time,
        "ended": None,
        "records": {}
    })
    
    print(f" New session started: {session_id}")

def end_current_session():
    global current_session_ref
    
    if current_session_ref is None:
        print(" No session to end")
        return
    
    end_time = int(time.time())
    current_session_ref.update({"ended": end_time})
    print(f" Session ended at {end_time}\n")

    # Reset reference
    current_session_ref = None

# -------- Main Loop --------
while True:
    try:
        line = ser.readline().decode().strip()
        if not line:
            continue

        print("RAW:", line)  # Debug

        # ----- Handle ON/OFF -----
        if line == "ON":
            start_new_session()
            continue

        if line == "OFF":
            end_current_session()
            continue

        # ----- Ignore data if not in session -----
        if current_session_ref is None:
            print("Ignoring data (not in session).")
            continue

        # ----- CSV Data (numMoved, numSnore, temp) -----
        parts = line.split(',')
        if len(parts) != 3:
            print("Unexpected format:", line)
            continue

        numMoved = int(parts[0])
        numSnore = int(parts[1])
        tempVal = float(parts[2])

        record = {
            "numMoved": numMoved,
            "numSnore": numSnore,
            "temptoGive": tempVal,
            "timestamp": int(time.time())
        }

        # push record under: /CPXData/session_xxx/records/
        current_session_ref.child("records").push(record)

        print("→ Saved record:", record)

    except Exception as e:
        print("Error:", e)

    time.sleep(0.1)
