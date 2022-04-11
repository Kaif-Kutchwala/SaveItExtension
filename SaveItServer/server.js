import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

var express = require("express");
var fs = require("fs");
var https = require("https");
var app = express();
const dotenv = require("dotenv");
var port = 3000;

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "saveitextension.firebaseapp.com",
  projectId: "saveitextension",
  storageBucket: "saveitextension.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var server = https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  },
  app
);
server.listen(port, () => {
  console.log(`Server started. Listening on port: ${port}`);
});
