import * as functions from "firebase-functions";
import admin from "firebase-admin";
import express from "express";
import cors from 'cors';
import bodyparser from 'body-parser';
import { routeConfig } from './users/routes-config.js';

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({
    credential: admin.credential.cert({
        apiKey: "AIzaSyBRp_mHLZw6lt3M-E6tllBgOWTSF8d2qxA",
        authDomain: "nodejs-c98a6.firebaseapp.com",
        projectId: "nodejs-c98a6",
        storageBucket: "nodejs-c98a6.appspot.com",
        messagingSenderId: "691481023995",
        appId: "1:691481023995:web:1dd74c429114211829675e",
        measurementId: "G-BNWBGEW5NG"
      })
})

const app = express()
app.use(bodyparser.json())
app.use(cors({ origin: true }))

routeConfig(app)

export const api = functions.https.onRequest(app)