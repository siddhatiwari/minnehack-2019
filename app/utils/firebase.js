import firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyCicZdBAwDy2n1-K_mE8tRPq9dkwibj_pM",
  authDomain: "cornhub-65e53.firebaseapp.com",
  databaseURL: "https://cornhub-65e53.firebaseio.com",
  projectId: "cornhub-65e53",
  storageBucket: "cornhub-65e53.appspot.com",
  messagingSenderId: "96251263680"
};
firebase.initializeApp(config);
const db = firebase.firestore();

export { db };

