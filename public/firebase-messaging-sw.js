importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

firebase.initializeApp({
  apiKey: "AIzaSyB7c30ze2BDIuZWjjwtFW5NvtBZIpRkT80",
  authDomain: "nextjsnotification-aba04.firebaseapp.com",
  projectId: "nextjsnotification-aba04",
  storageBucket: "nextjsnotification-aba04.firebasestorage.app",
  messagingSenderId: "435203718719",
  appId: "1:435203718719:web:9f93b7d6b8b7bea1c9828a",
  measurementId: "G-1Y1SPGEQH6"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // Adjust the path to your icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
