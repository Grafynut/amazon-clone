
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDqPFX6Hsynb2RsDDpBVnxXVSIpZ0tLrts",
    authDomain: "clone-3355a.firebaseapp.com",
    projectId: "clone-3355a",
    storageBucket: "clone-3355a.appspot.com",
    messagingSenderId: "774731820277",
    appId: "1:774731820277:web:8b69464a0472f094dda9bc",
    measurementId: "G-QJLBRGKF4N"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { db, auth };

