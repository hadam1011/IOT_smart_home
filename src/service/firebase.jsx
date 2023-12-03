import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = { 
    apiKey : "AIzaSyCo0mMT1r5lTEUw9gcfN9I6Ov3SbbImNH0" , 
    authDomain : "iotbtl-c0844.firebaseapp.com" , 
    databaseURL : "https://iotbtl-c0844-default-rtdb.firebaseio.com" , 
    projectId : "iotbtl-c0844" , 
    storageBucket : "iotbtl-c0844.appspot.com" , 
    messagingSenderId : "481525659153" , 
    appId : "1:481525659153:web:5adf471c3996cabe3ee3b0" , 
    measurementId : "G-WC350J94Y3" 
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
