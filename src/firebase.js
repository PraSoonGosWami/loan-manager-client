import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDGnZkTFybnng-uvZTi6v4Xf3bgtVwjx1g",
  authDomain: "loan-manager-323408.firebaseapp.com",
  projectId: "loan-manager-323408",
  storageBucket: "loan-manager-323408.appspot.com",
  messagingSenderId: "600151810808",
  appId: "1:600151810808:web:1a1ff6be728cbaa3e2110d",
  measurementId: "G-QDBYD8CJZ9",
});

export const firebaseMessaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;

export const askForPermissioToReceiveNotifications = async () => {
  return await Notification.requestPermission();
};
