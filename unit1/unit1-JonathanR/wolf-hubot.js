// Description:
//  Wolf Hubot is bot that does a couple of very simple things: 
//  1) Tells you if you should go to bed depending on your tiredness level 
//  2) Tells you if it wants to play a game 
//  3) responds if you tell it your favorite vacation spot 
//  4) shares random wolf gifs
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//  1) My tiredness level is [Insert 1-10], should I go to bed?
//  2) Hi Wolf, let's play a game
//  3) My favorite vacations spot is [Instert place]
//  4) Random wolf gif
//

module.exports = function(robot) {
  // Using Conditionals that tells you if it's your bed time based on your tireness level

  robot.respond(/My tiredness level is (.*), should I go to bed?/i, function (msg) {
    let tirednessLevel;
    tirednessLevel = msg.match[1];
    let level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // if (tirednessLevel.toLowerCase() === `${level[7]}` || tirednessLevel.toLowerCase() === `${level[8]}` || tirednessLevel.toLowerCase() === `${level[9]}`) {
        if (tirednessLevel.toLowerCase() > level[6]) {
        msg.send('Go to bed. It\'s time to sleep')
    } else {
        msg.send('Nope, not bed time yet')
    }

});

robot.hear(/Hi (.*), let's play a game/i, function(msg) {
    var name;
    name = msg.match[1];
    if (name == "Wolf"){
      return msg.send("Sure, let's play rock, paper, scissors");
    } else {
      return msg.reply("Sure, what would you like to play?");
    }
  });   


// Using a for loop to respond to different favorite vacation spots 

robot.respond(/My favorite vacation spot is (.*)/i, function (msg) {
    let vacationSpots = ['Paris', 'Barcelona', 'Bali', 'California', 'Tulum']
    let match = false;
    favVacationSpots = msg.match[1];
    for (let i = 0; i < vacationSpots.length; i++) {
        if (vacationSpots[i].toLowerCase() == favVacationSpots.toLowerCase()) {
            match = true;
        }
    }
    if (match === true) {
        msg.send(`Sweet! I would love to visit ${favVacationSpots}`)
    } else {
        msg.send('No way! I\'ll add it to my fav list')
    } 
});



// Add a random wolf Gif

let wolfGif = ['https://media.giphy.com/media/tYaMjbShvb9CM/giphy.gif', 'https://media.giphy.com/media/iQd8LQFSTsN4Q/giphy.gif', 'https://media.giphy.com/media/11vhKN2q3u6lIQ/giphy.gif', 'https://media.giphy.com/media/12Z3na4w70uNW/giphy.gif', 'https://media.giphy.com/media/yWQNG57XtqasM/giphy.gif', 'https://media.giphy.com/media/122teRA3vWUZ9u/giphy.gif'];

robot.hear(/Random wolf gif/i, function (res) {
    res.send(res.random(wolfGif))
    return
})



// *PLEASE IGNORE*  Based on a game I made in CODECADEMY, I tried to make this Rock, Paper, Scissors game work but was unable to do so -__- 


// robot.respond(/Hi (.*), lets play a game/i, function(msg) {
//     var name;
//     name = msg.match[1];
//     if (name == "Wolf"){
//       return msg.send("Sure, let's play rock, paper, sissors");
//     } else {
//       return msg.reply("Sure, what would you like to play?");
//     }
//   });


// robot.hear(userInput) {
//     getUserChoice = userInput
//     userInput = userInput.toLowerCase();
//     if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb') {
//       return userInput;
//     } else {
//       robot.respond(/Error, please type: rock, paper or scissors/)
//     }
//   });

//   const getBotChoice = () => {
//     const randomNumber = Math.floor(Math.random() * 3);
//     switch (randomNumber) {
//       case 0:
//         return 'rock';
//       case 1:
//         return 'paper';
//       case 2:
//         return 'scissors';
//     }
//   }

//   const determineWinner = (userChoice, botChoice) => {
//     if (userChoice === botChoice) {
//       return 'This game is a tie'
//     }
//     if (userChoice === 'rock') {
//       if (botChoice === 'paper') {
//         return "Sorry, Wolf won!";
//       } else {
//         return "Congratulations, you won!";
//       }
//     }

//     if (userChoice === 'paper') {
//       if (botChoice === 'scissors') {
//         return "Sorry, Wolf won!"
//       } else {
//         return "Congratulations, you won!";
//       }
//     }

//     if (userChoice === 'scissors') {
//       if (botChoice === 'rock') {
//         return 'Sorry, Wolf won!'
//       } else {
//         return "Congratulations, you won!";
//       }
//     } 

//     if (userChoice === 'bomb') {
//       return "Congratulations, you won!";
//     }
//   };

//   const playGame = () => {
//     const userChoice = getUserChoice('paper');
//     const botChoice = getBotChoice();
//     console.log('You threw: ' + userChoice);
//     console.log('The bot threw: ' + botChoice);
//     console.log(determineWinner(userChoice, botChoice));  
//   }

//   playGame();

// }

}