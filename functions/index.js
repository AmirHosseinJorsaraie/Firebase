import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

const app = express();

export const api = functions.https.onRequest(app);