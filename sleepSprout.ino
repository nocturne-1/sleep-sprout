#include <Adafruit_CircuitPlayground.h>
#include "DHT.h"

#define DHTPIN 10  // Classic uses pin 10
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// --- sound sensor variables ---
const int soundThresholdHigh = 50;   // Positive threshold
const int soundThresholdLow = -50;   // Negative threshold
int numMoved = 0;
int numSnore = 0;
int temptoGive = 0;
const int switchPin = 6;  // Classic uses pin 5 for slide switch

bool isOn = false;
unsigned long lastSwitchMillis = 0;
const unsigned long debounceTime = 3000; // ms

// --- temperature smoothing ---
#define NUM_SAMPLES 5
float tempHistory[NUM_SAMPLES];
int tempIndex = 0;

// --- accelerometer ---
const float accelThreshold = 1.0;
float prevX = 0, prevY = 0, prevZ = 0;

// --- timing intervals ---
unsigned long lastSoundMillis = 0;
unsigned long lastTempMillis = 0;
unsigned long lastAccelMillis = 0;
int lastSwitchState = HIGH;

const unsigned long soundInterval = 500;     // 50 Hz
const unsigned long tempInterval = 1000;    // 1 Hz
const unsigned long accelInterval = 200;    // 5 Hz

unsigned long lastFirebaseMillis = 0;
const unsigned long firebaseInterval = 5000; // 5 seconds
unsigned long lastToggleMillis = 0;
const unsigned long toggleDelay = 1000; // 1 second between toggles

void setup() {
  Serial.begin(9600);
  CircuitPlayground.begin();
  dht.begin();

  // init temperature history
  for (int i = 0; i < NUM_SAMPLES; i++) tempHistory[i] = 0;

  // init accelerometer
  prevX = CircuitPlayground.motionX();
  prevY = CircuitPlayground.motionY();
  prevZ = CircuitPlayground.motionZ();
  pinMode(switchPin, INPUT_PULLUP);
}

void loop() {
   int switchState = digitalRead(switchPin);

  // --- BUTTON TOGGLE ---
  if (switchState == HIGH && lastSwitchState == LOW && (millis() - lastToggleMillis) > toggleDelay) {
    isOn = !isOn;
    Serial.println(isOn ? "ON" : "OFF");
    lastToggleMillis = millis();
  }

  lastSwitchState = switchState;

  if (isOn) { 
    {
    unsigned long currentMillis = millis();

    // --- SOUND SENSOR ---
    if (currentMillis - lastSoundMillis >= soundInterval) {
      lastSoundMillis = currentMillis;
      int sound = CircuitPlayground.soundSensor();

      if (sound > soundThresholdHigh || sound < soundThresholdLow) {
        numSnore++;
      }
    }

    // --- TEMPERATURE / HUMIDITY ---
    if (currentMillis - lastTempMillis >= tempInterval) {
      lastTempMillis = currentMillis;
      float tempC = dht.readTemperature();
      float hum = dht.readHumidity();

      if (!isnan(tempC) && !isnan(hum)) {
        tempHistory[tempIndex] = tempC;
        tempIndex = (tempIndex + 1) % NUM_SAMPLES;

        float sum = 0;
        for (int i = 0; i < NUM_SAMPLES; i++) sum += tempHistory[i];
        float avgTempC = sum / NUM_SAMPLES;
        float avgTempF = avgTempC * 9.0 / 5.0 + 32.0;

        temptoGive = avgTempF;
      }
    }

    // --- ACCELEROMETER / MOTION ---
    if (currentMillis - lastAccelMillis >= accelInterval) {
      lastAccelMillis = currentMillis;

      float x = CircuitPlayground.motionX();
      float y = CircuitPlayground.motionY();
      float z = CircuitPlayground.motionZ();

      if (abs(x - prevX) > accelThreshold) numMoved++;
      if (abs(y - prevY) > accelThreshold) numMoved++;
      if (abs(z - prevZ) > accelThreshold) numMoved++;

      prevX = x;
      prevY = y;
      prevZ = z;
    }

    // --- SEND / UPDATE VARIABLES EVERY 5 SECONDS ---
    if (currentMillis - lastFirebaseMillis >= firebaseInterval) {
      lastFirebaseMillis = currentMillis;

      Serial.print(numMoved);
      Serial.print(",");
      Serial.print(numSnore);
      Serial.print(",");
      Serial.println(temptoGive);

      numMoved = 0;
      numSnore = 0;
    }
  }
  }}