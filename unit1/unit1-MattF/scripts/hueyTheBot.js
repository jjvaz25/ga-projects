/* 

HUEY A.K.A THERABOT
This program performs three functions:

   1. It will share a quote to start your day with
   2. It will perform a wellness check-in to see how you're day is going and offer advice
   3. It will tell you a joke and share a few GIFs with you to lighten your day


*/

//Arrays used for later functions:

let positiveQuote = [
    '_Not everything that is faced can be changed, but nothing can be changed until it is faced._ — James Baldwin',
    '_We are what we think. All that we are arises with our thoughts. With our thoughts, we make the world._ — Gautama Buddha',
    '_Life\'s most persistent and urgent question is, what are you doing for others?_ — Dr. Martin Luther King, Jr.',
    '_Love takes off masks that we fear we cannot live without and know we cannot live within._ — James Baldwin',
    '_If you do not tell the truth about yourself you cannot tell it about other people_ — Virginia Woolf'
];

let funnyGifs = [
    'https://giphy.com/gifs/HKx5p4APGBxi8/html5',
    'https://giphy.com/gifs/Z1kpfgtHmpWHS/html5',
    'https://giphy.com/gifs/lszAB3TzFtRaU/html5',
    'https://giphy.com/gifs/ktcUyw6mBlMVa/html5',
];

let dfwJoke = [
    '*Huey*: What do you get when you cross an insomniac, an unwilling agnostic and a dyslexic?',
    '*Imaginary audience*: I don\'t know, what?',
    '*Huey*: You get someone who stays up all night torturing themself mentally over the question of whether or not there is a dog.',
    '—_David Foster Wallace_'
];

//Huey's Inner Functions

module.exports = (robot) => {

    //Start my day -- Quotes feature

    robot.respond(/Start my day/, function (msg) {

        return msg.send('Hi! I hope the day is off to a good start -- Would you like to hear a thoughtful quote to consider today? (Hear a quote/All set, thanks)');

    });

    robot.hear(/Hear a quote/, function (msg) {

        return msg.send(msg.random(positiveQuote));

    });

    robot.hear(/All set, thanks/, function (msg) {

        return msg.send("Sounds good — take it easy!");

    });


    // Do a Check In -- Daily Wellness Feature

    robot.respond(/Do a check in/, function (res) {

        return res.reply('You came to the right place! I\'m Huey, I\'m a TheraBot, and I\'m here to help. To start off, please rank your day on a scale from 1 - 5; 1 being a rough day and 5 being an awesome day. For example, You can say "Today is a 4,"');

    });

    robot.hear(/Today is a (.*)/i, (msg) => {
        const dayRating = msg.match[1]

        if (dayRating === '1') {

            msg.send('Hey, that\'s aright — everyone has days like this (Robots, too). If today is a \'1\' let\'s take a break and practice some self-care. Here is a link on 10 ways to take better care of yourself: https://www.psychologytoday.com/us/blog/skinny-revisited/201805/self-care-101');

            msg.reply('I hope that helps. No matter what, you got this! :thumbsup:');

        } else if (dayRating === '2') {

            msg.send('Hey, I\'m a robot and even I know how that goes. If today\'s a \'2,\' let\'s carve out some time to take a break and practice some mindfullness. You can take some notes on where you\'re at today, and maybe even find some ways to bring the day up a notch or two. Here is a link on Mindfulness that I like: https://www.psychologytoday.com/us/basics/mindfulness');

            msg.send('I hope that helps. No matter what, you got this! :thumbsup:');

        } else if (dayRating === '3') {

            msg.send('In my book, a \'3\' ain\'t bad! We all have average days. It\'s a good idea to keep your mind engaged though. Why don\'t you take some time to try something new? Here\'s a list of fun things you could try: https://www.developgoodhabits.com/new-skills-to-learn/');

            msg.send('I hope that helps and I hope you have some fun learning something new, too! :thumbsup:');

        } else if (dayRating === '4') {

            msg.send('Right on! Glad you\'re having a good day — That said, it\'s always important to nuture who you are (the same way a garden needs water to grow) so don\'t forget to do something you love today!');

            msg.send('I hope that helps. Keep on keepin\' on! :thumbsup:');

        } else if (dayRating === '5') {

            msg.send('You rockstar, you! :fire: Hold on to that postivity and don\'t forget to share it with someone else while you\'re  at it.');

            msg.send('Keep doing what you\'re doing and have some fun making the world a better place today! :thumbsup:');
        }
    });


    // Shed some Light -- A Robots best attempt at humor

    robot.respond(/Shed some light/, function (msg) {

        for (let i = 0; i <= funnyGifs.length; i++) {

            let printGif = funnyGifs[i];
            msg.send(printGif);
        }

        msg.send('I get a kick out of those GIFs :arrow_heading_up: — I hope that helps!');
        msg.send('Also, would you like to hear a joke?');
        msg.send('("Hear a joke" / "All set on jokes")');

    });

    // This is the 'Joke' section. It starts on line 119, technically. 
    robot.hear(/Hear a joke/, function (msg) {

        for (let i = 0; i <= dfwJoke.length; i++) {

            let printJoke = dfwJoke[i];
            msg.send(printJoke);
        }
    });

    robot.hear(/All set on jokes/, function (msg) {

        msg.send('Sounds good to me — Cheers!');

    });
}

//La fine, el fin, the end.