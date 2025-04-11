
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUGbBTkVu9v4wUHfsCIFuyCGYOCD2zmPA",
  authDomain: "quebrain-9f879.firebaseapp.com",
  projectId: "quebrain-9f879",
  storageBucket: "quebrain-9f879.firebasestorage.app",
  messagingSenderId: "497652161268",
  appId: "1:497652161268:web:4f073ce1d44c4d6eed1ca1",
  measurementId: "G-2HS71J3C1T"
};

let firebaseApp: FirebaseApp;
let firebaseAuth: Auth;

// Initialize Firebase only on the client side
if (typeof window !== 'undefined') {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }

  firebaseAuth = getAuth(firebaseApp);
}

export { firebaseAuth, firebaseApp };
