import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 
import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();  

// Enable Firestore network
firestore.enableNetwork().catch((error) => {
  console.log('Could not enable Firestore network:', error.message || error);
});

if (!firestore) {
  console.error('Firestore initialization failed');
}

if (!storage) {
  console.error('Storage initialization failed');
}

export { auth, firestore, storage };
