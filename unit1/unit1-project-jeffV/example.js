'use strict'

// Description:
//   Example scripts for you to examine and try out.
//
// Notes:
//   They are commented out by default, because most of them are pretty silly and
//   wouldn't be useful and amusing enough for day to day huboting.
//   Uncomment the ones you want to try and experiment with.
//
//   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

const decode = require('decode-html')
const norrisUrl = 'https://api.icndb.com/jokes/random';
const catGifsUrl = 'https://api.giphy.com/v1/gifs/translate?api_key=7iz3OK2V6O776CVPIkjbtsMvsbf7Qnhc&s=cats'

const goodVibes = [
  'https://media.giphy.com/media/Y0PCz5xO3caljsBNYm/giphy.gif', 
  'https://media.giphy.com/media/NIkQkfoX23gXjoMicQ/giphy.gif',
  'https://media.giphy.com/media/iezQhAWo2dPEMnD6ni/giphy.gif'
];
const badVibes = [
  'https://media.giphy.com/media/JYO45IBz28Cnm/giphy.gif',
  'https://media.giphy.com/media/inAeEKMJ2CkdW/giphy.gif',
  'https://media.giphy.com/media/MAW9CH0CaX26tNUGLe/giphy.gif'
];

function kelvinToF (kelvinTemp) {
  let fahrenheit = (kelvinTemp - 273.15) * 9/5 + 32
  return Math.round(fahrenheit)
}

