/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyC8eUvVA4mZbW8WfSchQqnoNMYtctwTdPI',
  authDomain: 'mssapp-4586c.firebaseapp.com',
  projectId: 'mssapp-4586c',
  storageBucket: 'mssapp-4586c.appspot.com',
  messagingSenderId: '984759003916',
  appId: '1:984759003916:web:7852e781e07c3239f7f729',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
