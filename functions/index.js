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

exports.readTumblr = functions.https.onRequest((inputRequest, outputResponse) => {
    // this is vital so that the browser that call this knows that I do not cal who is calling this function
    outputResponse.set('Access-Control-Allow-Origin', '*');

    logger.info("-------------------------------------------------------------------------")
    logger.info("Preparing to read the tumblr feed")

    // ToDo: This is currently handing dummy data back to the browser. So that the code that handles the response can be done
    outputResponse.status(200).send(
        '<tumblr version="1.0">\n' +
        '<tumblelog name="dailydilettante" timezone="US/Eastern" title="The Daily Dilettante"> </tumblelog>\n' +
        '<posts start="0" total="2">\n' +
        '<post id="650417731594797056" url="https://dailydilettante.tumblr.com/post/650417731594797056" url-with-slug="https://dailydilettante.tumblr.com/post/650417731594797056/thomas-hardy-n-sit-amet-nisi-finibus-elit" type="Photo" date-gmt="2021-05-06 07:38:05 GMT" date="Thu, 06 May 2021 03:38:05" unix-timestamp="1620286685" format="html" reblog-key="z8z1H1FM" slug="thomas-hardy-n-sit-amet-nisi-finibus-elit" note-count="0" width="460" height="350">\n' +
        '<tumblelog title="The Daily Dilettante" name="dailydilettante" url="https://dailydilettante.tumblr.com/" timezone="US/Eastern" avatar-url-512="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s512x512u_c1/6217b0c4a4c75a1f99d03aa4fedb9a9ac44140ff.jpg" avatar-url-128="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s128x128u_c1/0ac0a8c8e9cac972d2a62c777556882782584b82.jpg" avatar-url-96="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s96x96u_c1/93d5ce4aaed761b9f096e4fe24364e778e2d2bc2.jpg" avatar-url-64="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s64x64u_c1/4606419e8cd45623e6f6309d6787a8b73153e616.jpg" avatar-url-48="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s48x48u_c1/2a011bf2de96940fc8005b4a93a2171afb770707.jpg" avatar-url-40="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s40x40u_c1/4d6d261852439de83865a3dbae0eecba324b3c68.jpg" avatar-url-30="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s30x30u_c1/9c6a171173ac446a6ad85982f438723f965ff77d.jpg" avatar-url-24="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s24x24u_c1/78cedc5712a19e5420b42cf1474fe1515c88d287.jpg" avatar-url-16="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s16x16u_c1/c21cb7ad4d14239b4facc666693776427eca1ef6.jpg"/>\n' +
        '<photo-caption><p>Thomas Hardy</p><p>In sit amet nisi finibus elit interdum facilisis. Vestibulum sed justo vitae erat volutpat suscipit. Aliquam dapibus diam ut massa tincidunt, eu varius nisl luctus. Donec condimentum hendrerit pretium. Mauris vel dictum eros. Maecenas fermentum nunc eu venenatis efficitur. Vivamus id neque tincidunt, facilisis sem nec, porta leo. Donec finibus pellentesque elit eu egestas. Mauris faucibus sem quis enim elementum faucibus. Cras tempus sed sapien nec luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras mi tortor, congue eget suscipit blandit, tincidunt ut magna. Mauris id dignissim justo, nec eleifend risus.</p><p>Sed non dolor et ipsum elementum faucibus in quis justo. Aenean bibendum lectus at ante varius condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus convallis quam risus, non ullamcorper nisl sagittis sit amet. Nunc ut aliquam tellus. Quisque id sapien a justo vestibulum consequat quis a ligula. Sed et lacus suscipit, scelerisque tellus eu, mattis eros. Donec eu nunc vel dolor vehicula tincidunt. Morbi et enim eget leo scelerisque malesuada nec a quam. Aenean lacinia cursus nisi.</p><p>Aliquam hendrerit id nisl at tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id arcu mauris. Curabitur non posuere neque, lacinia rhoncus elit. Proin eu lorem eu leo volutpat pulvinar. Aenean in odio a nibh fermentum vulputate congue et tellus. Praesent ut mauris sed ligula iaculis blandit.</p></photo-caption>\n' +
        '<photo-url max-width="1280">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s500x750/1c3737febf05ff76deb554b5af2b79ed72bfb6d0.png</photo-url>\n' +
        '<photo-url max-width="500">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s500x750/1c3737febf05ff76deb554b5af2b79ed72bfb6d0.png</photo-url>\n' +
        '<photo-url max-width="400">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s400x600/82f7548b331d3240b9cb35d40e63479b2be9a42a.png</photo-url>\n' +
        '<photo-url max-width="250">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s250x400/e3536c3567bf453c5ea3844650661223a8c2aff1.png</photo-url>\n' +
        '<photo-url max-width="100">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s100x200/52fee8d182c4267798d9ad6c76e0358bedc534f2.png</photo-url>\n' +
        '<photo-url max-width="75">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s75x75_c1/fac32c391289965785d8adab822669be86885af9.png</photo-url>\n' +
        '<tag>thomas hardy</tag>\n' +
        '</post>\n' +
        '<post id="650416938739204096" url="https://dailydilettante.tumblr.com/post/650416938739204096" url-with-slug="https://dailydilettante.tumblr.com/post/650416938739204096/a-second-post" type="Regular" date-gmt="2021-05-06 07:25:29 GMT" date="Thu, 06 May 2021 03:25:29" unix-timestamp="1620285929" format="html" reblog-key="dz4bM13f" slug="a-second-post" note-count="0">\n' +
        '<tumblelog title="The Daily Dilettante" name="dailydilettante" url="https://dailydilettante.tumblr.com/" timezone="US/Eastern" avatar-url-512="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s512x512u_c1/6217b0c4a4c75a1f99d03aa4fedb9a9ac44140ff.jpg" avatar-url-128="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s128x128u_c1/0ac0a8c8e9cac972d2a62c777556882782584b82.jpg" avatar-url-96="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s96x96u_c1/93d5ce4aaed761b9f096e4fe24364e778e2d2bc2.jpg" avatar-url-64="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s64x64u_c1/4606419e8cd45623e6f6309d6787a8b73153e616.jpg" avatar-url-48="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s48x48u_c1/2a011bf2de96940fc8005b4a93a2171afb770707.jpg" avatar-url-40="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s40x40u_c1/4d6d261852439de83865a3dbae0eecba324b3c68.jpg" avatar-url-30="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s30x30u_c1/9c6a171173ac446a6ad85982f438723f965ff77d.jpg" avatar-url-24="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s24x24u_c1/78cedc5712a19e5420b42cf1474fe1515c88d287.jpg" avatar-url-16="https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s16x16u_c1/c21cb7ad4d14239b4facc666693776427eca1ef6.jpg"/>\n' +
        '<regular-title>A Second Post</regular-title>\n' +
        '<regular-body><p>In sit amet nisi finibus elit interdum facilisis. Vestibulum sed justo vitae erat volutpat suscipit. Aliquam dapibus diam ut massa tincidunt, eu varius nisl luctus. Donec condimentum hendrerit pretium. Mauris vel dictum eros. Maecenas fermentum nunc eu venenatis efficitur. Vivamus id neque tincidunt, facilisis sem nec, porta leo. Donec finibus pellentesque elit eu egestas. Mauris faucibus sem quis enim elementum faucibus. Cras tempus sed sapien nec luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras mi tortor, congue eget suscipit blandit, tincidunt ut magna. Mauris id dignissim justo, nec eleifend risus.</p><p>Sed non dolor et ipsum elementum faucibus in quis justo. Aenean bibendum lectus at ante varius condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus convallis quam risus, non ullamcorper nisl sagittis sit amet. Nunc ut aliquam tellus. Quisque id sapien a justo vestibulum consequat quis a ligula. Sed et lacus suscipit, scelerisque tellus eu, mattis eros. Donec eu nunc vel dolor vehicula tincidunt. Morbi et enim eget leo scelerisque malesuada nec a quam. Aenean lacinia cursus nisi.</p><p>Aliquam hendrerit id nisl at tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id arcu mauris. Curabitur non posuere neque, lacinia rhoncus elit. Proin eu lorem eu leo volutpat pulvinar. Aenean in odio a nibh fermentum vulputate congue et tellus. Praesent ut mauris sed ligula iaculis blandit.</p></regular-body>\n' +
        '<tag>testing</tag>\n' +
        '</post>\n' +
        '</posts>\n' +
        '</tumblr>');
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
     */
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

