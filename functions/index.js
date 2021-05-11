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

const config = require('./config.json');
const logger = require("firebase-functions/lib/logger");

exports.readTumblr = functions.https.onRequest((inputRequest, outputResponse) => {
    // This is the vital statement
    // It tells the requesting browser that I do not care who is calling this function
    outputResponse.set('Access-Control-Allow-Origin', '*');

    // logger.info("-------------------------------------------------------------------------")
    // logger.info("Preparing to read the tumblr feed")

    // xml is the default language of this feed, so adding the xml on the end is not really vital
    rp({uri: "https://dailydilettante.tumblr.com/api/read/xml"})
        .then(result => {
            // logger.info('here is response: ' + result);
            outputResponse.status(200).type("text/xml").send(result)
        })
        .catch(err => {
            logger.debug(err)
            outputResponse.status(500).send(err)
        })
})

exports.sendMail = functions.https.onRequest((inputRequest, outputResponse) => {
    /*
    The outputResponse has the type of express.response. This is documented at https://expressjs.com/en/5x/api.html#res
    An example of a good way of sending a response is
        res.status(404).send('Sorry, we cannot find that!')
    send()  actually sends the HTTP response.
    For send, when the parameter is a String, the method sets the Content-Type to “text/html”:
    If you are wanting to send a different response, here is an example:
        res.set('Content-Type', 'text/html')
        res.send(Buffer.from('<p>some html</p>'))
    Also there is res.type(type). You have to give this a good mime type eg: text/xml, which is almost identical to application/xml
    logger.info("Starting to send an email")
    */

    let transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: true, // true for 465, false for other ports
        auth: {
            user: config.user,
            pass: config.pass
        },
    });

    // verify connection configuration
    // noinspection JSUnusedLocalSymbols
    transporter.verify(function (error, success) {
        if (error) {
            logger.debug(error);
            outputResponse.status(500).send(error)
            // return
        } else {
            logger.info("Server is ready to take our messages");
        }
    });

    logger.debug(`Input: ${inputRequest}`)
    logger.debug(`Config: ${JSON.stringify(config)}`)

    if (!Object.keys(inputRequest.body).length)
        // it is likely that this has been called from a browser's address line
        outputResponse.status(400).send("No data found")
    else {
        let params = JSON.parse(inputRequest.body)
        logger.log(`The message body received is ${params}`)

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
            logger.info("Passed all of the constraints")
            // send mail with defined transport object
            transporter.sendMail({
                from: `"${params.name}" <${params.address1}>`, // sender address
                to: config.user,
                subject: params.subject, // Subject line is optional for this transport, but I want it
                text: params.message     // plain text body
            }).then(sendingResult => {
                logger.log("Message sent:", sendingResult)
                outputResponse.status(200).send("Success")
            }).catch(reason => {
                logger.log("Sending failed: %s", reason.toString())
                outputResponse.status(500).send(reason.toString())
            })
        }
    }
})

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

