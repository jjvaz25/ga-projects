I generally approached building the commands in my Slackbot to practice and build on the concepts I learned in a sucessive order. I practiced one concept in the first part, introduced another in the second, and tried to implement both in the third part. The fourth and fifth were just for fun and additional practice.

For my first part I used arrays and a for loop to create a call and response function based on the Evanesence song "Bring Me to Life." Lines from the chorus are listed in an array, along with a YouTube link attached to the end. 

  let emoLyrics = [
        "WAKE ME UP INSIDE!",
        "WAKE MEEEE UP INSIDE!",
        "CALL MY NAME AND SAVE ME FROM THE DARK!",
        "BID MY BLOOD TO RUN!",
        "BEFORE I COME UNDONE!",
        "SAVE ME FROM THE NOTHING I'VE BECOME!",
        "https://www.youtube.com/watch?v=3YxaaGgTQYM"
    ]

I used msg.random to call certain phrases from the array to specific hubot inputs. I would've liked to find a way for hubot to recite the lyrics sequentially to mirror the song ("WAKE ME UP INSIDE!" is always before "BID MY BLOOD TO RUN" in the song's chorus), but the random parameter worked for now to return different phrases with the same input.

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

I used a for loop to have hubot call forth all the phrases, plus the bonus YouTube music video.

    robot.respond(/BRING ME TO LIFE/, function(msg) {
        for (let i = 0; i < emoLyrics.length; i++) {
            msg.reply(emoLyrics[i]);
            }
    });

For the second part I wanted to implement a conditional with a real time parameters: date and time.

The first command takes the date with Date() and checks if the day of the week is Sunday or Saturday. Sunday is represented by 0 in .getDay(), and Saturday with 6. The "if" conditional calls a video of Daniel Craig on SNL if today is Sunday or Saturday. Otherwise, the slackbot will return a blunt and rude "No, get back to work."

   let today = new Date();
//    let today = new Date('February 27, 2021 18:00:00');
        robot.respond(/Is it the weekend\?/i, function(msg) {
            if (today.getDay() === 0 || today.getDay() === 6){
                return msg.send('https://www.youtube.com/watch?v=dLD1i5lVgjw');
            } else {
                return msg.send('No, get back to work.')
            }
        });

The second command is similar but uses time. today.getMinutes() equaled to 0 checks if the time is currently on an interval of one hour, the regular break time for this class. If so, then the slackbot returns the appropriate response. If not, then it returns another. I wish I could configure the code so that it checks only if it is 6:00 PM or 7:00 PM,
but this method worked for now. To check both commands, I used another let today variable to fool slackbot into thinking it was both a weekend and 6:00 PM.

        robot.respond(/Hey Kyle, is it break time yet\?/i, function(msg) {
            if (today.getMinutes() === 0) {
                return msg.send('Yes, be back at the 15 minute mark.');
            } else {
                return msg.send('No, we are still learning Javascript. Please stop asking me this.')
            }
        });

The third part implements both an array and conditionals to build off the previous two parts. 

The code also uses parameters of randomness to bring different answers. Slackbot can either respond to the message with an affirmative "Obviously [item A/B] is better." Or, it could randomly respond with the copOut answers in the array.

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


The fourth part was just for fun to use both YouTube videos and random parameters. The fifth part was practice with APIs and to bring YouTube functionality to its most practical level with my Slackbot.