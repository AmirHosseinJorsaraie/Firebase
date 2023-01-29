import * as functions from "firebase-functions";
import * as admin from "firebase-admin/app";
import express from "express";
import cors from 'cors';
import bodyparser from 'body-parser';
import { routeConfig } from './users/routes-config.js';

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp()

const app = express()
app.use(bodyparser.json())
app.use(cors({ origin: true }))

routeConfig(app)

export const api = functions.https.onRequest(app)