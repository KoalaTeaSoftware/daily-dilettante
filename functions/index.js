/**
 # Overview
 ## Email Sender
 * This provides the server-side gate-keeping for the email-sending feature presented on the contact page
 * It uses nodemailer (which will have to be installed - to the functions dir, preferably)
 * it is going to send emails from&to the email address given in the configuration,
 but the reply-to is going to be what came in in the message
 * It depends on the config.json (the values in which should be used on the client-side so as to give a good user-experience)
 ## Tumblr reader
 * This is made necessary by browsers' tendency to refuse to perform cross-origin requests
 * It is a proxy that tells the browser that it does not care who talks to it
 * The use of the request-promise (which has to be installed, of course) vastly simplifies the process of
 * getting and sending-on the feed
 * request-promise depends on request, but you have to add this dependency by hand
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator')

const rp = require('request-promise');
// the above has a dependency which is not automatically installed, so also run `npm install request --save`

// const cors = require('cors')({origin: true});

admin.initializeApp();

const logger = require("firebase-functions/lib/logger");

/**
 *
 * This reads the 'built in' tumblr feed and returns what is read as a string that contains XML.
 * example call http://localhost:5001/daily-dilettante/us-central1/readTumblr?tag=article
 * If you provide a tag=... query parameter, this will be used to filter the reading, based on that tag
 * Clearly, you will have to coordinate your posting to go with your tagging, but as tumblr posts can contain many tags,
 * this should not be a headache
 * If you provide no query parameter (or one not called tag) you get them all
 */
exports.readTumblr = functions.https.onRequest((inputRequest, outputResponse) => {
    logger.info(`Requested tag: ${inputRequest.query.tag}`)
    let url = "https://dailydilettante.tumblr.com/api/read/xml"
    if (inputRequest.query.tag) {
        url += `?tagged=${inputRequest.query.tag}`
    }
    // This is the vital statement
    // It tells the requesting browser that I do not care who is calling this function
    outputResponse.set('Access-Control-Allow-Origin', '*');

    // logger.info("-------------------------------------------------------------------------")
    logger.info("Preparing to read the tumblr feed:" + url + ":")

    // xml is the default language of this feed, so adding the xml on the end is not really vital
    rp({uri: url})
        .then(result => {
            // logger.info('here is response: ' + result);
            outputResponse.status(200).type("text/xml").send(result)
        })
        .catch(err => {
            logger.debug(err)
            outputResponse.status(500).send(err)
        })
})

//when this cloud function is already deployed, change the origin to 'https://your-deployed-app-url
const cors = require('cors')({origin: true});
const config = require('./config.json');
const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: true, // true for 465, false for other ports
    auth: {
        user: config.user,
        pass: config.pass
    },
});

exports.sendMail = functions.https.onRequest((inputRequest, outputResponse) => {
    return cors(inputRequest, outputResponse, () => {
        outputResponse.set('Access-Control-Allow-Origin', '*');

        if (!Object.keys(inputRequest.body).length) {
            // it is likely that this has been called from a browser's address line
            logger.log("No data found")
            return outputResponse.status(400).send("No data found")
        } else {
            let params = JSON.parse(inputRequest.body)

            if ((typeof params.name === 'undefined') || (params.name === null) || !verifyName(params.name)) {
                logger.log("Name  is either inadequate, or contains bad characters");
                outputResponse.status(400).send("Name  is either inadequate, or contains bad characters")
            } else if ((typeof params.address1 === 'undefined') || (params.address1 === null) || !verifyEmails(params.address1, params.address2)) {
                logger.log("Emails don't match, or are not valid");
                outputResponse.status(400).send("Emails don't match, or are not valid")
            } else if ((typeof params.subject === 'undefined') || (params.subject === null) || !verifySubject(params.subject)) {
                logger.log("Subject is either inadequate, or contains bad characters");
                outputResponse.status(400).send("Subject is either inadequate, or contains bad characters")
            } else if ((typeof params.message === 'undefined') || (params.message === null) || !verifyMessage(params.message)) {
                logger.log("Message is either inadequate, or contains bad characters");
                outputResponse.status(400).send("Message is either inadequate, or contains bad characters")
            } else {

                logger.log(`The message body received is ${params}`)
                const data = {
                    from: `"${params.name}" <${params.address1}>`, // sender address
                    to: config.user,
                    subject: params.subject, // Subject line is optional for this transport, but I want it
                    text: params.message     // plain text body
                }
                // noinspection JSUnusedLocalSymbols
                transporter.sendMail(data)
                    .then(r => {
                        return outputResponse.status(200).send('Success');
                    })
                    .catch(e => {
                        return outputResponse.status(500).send(`Failed: ${e.toString()}`);
                    })
            }
        } // end else got some data
    }) // end cors
}) // end exported function

function verifyEmails(address1, address2) {
    return (address1 === address2) && verifyEmailSyntax(address1)
}

function verifyName(name) {
    return (name.length >= config.nameLengthMin && name.length <= config.nameLengthMax) && verifyStringSyntax(name, config.nameRegexp)
}

function verifySubject(subject) {
    return (subject.length >= config.subjectLengthMin && subject.length <= config.subjectLengthMax) && verifyStringSyntax(subject, config.subjectRegexp)
}

function verifyMessage(message) {
    return (message.length >= config.msgLengthMin && message.length <= config.msgLengthMax) && verifyStringSyntax(message, config.msgRegexp)
}

// thanks https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript?rq=1
function verifyEmailSyntax(email) {
    logger.log("Verifying email:" + email + ":" + emailValidator.validate(email) + ":");
    return emailValidator.validate(email)
}

//To Do: apply the regexps
// noinspection JSUnusedLocalSymbols
function verifyStringSyntax(variable, regexp) {
    return true
    // const re = RegExp(cwNameRegex)
    // return re.test(String(variable));
}

