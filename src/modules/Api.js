const admin = require("firebase-admin");
const serviceAccount = require("../../config/serviceAccountSetts.json");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const usersCollection = firestore.collection("users");

/*
admin
  .auth()
  .createCustomToken(userId, additionalClaims)
  .then((customToken) => {
    console.log("customToken: ", customToken);
    // Send token back to client
  })
  .catch((error) => {
    console.log("Error creating custom token:", error);
  });
  */

const {
  API__KEY_MOVIESEARCHER,
  API__KEY_MOVIESEARCHER_REQUEST_TOKEN,
} = process.env;

const setts = {
  API_KEY: API__KEY_MOVIESEARCHER,
  URL: "https://api.themoviedb.org/3/",
  CONFIG_URL: "https://api.themoviedb.org/3/configuration",
  SEARCH_URL: "https://api.themoviedb.org/3/search/movie?&api_key=",
  REQUEST_TOKEN: API__KEY_MOVIESEARCHER_REQUEST_TOKEN,
};

const getUsersInfo = async (email) => {
  try {
    const { uid } = await admin.auth().getUserByEmail(email);
    const user = await usersCollection.doc(uid).get();

    const res = {
      user: uid,
      userMovies: {},
      userData: user.data(),
    };

    const collection = await firestore
      .collection("users")
      .doc(uid)
      .collection("movies")
      .get();

    collection.forEach((item) => {
      const raw = item.data();

      res.userMovies[item.id] = raw.data;
    });

    return res;
  } catch (e) {
    console.log("get user by email error", e);
  }
};

const getUserDocument = (userId, docName) => {
  try {
    const res = firestore
      .collection("users")
      .doc(userId)
      .collection("movies")
      .doc(docName);
    return res;
  } catch (e) {
    console.log("get document error", e);
  }
};

const logoutFromFb = async () => {
  const auth = admin.auth();
  try {
    await auth.signOut();

    console.log("signed out");
  } catch (e) {
    console.log("sign out error", e);
  }
};

module.exports = {
  getUserDocument,
  logoutFromFb,
  setts,
  getUsersInfo,
};
