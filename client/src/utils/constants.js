const STRATEGY = "local";
const GOOGLE_STRATEGY = "google";

const STANDARD_BG = "#091921";
const BG_IMAGE = "";

const BODY_REF = document.querySelector(".root");

const addBoardColors = [
  {
    name: "#003b5c",
    backgroundColor: "#003b5c",
  },
  {
    name: "#7e2861",
    backgroundColor: "#7e2861",
  },
  {
    name: "#27461c",
    backgroundColor: "#27461c",
  },
  {
    name: "#4e2118",
    backgroundColor: "#4e2118",
  },
];

const authFormTypeLogin = "login";
const authFormTypeSignup = "signup";

const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3030"
    : process.env.JS_ORIGINS_1;
console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

export {
  STRATEGY,
  STANDARD_BG,
  BODY_REF,
  BG_IMAGE,
  addBoardColors,
  authFormTypeLogin,
  authFormTypeSignup,
  BASE_URL,
  GOOGLE_STRATEGY,
};
