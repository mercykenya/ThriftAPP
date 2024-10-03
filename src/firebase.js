// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv094hKVgQiHt7w4mgLtX_vDxevIazzA0",
  authDomain: "thriftnu-59202.firebaseapp.com",
  projectId: "thriftnu-59202",
  storageBucket: "thriftnu-59202.appspot.com",
  messagingSenderId: "874429241561",
  appId: "1:874429241561:web:19c225e2f0e6931ac746c8",
  databaseURL: "https://thriftnu-59202-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage();
const storageRef = ref(storage);

export { auth, database, storage };
