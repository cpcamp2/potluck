import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyB1PGcC1F4AkbaaoX77cGxzEHKddibXn58",
  authDomain: "potluck-ca4a6.firebaseapp.com",
  databaseURL: "https://potluck-ca4a6.firebaseio.com",
  projectId: "potluck-ca4a6",
  storageBucket: "potluck-ca4a6.appspot.com",
  messagingSenderId: "607963631070"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
