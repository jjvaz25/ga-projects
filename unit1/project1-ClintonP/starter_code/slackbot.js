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
  const locations = ['American', 'Australian', 'European', 'Asian', 'Antarctic', 'Pacific', 'Atlantic', 'California', 'Virginia', 'Texas', 'New England', 'Saharan', 'Himalayan', 'Norwegian', 'Lithuanian', 'Egyptian', 'Chinese', 'Japanese', 'Korean', 'Vietnamese', 'Russian', 'Canadian', 'Long-haired', 'Short-haired', 'Fuzzy'];
const actions = ['singing', 'jumping', 'demon', 'laughing', 'divine', 'cartwheeling', 'hopping', 'spitting', 'lunging', 'sun', 'sitting', 'diving', 'yelling', 'tumbling', 'shrieking', 'crying'];
const species = ['dingo', 'bat', 'shrew', 'sparrow', 'spider', 'frog', 'toad', 'beetle', 'koala', 'owl', 'turtle', 'dolphin', 'wolf', 'lizard', 'whale', 'cat', 'bear', 'deer', 'moose', 'moth', 'mouse', 'rat'];
const exclamations = [
    'Get a load of that',
    'Congratulations! You\'ve willed into existance the',
    'It\'s a bird! It\'s a plane! It\'s a',
    'My ideal pet would be the',
    'People often say that I look like a',
    'Watch out! It\'s the',
    'New species alert!',
    'Scientists have announced the discovery of the'
];

function generateRandomArrayValue(inputArray) {

  return inputArray[Math.floor(Math.random() * inputArray.length)];

};

function capitalize(stringValue) {
  if (typeof stringValue != 'string') return ''

  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);

};

  robot.respond(/Random animal\s*(!l:[^!]*)*(!d:[^!]*)*(!a:[^!]*)*/i, (res) => {

       
    // let locationMatch = res.match[0].match(/!l:[^!]*/i)[0];
    // let descriptorMatch = res.match[0].match(/!d:[^!]*/i)[0];
    // let animalMatch = res.match[0].match(/!d:[^!]*/i)[0];    

    // let inputLocation = locationMatch ? locationMatch.replace("!l:", "").trim() : '';
    
    // Create sentence pieces based off user input. If no user input, use random values.
    let phrase = generateRandomArrayValue(exclamations);
    let location = res.match[1] ? res.match[1].replace("!l:", "").trim() : generateRandomArrayValue(locations);
    let descriptor = res.match[2] ? res.match[2].replace("!d:", "").trim() : generateRandomArrayValue(actions);
    let animal = res.match[3] ? res.match[3].replace("!a:", "").trim() : generateRandomArrayValue(species);

    // Respond by building sentence out of pieces.
    res.send(`${capitalize(phrase)} ${capitalize(location)} ${capitalize(descriptor)} ${capitalize(animal)}!`);

   });

   robot.respond(/(.*\s|^)mock(?:ing|s|ed|ery)*(\s.*|$)/i, (res) => {

    // Hubot loves mocking birds. If he hears about one, he'll be sure to let you know!
    if(res.match[0].includes('mocking bird')) {
      res.send('I love mocking birds! It\'s my favorite animal! You know, I\'m something of a pro myself...');
    } else { 
    // ...however he also loves being annoying. If he suspects potential mockery is afoot, he'll act at once!
    
    // The first rule of mocking is to repeat the victim's sentence back to them. Let's start by remembering what the user said, ignoring hubot's name.
     let mockingString = '',
         inputString = res.match[0].replace(/@*hubot\d{0,}/i, '');
    
    // The second rule of mocking is to make the mockery as annoying as possible! Let's randomly capitalize each letter of the sentence!
     for(let i = 0, len = inputString.length; i < len; i++)
     {
       mockingString += Math.floor(Math.random() * 2) === 0 ? inputString[i].toUpperCase() : inputString[i].toLowerCase();
     }

     // At last! Commence mocking!
     res.send(mockingString + '\n https://media.giphy.com/media/QUXYcgCwvCm4cKcrI3/giphy.gif');
    }
});

robot.respond(/rockpaperscissors\s*(.*)/i, (res) => {

  // Establish what the user input, what the valid choices are, and a variable to save the result to.
  let userInput = res.match[1].trim() || '';
  let validOptions = ['rock','paper','scissors'];
  let result = '';

  if(!userInput) { // Check if the user gave an input. If not, let them know!
    result = 'You can\'t play rock, paper, scissors without making a choice!';
  } else if(!validOptions.includes(userInput)) { // Check that the user input is a valid choice. We're not playing rock, paper, scissors, lizard, Spock here!
    result = 'Hey! That\'s not a valid input for this game!';
  } else { // If the user input is valid, begin the game

    // Make hubot's choice by pulling a random value from the validOptions array
    let hubotInput = generateRandomArrayValue(validOptions);

    // Cycle through potential outcomes. 
    if(userInput === hubotInput) { // First, check if there's a tie.
      result = `We both picked ${userInput}. It's a tie!`;
    } else if(userInput === 'rock') { // Check potential outcomes if user picked rock
      if(hubotInput === 'paper') {
        result = `You picked ${userInput} and I picked ${hubotInput}. I win!`;
      } else {
        result = `You picked ${userInput} and I picked ${hubotInput}. You win!`;
      }
    } else if(userInput === 'paper') { // Check potential outcomes if user picked paper
      if(hubotInput === 'scissors') {
        result = `You picked ${userInput} and I picked ${hubotInput}. I win!`;
      } else {
        result = `You picked ${userInput} and I picked ${hubotInput}. You win!`;
      } 
    } else if(userInput === 'scissors') { // Check potential outcomes if user picked scissors
      if(hubotInput === 'rock') {
        result = `You picked ${userInput} and I picked ${hubotInput}. I win!`;
      } else {
        result = `You picked ${userInput} and I picked ${hubotInput}. You win!`;
      }
    }
  }

  // The game is over! Let the user know who won!
   res.send(result);
  
});

robot.respond(/.*([A-Za-z])[A-Za-z]*\s+(\1)[A-Za-z]*\s+(\1)[A-Za-z]*.*/i, (res) => {
  // If hubot detects at least three words in a row start with the same letter, he'll point it out.
  res.send('Look at that alliteration! Dr. Seuss over here!');

});
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
