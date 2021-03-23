import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
//require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyB-nRH2R-XamO-GOApfT0ZJj8RVdWzSoZM",
  authDomain: "evernote-clone-2624d.firebaseapp.com",
  projectId: "evernote-clone-2624d",
  storageBucket: "evernote-clone-2624d.appspot.com",
  messagingSenderId: "814075315480",
  appId: "1:814075315480:web:1fbc0055e8a2a598ad0a6d",
  measurementId: "G-LNM5N4V927"
});
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
