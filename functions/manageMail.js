/**
 * ToDo: Replace the existing mail handler with this
 *  will have to update the config
 *  deploy this - it will give a different, additional endpoint
 *  update the form to use this endpoint and use npm run serve until it is shown to work
 *  when this is proven to work, deploy the contact form
 *  Then remove the old mail mechanism, and redeploy
 *
 # Overview
 ## Email Sender
 * This provides the server-side gate-keeping for the email-sending feature presented on the contact page
 * It uses nodemailer (which will have to be installed - to the functions dir, preferably)
 * it is going to send emails from&to the email address given in the configuration (which it `require`s),
 * but the reply-to is going to be what came in in the message
 *
 * It also relies on various Firebase environment variable (see the definition of the nodemailer transporter)
 * THIS MEANS THAT YOU CAN'T EMULATE IT EASILY
 *
 * You set these up with using the cli with a command a bit like this
 * firebase functions:config:set email.host="mail.partypackages.com" email.port="465" and so on
 * see https://firebase.google.com/docs/functions/config-env
 *
 * Call from the front end JavaScript with something like this
 *         fetch(
 *          mailService,
 *             {
 *                method: 'POST',
 *                mode: "cors", // else we get has been blocked by CORS policy: Response to preflight request
 *                headers: {"content-type": "application/json"},
 *                body: JSON.stringify(formData)
 *             })
 */
'use strict';

const functions = require('firebase-functions');
const logger = require("firebase-functions/lib/logger");
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator')

const config = require('./email.config.json'); // this file gives constraints on the sizes of fields and the like

exports.sendMail = functions.https.onRequest((inputRequest, outputResponse) => {
    /* ToDo: tighten this up when development is settled down a lot
     * Can only send back a single such header. This may be no problem when Live, and it is set accordingly
     * See the sample headers for how you could decide where it is coming from, and acting accordingly
     * Mind you, that can probably be spoofed.
     */
    outputResponse.set('Access-Control-Allow-Origin', '*');

    switch (inputRequest.method) {
        case 'OPTIONS':
            /* Because of the CORS, the browser has made a "pre-flight" request.
             * Need to respond (with the ACCESS header, already set, and a few other things
             * It will then make the read request
             */
            outputResponse.set('Access-Control-Allow-Methods', 'POST'); // this seems to have no effect
            outputResponse.set('Access-Control-Max-Age', '6'); // the browser can cache the response to this call for this number of seconds
            outputResponse.set('Access-Control-Allow-Headers', 'Content-Type'); // this is required, otherwise the pre-flight fails
            outputResponse.status(204).send('');
            break
        case 'POST':
            // this seems to be the real request
            if (!Object.keys(inputRequest.body).length) {
                logger.log("No data found")
                outputResponse.status(400).send("I need data")
            } else {
                /* **************************************************************************************************
                 * In the 'how to call' sample (above), I set a header
                 * headers: {"content-type": "application/json"},
                 * This means that the body will be processed and its elements accessible as if it were good JSON
                 * otherwise you would have to let params = JSON.parse(inputRequest.body)
                 */
                let params = inputRequest.body

                // ToDo: make use of the time-stamp to try an further reduce the possibility of spam

                if ((typeof params.name === 'undefined') || (params.name === null) || !verifyName(params.name)) {
                    logger.log(`Name  is either inadequate, or contains bad characters:${params.name}:`);
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
                    const transporter = nodemailer.createTransport({
                        host: functions.config().email.host,
                        port: functions.config().email.port,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: functions.config().email.user,
                            pass: functions.config().email.pass
                        },
                    });

                    const data = {
                        from: `"${params.name}" <${params.address1}>`, // sender address
                        to: functions.config().email.user,
                        subject: params.subject, // Subject line is optional for this transport, but I want it
                        text: params.message     // plain text body
                    }
                    // noinspection JSUnusedLocalSymbols
                    transporter.sendMail(data)
                        .then(r => {
                            // logger.info("The sending succeeded")
                            return outputResponse.status(200).send('Success');
                        })
                        .catch(e => {
                            logger.debug(`Sending failed:${e.toString()}:`)
                            return outputResponse.status(500).send(`Failed: ${e.toString()}`);
                        })
                }
            }
            break;
        default:
            logger.debug(`I refuse respond to the query method:${inputRequest.method}:`)
            return outputResponse.status(405).send(`Method Not Allowed`);
    }
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

// ToDo: apply the regexps
// noinspection JSUnusedLocalSymbols
function verifyStringSyntax(variable, regexp) {
    return true
    // const re = RegExp(cwNameRegex)
    // return re.test(String(variable));
}

