/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
// Import the functions you need from the SDKs you need
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
const messaging = getMessaging(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const getTokenFn = (setTokenFound, setTokenMessaging) => {
  return getToken(messaging, { vapidKey: 'BAz2fn9e0U2sX_dksgBxNERgFUT-_bkG9XS0z1CAWZ-Y6zJyXvEA7Og7HcHxMTXDg0g875M1tw04VTREnVyuozs' }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenMessaging(currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
};

const onMessageListener = () => new Promise((resolve) => {
  onMessage(messaging, (payload) => {
    resolve(payload);
  });
});

export { db, auth, storage, getTokenFn, onMessageListener };
