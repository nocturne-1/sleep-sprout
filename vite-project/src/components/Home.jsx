import React, { useEffect, useState } from 'react';
import cong from "../configuration";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "../configuration";
import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth'
import '../App.css'

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {

    const database = getDatabase(cong);
    
    const collectionRef = ref(database, "/");

    const fetchData = () => {
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        if (dataItem) {
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };

    fetchData();
  }, []);

  const onLogout = async () => {
    try {
            await signOut(auth);
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout error:', error.message);
    }
  };

  return (
    <div>
      <h1>Data from database:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
}

export default Home;