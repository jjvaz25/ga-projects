// Description:
//
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//

module.exports = function(robot) {

//Evanescence call and response
    let emoLyrics = [
        "WAKE ME UP INSIDE!",
        "WAKE MEEEE UP INSIDE!",
        "CALL MY NAME AND SAVE ME FROM THE DARK!",
        "BID MY BLOOD TO RUN!",
        "BEFORE I COME UNDONE!",
        "SAVE ME FROM THE NOTHING I'VE BECOME!",
        "https://www.youtube.com/watch?v=3YxaaGgTQYM"
    ]

    robot.respond(/WAKE ME UP/, function(msg) {
        let gothKids = [emoLyrics[0], emoLyrics[3]];
        return msg.reply(msg.random(gothKids));
    });

    robot.respond(/I CANT WAKE UP/, function(msg) {
        let emoKids = [emoLyrics[1], emoLyrics[4]];
        return msg.reply(msg.random(emoKids));
    });

    robot.respond(/SAVE ME/, function (msg) {
        let sceneKids = [emoLyrics[2], emoLyrics[5]];
        return msg.reply(msg.random(sceneKids));
    });

    robot.respond(/BRING ME TO LIFE/, function(msg) {
        for (let i = 0; i < emoLyrics.length; i++) {
            msg.reply(emoLyrics[i]);
            }
    });


// Date and time Slackbot - cranky Slackbot looking forward to the weekend & Kyle Slackbot
    let today = new Date();
//    let today = new Date('February 27, 2021 18:00:00');
        robot.respond(/Is it the weekend\?/i, function(msg) {
            if (today.getDay() === 0 || today.getDay() === 6){
                return msg.send('https://www.youtube.com/watch?v=dLD1i5lVgjw');
            } else {
                return msg.send('No, get back to work.')
            }
        });

        robot.respond(/Hey Kyle, is it break time yet\?/i, function(msg) {
            if (today.getMinutes() === 0) {
                return msg.send('Yes, be back at the 15 minute mark.');
            } else {
                return msg.send('No, we are still learning Javascript. Please stop asking me this.')
            }
        });

// Which is better? Or cop out response
    let copOut = [
        'Both are equal in my heart',
        '...can I pass on this question',
        'I do not know either, sorry',
        'I dislike them both equally'
    ]
    
    robot.respond(/(Which|Who) is better\?* (.*) or (.*)\?/i, function(msg) {
        let choices = [msg.match[2], msg.match[3]];
        let randomNumber = Math.floor(Math.random() * 5) + 1;
          if (randomNumber >= 3) {
            return msg.send(msg.random(copOut));
        } else {
            return msg.send(`Obviously, ${msg.random(choices)} is better`);
        }
    });

//  Star Wars prequel meme delivery service
    let prequelMeme = [
        "https://www.youtube.com/watch?v=SA_1g3hGgNc&t=63s",
        "https://www.youtube.com/watch?v=rEq1Z0bjdwc",
        "https://www.youtube.com/watch?v=U8wLBOlCKPU",
        "https://www.youtube.com/watch?v=Sg14jNbBb-8",
        "https://www.youtube.com/watch?v=abBabSWyNOI",
        "https://www.youtube.com/watch?v=zs2CfPrbKcU"
    ]

    robot.hear(/gimme a prequel meme/i, function(msg){
        msg.send(msg.random(prequelMeme))
    });

// YouTube video search - not really my doing but just wanted practice with implementing APIs
//
// Configuration:
//   HUBOT_YOUTUBE_API_KEY - Obtained from https://console.developers.google.com
//   HUBOT_YOUTUBE_DETERMINISTIC_RESULTS - Optional boolean flag to only fetch
//     the top result from the YouTube search
//   HUBOT_YOUTUBE_HEAR - Optional boolean flag to globally hear from channels
//   HUBOT_YOUTUBE_DISPLAY_VIDEO_TITLE - Optional boolean flag to display the
//     video title of the returned video
//   HUBOT_YOUTUBE_DECODE_HTML - Optional boolean flag to decode HTML entities
//     from the video title
//
// Commands:
//   hubot youtube me <query> - Searches YouTube for the query and returns the video embed link.

    const he = require('he');

    let resType = 'respond'
    let trigger = /(?:youtube|yt)(?: me)? (.*)/i
    if (process.env.HUBOT_YOUTUBE_HEAR === 'true') {
        resType = 'hear'
        trigger = /^(?:youtube|yt)(?: me)? (.*)/i
    }

    return robot[resType](trigger, function (msg) {
        if (!process.env.HUBOT_YOUTUBE_API_KEY) {
        robot.logger.error('HUBOT_YOUTUBE_API_KEY is not set.')
        return msg.send('You must configure the HUBOT_YOUTUBE_API_KEY environment variable')
        }
        const query = msg.match[1]
        const maxResults = process.env.HUBOT_YOUTUBE_DETERMINISTIC_RESULTS === 'true' ? 1 : 15
        robot.logger.debug(`Query: ${query}\n Max Results: ${maxResults}`)
        return robot.http('https://www.googleapis.com/youtube/v3/search')
        .query({
        order: 'relevance',
        part: 'snippet',
        type: 'video',
        maxResults,
        q: query,
        key: process.env.AIzaSyA3fQOUr0twwg70tpdXce2NYNeiwrW5ax8
        })
        .get()(function (err, res, body) {
        let error, videos
        robot.logger.debug(body)
        if (err) {
            robot.logger.error(err)
            return robot.emit('error', err, msg)
        }
        try {
            if (res.statusCode === 200) {
            videos = JSON.parse(body)
            robot.logger.debug(`Videos: ${JSON.stringify(videos)}`)
            } else {
            return robot.emit('error', `${res.statusCode}: ${body}`, msg)
            }
        } catch (error1) {
            error = error1
            robot.logger.error(error)
            return msg.send(`Error! ${body}`)
        }
        if (videos.error) {
            robot.logger.error(videos.error)
            return msg.send(`Error! ${JSON.stringify(videos.error)}`)
        }
        videos = videos.items
        if ((videos == null) || !(videos.length > 0)) {
            return msg.send(`No video results for \"${query}\"`)
        }
        // const video = msg.random(videos)
        // let output = `https://www.youtube.com/watch?v=${video.id.videoId}`
        // if (process.env.HUBOT_YOUTUBE_DISPLAY_VIDEO_TITLE === 'true') {
        //     let videoTitle = video.snippet.title
        //     if (process.env.HUBOT_YOUTUBE_DECODE_HTML === 'true') {
        //         videoTitle = he.decode(videoTitle)
        //     }
        //     output = `${videoTitle} - ` + output
        // }
        // return msg.send(output)
        })
    })
}

/************************************

EXAMPLES OF THE KEY HUBOT FUNCTIONS

************************************/

/* Variables for random example */

var squirrels;
squirrels = ["http://img.skitch.com/20100714-d6q52xajfh4cimxr3888yb77ru.jpg", "https://img.skitch.com/20111026-r2wsngtu4jftwxmsytdke6arwd.png", "http://cl.ly/1i0s1r3t2s2G3P1N3t3M/Screen_Shot_2011-10-27_at_9.36.45_AM.png", "http://shipitsquirrel.github.com/images/squirrel.png"];

module.exports = function(robot) {
  /* Basic example of respond / send. If the user enters hi or hello the bot responds "Howdy!" */
  return robot.respond(/hi|hello/i, function(msg) {
    return msg.send("Howdy!");
  });

  /* Random Example
  If a user enters 'ship it' we return a random squirrel, which is popular for symbolizing shipping something with engineers */
  return robot.hear(/ship it/i, function(msg) {
    return msg.send(msg.random(squirrels));
  });
};
