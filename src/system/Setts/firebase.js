import firebase from "firebase";

const {
  REACT_APP_API__KEY_FIREBASE_AUTH,
  REACT_APP_AUTH__DOMAIN_FIREBASE_AUTH,
  REACT_APP_PROJECT__ID_FIREBASE_AUTH,
  REACT_APP_STORAGE__BUCKET_FIREBASE_AUTH,
  REACT_APP_MESSAGING__SENDER__ID_FIREBASE_AUTH,
  REACT_APP_APP__ID_FIREBASE_AUTH,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API__KEY_FIREBASE_AUTH,
  authDomain: REACT_APP_AUTH__DOMAIN_FIREBASE_AUTH,
  projectId: REACT_APP_PROJECT__ID_FIREBASE_AUTH,
  storageBucket: REACT_APP_STORAGE__BUCKET_FIREBASE_AUTH,
  messagingSenderId: REACT_APP_MESSAGING__SENDER__ID_FIREBASE_AUTH,
  appId: REACT_APP_APP__ID_FIREBASE_AUTH,
};

const bd = firebase.initializeApp(firebaseConfig);

export default bd;