/**
 *
 * This reads the 'built in' tumblr feed and returns what is read as a string that contains XML.
 * example call http://localhost:5001/daily-dilettante/us-central1/readTumblr?tag=article
 * If you provide a tag=... query parameter, this will be used to filter the reading, based on that tag
 * Clearly, you will have to coordinate your posting to go with your tagging, but as tumblr posts can contain many tags,
 * this should not be a headache
 * If you provide no query parameter (or one not called tag) you get them all
 */
'use strict';
const functions = require('firebase-functions');
const logger = require("firebase-functions/lib/logger");
const rp = require('request-promise');

exports.readTumblr = functions.https.onRequest((inputRequest, outputResponse) => {
    logger.info(`Requested tag: ${inputRequest.query.tag}`)
    let url = "https://dailydilettante.tumblr.com/api/read/xml"
    if (inputRequest.query.tag) {
        url += `?tagged=${inputRequest.query.tag}`
    }
    // This is the vital statement
    // It tells the requesting browser that I do not care who is calling this function
    outputResponse.set('Access-Control-Allow-Origin', '*');
    // really, this is fast enough so that caching is dispensable, and you probably want the latest,anyway
    // you may still find that tumblr's feed is only refreshed every now and again
    outputResponse.set('Cache-Control', 'no-store');
    outputResponse.set('Cache-Control', 'max-age=0');

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
