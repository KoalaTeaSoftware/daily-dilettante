/*
# Overview
* This uses nodemailer (which will have to be installed - to the functions dir, preferably)
* it is going to send emails from&to the email address given in the configuration,
   but the reply-to is going to be what came in in the message

# Usage
* copy the constraints for the form fields to the set of constants near the top
  * The validation of the email's syntax is out-sourced to the email validator, to these constants will be irrelevant here

 */
'use strict';

// // copy these here from the constrains applied to the client-side form
// const nameLengthMin = 5
// const nameLengthMax = 40
// const nameRegexp = /^[a-z0-9., -]+$/i
// const emailLengthMin = 1
// const emailLengthMax = 50
// const subjectLengthMin = nameLengthMin
// const subjectLengthMax = 50
// const subjectRegexp = /^[£a-z0-9., -]+$/i
// const msgLengthMin = 10
// const msgLengthMax = 5000
// const msgRegexp = /^[£a-z0-9., -/?/)(]+$/i

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator')
// const cors = require('cors')({origin: true});
admin.initializeApp();

const config = require('./config.json');
const logger = require("firebase-functions/lib/logger");

exports.sendMail = functions.https.onRequest((inputRequest, outputResponse) => {
    logger.info("Starting to send an email")

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
    transporter.verify(function (error, success) {
        if (error) {
            logger.debug(error);
        } else {
            logger.info("Server is ready to take our messages");
        }
    });

    logger.info(`Input: ${inputRequest}`)
    logger.debug(`Config: ${JSON.stringify(config)}`)

    if (!Object.keys(inputRequest.body).length)
        // it is likely that this has been called from a browser's address line
        outputResponse.send("No data found")
    else {
        let params = JSON.parse(inputRequest.body)
        logger.log(`The message body received is ${params}`)

        if ((typeof params.name === 'undefined') || (params.name === null) || !verifyName(params.name)) {
            logger.log("Name  is either inadequate, or contains bad characters");
            outputResponse.send("Name  is either inadequate, or contains bad characters")
        } else if ((typeof params.address1 === 'undefined') || (params.address1 === null) || !verifyEmails(params.address1, params.address2)) {
            logger.log("Emails don't match, or are not valid");
            outputResponse.send("Emails don't match, or are not valid")
        } else if ((typeof params.subject === 'undefined') || (params.subject === null) || !verifySubject(params.subject)) {
            logger.log("Subject is either inadequate, or contains bad characters");
            outputResponse.send("Subject is either inadequate, or contains bad characters")
        } else if ((typeof params.message === 'undefined') || (params.message === null) || !verifyMessage(params.message)) {
            logger.log("Message is either inadequate, or contains bad characters");
            outputResponse.send("Message is either inadequate, or contains bad characters")
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
                outputResponse.send("Success")
            }).catch(reason => {
                logger.log("Sending failed: %s", reason.toString())
                outputResponse.send(reason.toString())
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
function verifyStringSyntax(variable, regexp) {
    return true
    // const re = RegExp(cwNameRegex)
    // return re.test(String(variable));
}

