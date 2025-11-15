import React, { useEffect, useState } from 'react';
import cong from "../configuration";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Welcome from './Welcome';
import WelcomeLogIn from './WelcomeLogIn';
import { auth } from '../configuration';
import '../App.css'
import { onAuthStateChanged } from 'firebase/auth';

// App.js

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  function ProtectedRoute({ user, children }) {
    if (!user) return <Navigate to="/" />;
    return children;
  }

  return (

      <Routes>
            <Route 
              path="/" 
              element={<Login />} 
            />
              
            <Route 
                path="/home" 
                element={<Home />}
            />

            <Route 
              path="/welcome"
              element={<Welcome />}
            />
      </Routes>
    );
}

export default App;