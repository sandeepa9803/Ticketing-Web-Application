// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const startFirebase = () => {
    // web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDULKdeWeLZEUB0B7QZ_ok7LDdsMyp7wps",
        authDomain: "ticketing-app-89a17.firebaseapp.com",
        databaseURL: "https://ticketing-app-89a17-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "ticketing-app-89a17",
        storageBucket: "ticketing-app-89a17.appspot.com",
        messagingSenderId: "306166911256",
        appId: "1:306166911256:web:4b8dcbc30281c05eda8e6d"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    return getDatabase(app);
}

export default startFirebase;