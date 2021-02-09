import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const {
  REACT_APP_API__KEY_FIREBASE_AUTH,
  REACT_APP_AUTH__DOMAIN_FIREBASE_AUTH,
  REACT_APP_STORAGE__BUCKET_FIREBASE_AUTH,
  REACT_APP_MESSAGING__SENDER__ID_FIREBASE_AUTH,
  REACT_APP_APP__ID_FIREBASE_AUTH,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API__KEY_FIREBASE_AUTH,
  authDomain: REACT_APP_AUTH__DOMAIN_FIREBASE_AUTH,
  projectId: "movie-searcher-a4582",
  storageBucket: REACT_APP_STORAGE__BUCKET_FIREBASE_AUTH,
  messagingSenderId: REACT_APP_MESSAGING__SENDER__ID_FIREBASE_AUTH,
  appId: REACT_APP_APP__ID_FIREBASE_AUTH,
};

export const db = firebase.initializeApp(firebaseConfig, "Movies 46");
export const firestore = db.firestore();
export const usersCollection = firestore.collection("users");

export const logoutWrapper = (dispatchLogout) => {
  return async () => {
    const auth = db.auth();
    try {
      await auth.signOut();
      dispatchLogout();
      window.location.reload();
      localStorage.setItem("isLogged", false);
      console.log("signed out");
    } catch (e) {
      console.log("sign out error", e);
    }
  };
};

export const createUserDataCollation = async (userData, rootCollection) => {
  const { uid, email } = userData;
  const userDoc = rootCollection.doc(uid);
  try {
    await userDoc.set({
      email: email,
      photoURL: "",
      displayName: "",
    });

    await userDoc.collection("movies").doc("favorites").set({
      data: [],
    });
    await userDoc.collection("movies").doc("liked").set({
      data: [],
    });
  } catch (e) {
    console.error("create collation error: ", e);
  }
};
// export const auth = db.auth;
