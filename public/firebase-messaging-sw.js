// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyDayQNuzqtuXFOMS8KtQ_ydDDP-5cOKYlY',
  authDomain: 'fireact-soltani.firebaseapp.com',
  projectId: 'fireact-soltani',
  storageBucket: 'fireact-soltani.appspot.com',
  messagingSenderId: '993041515803',
  appId: '1:993041515803:web:533b3b33b1895dcd1d7fbe',
  measurementId: 'G-L41P8BLJVV',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
