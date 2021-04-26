'use strict';

const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const {Logging} = require('@google-cloud/logging');
const logging = new Logging({
    projectId: process.env.GCLOUD_PROJECT,
});

/**
 *
 * @type {CloudFunction<UserRecord>}
 */
exports.createCustomer = functions.auth.user().onCreate(async (user) => {
    // const customer = await stripe.customers.create({email: user.email});
    // const intent = await stripe.setupIntents.create({
    //     customer: customer.id,
    //     setup_secret: intent.client_secret,
    // });
    await admin.firestore().collection('site-users').doc(user.uid).set({
        user_address: user.email
    });
    return;
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


