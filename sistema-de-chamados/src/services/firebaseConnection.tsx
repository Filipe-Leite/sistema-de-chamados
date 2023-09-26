import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAmRpzNMRytV7IJwviT4mZDRSUd-x43uDA",
    authDomain: "tickets-7ac0a.firebaseapp.com",
    projectId: "tickets-7ac0a",
    storageBucket: "tickets-7ac0a.appspot.com",
    messagingSenderId: "1030811866056",
    appId: "1:1030811866056:web:df152083e2c199966526fd",
    measurementId: "G-KBV2PJPF45"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp);

export { auth, db, storage };