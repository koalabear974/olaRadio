const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');

admin.initializeApp();

exports.mixcloudStream = functions.database.ref('/emissions/{emissionId}/link')
    .onWrite((change, context) => {
        // Exit when the data is deleted.
        if (!change.after.exists()) {
            return change.after.ref.parent.child('stream').remove();
        }

        const newLink = change.after.val();

        if (newLink.includes('mixcloud.com')) {
            request(newLink, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const trackId = body.match('((.\/){4}([^\/]*))\.mp3')[0].replace('.mp3', '');
                    const manifestUrl = 'https://audio6.mixcloud.com/secure/dash2/' + trackId + '.m4a/manifest.mpd';

                    return change.after.ref.parent.child('stream').set(manifestUrl);
                }
            });
        }

            return change.after.ref.parent.child('stream').remove();
    });
