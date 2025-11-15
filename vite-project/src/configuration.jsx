import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration 

const firebaseConfig = { 
    apiKey: "AIzaSyBOXWgoaueyX3TZ8DULTp-nLo3eb9aBseY", 
    authDomain: "sleep-sprout.firebaseapp.com", 
    projectId: "sleep-sprout", 
    storageBucket: "sleep-sprout.firebasestorage.app", 
    messagingSenderId: "559781372284", 
    appId: "1:559781372284:web:83c0faf0e194680b2e04f9" 
}; 

// Initialize Firebase 

const cong = initializeApp(firebaseConfig);

export default cong;
export const auth = getAuth(app);