module.exports = (robot) => {

  ////////////////////// My three things //////////////////////

/* using giphy's API to find a random cat gif, inspired by Chuck Norris joke generator*/
  robot.respond(/random cat gif/i, (res) => {
    new Promise((resolve, reject) => 
      robot.http(catGifsUrl).get()((err, response, body) =>
          err ? reject(err) : resolve(body)
      )
    ) 
    .then(body => JSON.parse(body))
    .then(json => decode(json.data.url))
    .then(url => res.reply(url))

    .catch(err => res.reply('Error:' + err));
  });

  /* Citation: https://keestalkstech.com/2018/01/hubot-es6-promises/ */

  /////////////////////// using random and if/else conditionals //////////////
  robot.respond(/My number guess is (.*)/i, function(msg) {
    let numGuess;
    numGuess = msg.match[1];
    let botNum = Math.floor(Math.random() * 10 + 1);
    if (Number(numGuess) === botNum) {
      msg.send(`You guessed correct! My number was ${botNum}`)
    } else {
      msg.send(`WRONG! You guessed ${numGuess}. My number was ${botNum}`);
    }
  });

  ////////////////////// using for loops /////////////////////////////
  robot.respond(/vibe check: (.*)/i, function(msg) {
    let myVibe;
    myVibe = msg.match[1];
    if (myVibe === 'good') {
      for (let i = 0; i < goodVibes.length; i++) {
        msg.send(goodVibes[i])
      }
    } else if (myVibe === 'bad') {
      for (let i = 0; i < badVibes.length; i++) {
        msg.send(badVibes[i])
      }
    } else {
      msg.send('not a valid vibe')
    }
  })


/* IGNORE - My attempt at fetching from OpenWeatherMap API. It successfully logs
to the console, but does not work in Hubot. */
  robot.respond(/Weather for (.*)/i, function(msg) {
    let zipcode;
    zipcode = msg.match[1];
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=115cf28cc50f49d3ab9fd208f9487bc4`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
      })
    .then(function(response) {
      let weatherObj = {
        cityName: response['name'],
        description: response['weather'][0]['description'],
        currentTemp: kelvinToF(response['main']['temp']),
        feelsLike: kelvinToF(response['main']['feels_like']),
        minTemp: kelvinToF(response['main']['temp_min']),
        maxTemp: kelvinToF(response['main']['temp_max']),
        wind: response['wind']['speed'],
      }
      console.log(`Hello JSR202! This is your favorite Hubot coming in with today\'s weather report for ${weatherObj.cityName}.
      We are looking at ${weatherObj.description} currently, with temperatures hovering around ${weatherObj.currentTemp} degrees, but if you actually have the courage to go outside you will see that it feels like ${weatherObj.feelsLike}.
      Expect temps to dip as low as ${weatherObj.minTemp} degrees and creep up to ${weatherObj.maxTemp} degrees.
      Winds today are clocking in at ${weatherObj.wind} kts. 
      This is Mr. Hubot Signing off with the weather!`)
      // return msg.send(`Hello JSR202! This is your favorite Hubot coming in with today\'s weather report for ${weatherObj.cityName}
      // We are looking at ${weatherObj.description} currently, with temperatures hovering around ${weatherObj.currentTemp} degrees, but if you actually have the courage to go outside you will see that it feels like ${weatherObj.feelsLike}.
      // Expect temps to dip as low as ${weatherObj.minTemp} degrees and creep up to ${weatherObj.maxTemp} degrees.
      // Winds today are clocking in at ${weatherObj.wind} kts. 
      // This is Mr. Hubot Signing off with the weather!`)
      });
  });

  robot.respond(/My favorite sport is (.*)/i, function(msg) {
    let favSport;
    favSport = msg.match[1];
    if (favSport.toLowerCase() === 'basketball') {
      return msg.send(`Your favorite sport is ${favSport}? Give Hubot 5 minutes to warm up and I will dominate`);
    } else if (favSport.toLowerCase() === 'surfing') {
      return msg.send(`${favSport}?!?!? Hubot does NOT like water. Hubot will never go ${favSport} with you!`);
    } else {
      msg.reply(`Your favorite sport is ${favSport}? Interesting. I think you should just stick to JavaScript`);
    };
  });

  robot.hear(/deep dive/i, (res) => {
    res.send('https://media0.giphy.com/media/14uzPzKMOuVIPu/giphy-downsized.gif');
  });
  
  // robot.respond(/open the (.*) doors/i, (res) => {
  //   const doorType = res.match[1]
  
  //   if (doorType === 'pod bay') {
  //     res.reply('I’m afraid I can’t let you do that.')
  //     return
  //   }
  
  //   res.reply('Opening #{doorType} doors')
  // })
  
  // robot.hear(/I like pie/i, (res) => {
  //   res.emote('makes a freshly baked pie');
  // })
  
  // const lulz = ['lol', 'rofl', 'lmao']
  
  // robot.respond(`/${lulz.join('|')}/i`, (res) => {
  //   res.send(res.random(lulz))
  // })
  
  // robot.topic((res) => {
  //   res.send(`${res.message.text}? That’s a Paddlin`)
  // })
  
  // const enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you']
  // const leaveReplies = ['Are you still there?', 'Target lost', 'Searching']
  
  // robot.enter((res) => {
  //   res.send(res.random(enterReplies))
  // })
  // robot.leave((res) => {
  //   res.send(res.random(leaveReplies))
  // })
  
  // const answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING
  
  // robot.respond(/what is the answer to the ultimate question of life/, (res) => {
  //   if (answer) {
  //     res.send(`${answer}, but what is the question?`)
  //     return
  //   }
  
  //   res.send('Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again')
  // })
  
  // robot.respond(/you are a little slow/, (res) => {
  //   setTimeout(() => res.send('Who you calling "slow"?'), 60 * 1000)
  // })
  
  // let annoyIntervalId = null
  
  // robot.respond(/annoy me/, (res) => {
  //   if (annoyIntervalId) {
  //     res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH')
  //     return
  //   }
  
  //   res.send('Hey, want to hear the most annoying sound in the world?')
  //   annoyIntervalId = setInterval(() => res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH'), 1000)
  // })
  
  // robot.respond(/unannoy me/, (res) => {
  //   if (!annoyIntervalId) {
  //     res.send('Not annoying you right now, am I?')
  //     return
  //   }
  
  //   res.send('OKAY, OKAY, OKAY!')
  //   clearInterval(annoyIntervalId)
  //   annoyIntervalId = null
  // })
  
  
  // robot.router.post('/hubot/chatsecrets/:room', (req, res) => {
  //   const room = req.params.room
  //   const data = JSON.parse(req.body.payload)
  //   const secret = data.secret
  
  //   robot.messageRoom(room, `I have a secret: ${secret}`)
  
  //   res.send('OK')
  // })
  
  // robot.error((error, response) => {
  //   const message = `DOES NOT COMPUTE: ${error.toString()}`
  //   robot.logger.error(message)
  
  //   if (response) {
  //     response.reply(message)
  //   }
  // })
  
  // robot.respond(/have a soda/i, (response) => {
  //   // Get number of sodas had (coerced to a number).
  //   const sodasHad = +robot.brain.get('totalSodas') || 0
  
  //   if (sodasHad > 4) {
  //     response.reply('I’m too fizzy…')
  //     return
  //   }
  
  //   response.reply('Sure!')
  //   robot.brain.set('totalSodas', sodasHad + 1)
  // })
  
  // robot.respond(/sleep it off/i, (res) => {
  //   robot.brain.set('totalSodas', 0)
  //   res.reply('zzzzz')
  // })
}
