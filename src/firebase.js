/* eslint-disable object-curly-newline */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC8eUvVA4mZbW8WfSchQqnoNMYtctwTdPI',
  authDomain: 'mssapp-4586c.firebaseapp.com',
  projectId: 'mssapp-4586c',
  storageBucket: 'mssapp-4586c.appspot.com',
  messagingSenderId: '984759003916',
  appId: '1:984759003916:web:7852e781e07c3239f7f729',
  measurementId: 'G-PM9L1W70QH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
