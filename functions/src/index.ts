require('dotenv').config();
import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true });

import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';
const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
}
admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: process.env.FIREBASE_DATABASEURL
});
// Custom Services
import { slackBot, discordBot } from './services';


export const postMessageToChannel = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const { userId, gameName, betAmout } = request.body;
      if (!userId || !gameName || !betAmout) {
        throw new Error('Invalid request parameters');
      }
      const message = `User ${userId} is searching for a ${gameName} Match for ${betAmout}(€)`;
      console.log('message: ', message);
      // Note: We are not handling Exception in postMessage for testing so, it will throw an error and function executed with error response
      // We can handle Exception in postMessage by wrapping function into Try-Catch block so normal function exection flow is achived
      await slackBot.postMessage(message);
      await discordBot.postMessage(message);
      return response.status(200).json({
        status: 'success'
      });
    } catch (error) {
      console.error(error.message);
      return response.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  });
});
