'use strict'

module.exports = (robot) => {

//ONE - CALL AND RESPONSES
// First basic call and response, used for testing if bot is on
  robot.respond(/do you even work?/i, (res) => {
    res.send(`I *ACTUALLY* never work sorry`)
    })

// Second call and response. Do you like X statements. 
    robot.respond(/do you like (.*)?/i, (res) => {
      const workType = res.match[1];
    
      if (workType === 'not working?') {
        res.reply('Hell yeeeee')
        return
      }
      else if (workType === 'working hard?') {
        res.reply('oh lordy no :woozy_face:')
        return
      }
      else if (workType === 'doing nothing?') {
        res.reply(':smirk:')
        return
      }
      else {
        res.reply('Nah.')
        return
      }
    })

// Third call and response, ask the robot what it likes. User can also provide feedback on answer. Uses random and for loop.
robot.respond(/what do you like?/i, (res) => {
//Repurposed off the fizz example
  const likeStuffCount = +robot.brain.get('stuffCount') || 0;

  let likeStuff = [
    '<https://preview.free3d.com/img/2019/02/2279592098275526247/9vqgssvz-900.jpg|Sitting on the couch!>',
    'Doing _Nothing_','Watching TV :tv:','Playing games :video_games:',':hamburger:',':pizza:','*Love* a nap :sleeping:'];
  res.send(`${res.random(likeStuff)}`)
  robot.brain.set('stuffCount', likeStuffCount + 1)

  })
//After the slackerbot has said what it likes, the user can give positive or negative feedback

//positive
robot.respond(/cool|awesome|me too|love it|hell yeah|the best|:thumbsup:|nice one/i, (res) => {
  let agreeArr = ['I knew you were one of the good ones','hell yeeeee right?!', 'It\'s the best!']
  const likeStuffCount = +robot.brain.get('stuffCount')
  if (likeStuffCount > 0) {
    res.send(`${res.random(agreeArr)}`)
    robot.brain.set('stuffCount', 0)
    }
  })

  robot.respond(/gross|that sucks|really|you can do better|you are basic|how original|I would have never guessed/i, (res) => {
    let disagreeArr = ['oh... please','As if you dont','...whatever','You wouldnt understand','You are basic','I never said I was fancy','Well, you need to take a good hard look in the mirror there buddy','*_hubot has left the chat_*']
    const likeStuffCount = +robot.brain.get('stuffCount')
    if (likeStuffCount > 0) {
      res.send(`${res.random(disagreeArr)}`)
      robot.brain.set('stuffCount', 0)
      }
    })

//TWO MATH TEST
  robot.respond(/what is (.*?) (.*) (.*)/i, (res) => {

    // this took ages to figure out, had to set the first res match to lazy by using the question mark, tested this on here: https://regex101.com/
    const userMathOne = res.match[1];
    const userOperator = res.match[2];
    const userMathTwo = res.match[3];
    
    //these are used to convert the string to actual integer later 
    let mathOne = 2;
    let mathTwo = 0;
    let operator = '';
    let error = 0;
    // operator conversion part one of two! This one was easy, but due to it still being a string it still needs to be converted further after this as you can't simply assign an operator to a variable. 
    if (userOperator === 'plus' || userOperator === '+') { operator = '+';}
    else if (userOperator === 'minus' || userOperator === '-') { operator = '-';}
    else if (userOperator === 'times' || userOperator === '*') { operator = '*';}
    else if (userOperator === 'divided by' || userOperator === '/') { operator = '/';}



    // I want slackerbot to be conversational, so have allowed some words. Parse the rest. If it's NaN, update new error code. 
    if (userMathOne === 'one') { mathOne = 1}
    else if (userMathOne === 'two') { mathOne = 2;}
    else if (userMathOne === 'three') { mathOne = 3;}
    else if (userMathOne === 'four') { mathOne = 4;}
    else if (userMathOne === 'five') { mathOne = 5;}
    else if (userMathOne === 'six') { mathOne = 6;}
    else if (userMathOne === 'seven') { mathOne = 7;}
    else if (userMathOne === 'eight') { mathOne = 8;}
    else if (userMathOne === 'nine') { mathOne = 9;}
    else if (isFinite(parseInt(userMathOne))) {
      mathOne = parseInt(userMathOne);
    } 
    else { error = 2;};

    if (userMathTwo === 'one') { mathTwo = 1}
    else if (userMathTwo === 'two') { mathTwo = 2;}
    else if (userMathTwo === 'three') { mathTwo = 3;}
    else if (userMathTwo === 'four') { mathTwo = 4;}
    else if (userMathTwo === 'five') { mathTwo = 5;}
    else if (userMathTwo === 'six') { mathTwo = 6;}
    else if (userMathTwo === 'seven') { mathTwo = 7;}
    else if (userMathTwo === 'eight') { mathTwo = 8;}
    else if (userMathTwo === 'nine') { mathTwo = 9;}
    else if (isFinite(parseInt(userMathTwo))) {
      mathTwo = parseInt(userMathTwo);
    } 
    else { error = 2;};
//Here is part two of two for operator conversion. Turn into function based on string operator
//https://stackoverflow.com/questions/5834318/are-variable-operators-possible    
    let operatorConversion = {
      '+' : function(a, b) { return a + b },
      '-' : function(a, b) { return a - b },
      '*' : function(a, b) { return a * b },
      '/' : function(a, b) { return a / b },
    };


//here is how the answer is calculated
let answer = operatorConversion[operator](mathOne,mathTwo);

//Bad answer, used as part of the answer
let badAnswer = Math.floor(answer / 0.75);

//array of lazy things to say when asked
let lazyArr = ['Look I really can\'t be bothered but here goes...',
'Ahhhhh, come on, you know I can\'t be bothered!',
'You will owe me $50 if I get it right, here goes...',
'Seriously? Do I look like a robot???',
'NOOOOOOOO!! I\'m not doing math',
'Can. Not. Be. _Bothered._ Doing. That. But. Here. Goes...'];

// Array of sad / angry emojis
let sadArr = [':confounded:',':persevere:',':disappointed:',':sweat:',':weary:',':tired_face:',':yawning_face:',':rage:',':white_frowning_face:',':cry:',':sob:',':angry:',':confused:',':clown_face:',':skull_and_crossbones:',':triumph:',]
//waiting comment array
let waitingArr = ['hmmmmmm','that doesn\'t seem right does it\?','.....','oh wait','ahh snap','ah shoot','actually, let me double check that','nah that can\'t be right','....... oh.... actually','.... ah. nah','does that sound right\?','actually not sure if that\'s right','can you check? actually don\'t worry let me google it','not 100\% on that actually','...yeah','... hey I don\'t know','well if I had shoulders to shrug I *would*..... it\'s not right is it','yeah.....surely','.... ... ...','ahhh... dang',];

let answerArr = ['Sorreeeeee it\'s','Haha, just kiding, it\'s','Oh right, sorry it\'s','Oh wait, it\'s', 'Actually, I double checked that on my phone and it\'s actually','I\'m never doing that again, answer is','Actually, it\'s','Just pulling your leg, answer is actually','Whooooops, it\'s','my bad, it\'s']

let unsureEmoji = [':disguised_face:',':thinking_face:',':nerd_face:',':abacus:',':male_mage:',]

//Delay function, works well my third call so using here as well. 
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

//random function for changing what things are said, I did this because I wanted variation in the amount of things said so added this into the following if else statements that are contained in the for loop
function random() {return Math.floor(Math.random()*2)}    
// Final printing of statements, filters through error numbers first. Wanted to have all the printing here instead of within the previous if statements. Due to the bad answer statement there is a seperate else if if the answer is two as the bad answer won't work

if (error === 2){
      res.send(`woah-woah-woah, can you just type the actual number so I can put it in my phone calculator`)
}
else {
  for (let i = 0; i < 5; i++) {
    if (answer < 3) {
      res.reply(`That's actually really simple, it's just ${answer}`);
      return    
    }
    else if (i === 0 && random() === 1) {
    sleep(2000 * i).then(() => { 
      res.reply(`${res.random(lazyArr)}`)});
    }
    else if (i === 1 && random() === 1) { 
    sleep(2500 * i).then(() => { res.reply(`${res.random(sadArr)}`)});
    }
    else if (i === 2) { 
      sleep(3000 * i).then(() => { res.reply(`Is it ${badAnswer} ${res.random(unsureEmoji)}`)});
      }
    else if (i === 3) { 
      sleep(4000 * i).then(() => { res.reply(`${res.random(waitingArr)}`)});
      }
    else if (i === 4) { 
        sleep(5000 * i).then(() => { res.reply(`${res.random(answerArr)} *${answer}*`)});
        }
  }
  }})
  

  // DEBUG SEND, this helped me figure out a bunch of issues I was having early on. Leaving here for reference 
  // res.send(`The answer is *${operatorConversion[operator](mathOne,mathTwo)}* Your numbers were ${userMathOne} and ${userMathTwo}, the converted numbers were ${mathOne} and ${mathTwo}. The operator is ${operator}`)


// THREE Create a random series of heroes based on user input. Do not repeat any heros. Allow input of numbers or words as numbers to control amount of heroes. Post each hero individually, and use bookend first and last statement with grammer.
  robot.respond(/Who are your current (.*) heroes?/i, (res) => {
      const numberHeroes = res.match[1];

//The array of heroes, uses slacks formating rules to ensure the comment doesn't actually have the URL string in it and just the name instead.
      let heroesArr = ['<https://pics.me.me/thumb_los-simpsons-same-the-simpsons-bart-simpson-lisa-52854057.png|Bart>',
                        '<https://upload.wikimedia.org/wikipedia/en/5/55/King-Size_Homer.png|Homer>',
                        '<https://lwlies.com/wp-content/uploads/2016/01/the-big-lebowski-the-dude-rug-1108x0-c-default.jpg|The Dude>',
                        '<https://static.wikia.nocookie.net/brooklynnine-nine/images/e/e5/NewBrooklynNineNineOpeningCredit_-_Hitchcock_%26_Scully.png|Hitchcock & Scully>',
                        '<https://upload.wikimedia.org/wikipedia/commons/4/49/Koala_climbing_tree.jpg|Koalas>',
                        '<https://i.pinimg.com/originals/4d/88/eb/4d88ebc2b8b3a26b8d698ff189f340b3.png|Snorlax>',
                        '<https://www.abc.net.au/cm/rimage/12172884-3x4-xlarge.jpg?v=4|Sloths>',
                      ];
// Array of love emojis, used for final statement
      let emojiArr = [":cupid:",":sparkling_heart:",":revolving_heart:",":heart:",":two_hearts:",":heart_eyes:",]                

// Really wanted a random function that DOESN'T repeat, basically a shuffle. Went down a rabbit hole and found out that the Fisher-yates method worked perfectly for a string array (https://bost.ocks.org/mike/shuffle/compare.html)
      function shuffle(array) {
        let m = array.length, t, i;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      }

      //This is a delay timer, used for the for loop, within the loop it increases based on the repeat count ensuring the messages come through organically. 
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      //convert string to number in variable 
      let numHero = 0;   
      if      (numberHeroes === '2' || numberHeroes ==='two') { numHero = 2;}
      else if (numberHeroes === '3' || numberHeroes ==='three') { numHero = 3;}
      else if (numberHeroes === '4' || numberHeroes ==='four') { numHero = 4;}
      else if (numberHeroes === '5' || numberHeroes ==='five') { numHero = 5;}
      else if (numberHeroes === '6' || numberHeroes ==='six') { numHero = 6;}
      else if (numberHeroes === '7' || numberHeroes ==='seven') { numHero = 7;}
      else {res.reply('I don\'t have that many heroes unfortunately, I can only think of 7'); } 
//Call the function and re-order the array.
      shuffle(heroesArr);

// For loop that delays the output, found a solution for ensuring that the delay increases on each iteration here: https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
      for (let i = 0; i < numHero; i++) {
            if (i === 0) {
            sleep(2000 * i).then(() => { res.reply(`Firstly, you can't beat how lazy ${heroesArr[i]} is!`)});
            }
            else if (i === (numHero - 1)) { 
            sleep(4000 * i).then(() => { res.reply(`Lastly, how could I forget, *${heroesArr[i]}* ${res.random(emojiArr)}`)});
            }
            else {
              sleep(3000 * i).then(() => { res.reply(`${heroesArr[i]},`)});  
            }
          }
        })}
          