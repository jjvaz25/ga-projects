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

module.exports = (robot) => {

//------------------help command for hubot commands--------------------------------------
  // default help has been removed from external-scripts.js, "hubot-help"
  robot.respond(/help/, (res) => {
      res.send(`
Hello, my name is Heobot. Here are some commands you can type: 
- break for x (x represents minutes and has to be a positive number) 
- cancel break
- rps (Korean Rock Paper Scissors Game) 
- ttt (Tic Tac Toe) `);
  })  


//------------------break command for connie--------------------------------------
  // need the breakId in case we want to cancel  
  let breakId = null 

  // break command
  robot.respond(/break for (.*)/, (res) => {
    // can't use break as a variable name!!
    let breakTime = res.match[1]
    
    if (breakTime === 1) {
      res.send('Please be back in ' + breakTime + ' minute!')
    } else 
      res.send('Please be back in ' + breakTime + ' minutes!') 
    breakId = setTimeout(() => res.send('@here …aaand we’re back!'), breakTime * 60 * 1000)
  })

  // cancel break command
  // if you use the "break for x" command more than once in a row, 
  // then you can only cancel the most recent one
  robot.respond(/cancel break/, (res) => {
    if (!breakId) {
      res.send('No timer set currently')
      return
    }
 
    res.send('Timer cancelled')
    clearInterval(breakId)
    breakId = null  
  }) 

//------------------korean rps--------------------------------------
  // korean rock paper scissors, the game is "off" by default
  // multi line return is `, not a single quote '
  //res.send can only send strings, not numbers, arrays, etc. 

  let rpsMode = false
  let rpsRound = 1
  let rpsHubotChoice = ''
  let rpsPlayerChoice = ''
  let advantage = '' 
  // index 0 = hubot's choice, index 1 = player win, index 2 = player lose
  const hubotWinLose = [
    ['rock', 'paper', "scissor"],
    ['paper', 'scissor', 'rock'],
    ['scissor', 'rock', 'paper']
  ]

  let emojiConverter = function (choice) {
    if (choice === 'rock') {
      return ':rock:'
    } else if (choice === 'paper') {
      return ':roll_of_paper:'
    } else if (choice === 'scissor') {
      return ':scissors:'
    }
  }

  let playerWinScript = function (rpsPlayerChoice, rpsHubotChoice) {
    let playerEmoji = emojiConverter(rpsPlayerChoice)
    let hubotEmoji = emojiConverter(rpsHubotChoice)
    let script = `
You: ${playerEmoji}     ${hubotEmoji} :Hubot

${rpsPlayerChoice} beats ${rpsHubotChoice}. You're at advantage. 
Now we switch, and if we match, then you win!`
    return script
  }
  
  let playerLoseScript = function (rpsPlayerChoice, rpsHubotChoice) {
    let playerEmoji = emojiConverter(rpsPlayerChoice)
    let hubotEmoji = emojiConverter(rpsHubotChoice)
    let script = `
You: ${playerEmoji}     ${hubotEmoji} :Hubot

${rpsHubotChoice} beats ${rpsPlayerChoice}. Hubot is at advantage. 
Now we switch, and if we match, then you lose!`
    return script
  }

  let tieScript1 = function (rpsPlayerChoice, rpsHubotChoice) {
    let playerEmoji = emojiConverter(rpsPlayerChoice)
    let hubotEmoji = emojiConverter(rpsHubotChoice)
    let script = `
You: ${playerEmoji}     ${hubotEmoji} :Hubot

Tie! Again!`
    return script
  }
  
  let tieScript2 = function (rpsPlayerChoice, rpsHubotChoice, advantage) {
    let playerEmoji = emojiConverter(rpsPlayerChoice)
    let hubotEmoji = emojiConverter(rpsHubotChoice)
    let decision = 'lose'
    if (advantage === 'player') {
      decision = 'win'
    }
    let script = `
You: ${playerEmoji}     ${hubotEmoji} :Hubot

You ${decision}!`
    
    return script
  }


  robot.respond(/rps/i, (res) => {
    // turn "on" the game
    rpsMode = true  
    rpsHubotChoice = res.random(hubotWinLose)
    res.send('Rock, Paper, Scissor, Shoot! Choose one.')
  })
  
  robot.hear(/(.*)/i, (res) => {
    rpsPlayerChoice = res.match[1].toLowerCase()
    
    // for first round
    if (rpsMode && rpsRound === 1) {  
      
      // tie
      if (rpsPlayerChoice === rpsHubotChoice[0]) {
        res.send(tieScript1(rpsPlayerChoice, rpsHubotChoice[0]))
        rpsHubotChoice = res.random(hubotWinLose)
      
      // player win
      
      } else if (rpsPlayerChoice === rpsHubotChoice[1]) {
        res.send(playerWinScript(rpsPlayerChoice, rpsHubotChoice[0]))
        advantage = 'player' 
        rpsRound = 2

      // player lose
      } else if (rpsPlayerChoice === rpsHubotChoice[2]) {
        res.send(playerLoseScript(rpsPlayerChoice, rpsHubotChoice[0]))
        advantage = 'hubot'
        rpsRound = 2
      
        // to exit the game
      } else if (rpsPlayerChoice === 'exit') {
        res.send('Next time!')
        rpsMode = false
      
      // nothing, to avoid the very first auto response
      } else if (rpsPlayerChoice === 'hubot rps') {
        
      // invalid inputs
      } else {
        res.send('Your options are "rock", "paper", "scissor", or "exit"')
      }

    } else if (rpsMode && rpsRound === 2) {
      rpsHubotChoice = res.random(hubotWinLose)
      
      // tie, game over
      if (rpsPlayerChoice === rpsHubotChoice[0]) {
        res.send(tieScript2(rpsPlayerChoice, rpsHubotChoice[0], advantage))
          rpsMode = false
          rpsRound = 1
      
      // player advantage
      } else if (rpsPlayerChoice === rpsHubotChoice[1]) {
        res.send(playerWinScript(rpsPlayerChoice, rpsHubotChoice[0]))
        advantage = 'player' 

      // hubot advantage
      } else if (rpsPlayerChoice === rpsHubotChoice[2]) {
        res.send(playerLoseScript(rpsPlayerChoice, rpsHubotChoice[0]))
        advantage = 'hubot'
      
      // to exit the game
      } else if (rpsPlayerChoice === 'exit') {
        res.send('Next time!')
        rpsMode = false
      
      // nothing, to avoid the very first auto response
      } else if (rpsPlayerChoice === 'hubot rps') {
        
      // invalid inputs
      } else {
        res.send('Your options are "rock", "paper", "scissor", or "exit"')
      }
    
    }
    
  })
  
//------------------tic tac toe--------------------------------------
  
  let tttMode = 'off'
  let tttPlayerChoice = ''
  let tttHubotChoice = ''
  let tttPlayerSlots = []
  let tttHubotSlots = []
  let tttAvailable = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  let tttUnavailable = []
  let tttBoard = ['  ','  ','  ','  ','  ','  ','  ','  ','  ']
  let tttTurn = 0
  let winner = ''
  let winningBoard = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
  ]

  let winChecker = function(slots) {
    for (let i = 0; i < winningBoard.length; i++)
      if (slots.includes(winningBoard[i][0]) && slots.includes(winningBoard[i][1]) && slots.includes(winningBoard[i][2])) {
        tttMode = 'over'
        
        // determine winner
        if (tttTurn % 2 === 0) {
          winner = 'Hubot'
        } else {
          winner = 'Player'
        }
        break
      }
  }

  let tttBoardDisplay = function() {
    //let string = tttBoard[0] + '|' + tttBoard[1] + '|' + tttBoard[2] + '\n' + tttBoard[3] + '|' + tttBoard[4] + '|' + tttBoard[5] + '\n' + tttBoard[6] + '|' + tttBoard[7] + '|' + tttBoard[8]
    let string = `
|${tttBoard[0]}|${tttBoard[1]}|${tttBoard[2]}|
|${tttBoard[3]}|${tttBoard[4]}|${tttBoard[5]}|
|${tttBoard[6]}|${tttBoard[7]}|${tttBoard[8]}|`
    return string
  }
  robot.respond(/ttt/i, (res) => {
    // turn "on" the game
    tttMode = 'on'  
    res.send('You\'re x, and you go first! Choose any slot from 1-9')
    res.send(`Reference
  1|2|3
  4|5|6
  7|8|9`)
  })

  robot.hear(/(.*)/i, (res) => {
    if (tttMode === 'on') {  
      // player turn
      tttPlayerChoice = res.match[1]

      if (tttAvailable.includes(tttPlayerChoice)) {
        // mark the board
        tttBoard[tttPlayerChoice-1] = 'x'
        
        // push choice to the unavailable array, 
        tttUnavailable.push(tttPlayerChoice)  
        
        // find the choice in the available array, and remove it
        tttAvailable.splice(tttAvailable.indexOf(tttPlayerChoice), 1)

        // increment 1 to turn
        tttTurn += 1

        // push choice to playerslots
        tttPlayerSlots.push(tttPlayerChoice)
        
        winChecker(tttPlayerSlots)
        
        // display the board
        res.send(tttBoardDisplay())
      
        // hubot's turn
        if (tttTurn < 9 && tttMode === 'on') {
          tttHubotChoice = res.random(tttAvailable)
          
          // mark the board
          tttBoard[tttHubotChoice-1] = 'o'
          
          tttUnavailable.push(tttHubotChoice)  
          
          // find the choice in the available array, and remove it
          tttAvailable.splice(tttAvailable.indexOf(tttHubotChoice), 1)
          
           // increment 1 to turn
          tttTurn += 1

          // push choice to hubotslots
          tttHubotSlots.push(tttHubotChoice)
          
          winChecker(tttHubotSlots)
          res.send(tttHubotChoice) 
          res.send(tttBoardDisplay())

        }  

      // nothing, to avoid the very first auto response
      } else if (tttUnavailable.includes(tttPlayerChoice)) {
        res.send('Already taken! Choose a different slot')

      // nothing, to avoid the very first auto response
      } else if (tttPlayerChoice === 'hubot ttt') {

      } else if (tttPlayerChoice.toLowerCase() === 'exit') {
        res.send('Next time!')
        tttMode = 'off'
        // reset everything
        tttPlayerChoice = ''
        tttHubotChoice = ''
        tttPlayerSlots = []
        tttHubotSlots = []
        tttAvailable = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        tttUnavailable = []
        tttBoard = ['  ','  ','  ','  ','  ','  ','  ','  ','  ']
        tttTurn = 0
        
          
      } else {
        res.send('Type in any available slot between 1-9 or "exit"')
      }

    } 
    
    if (tttMode === 'over') {
      res.send('Game over! ' + winner + ' wins!')
      
      // reset everything
      tttPlayerChoice = ''
      tttHubotChoice = ''
      tttPlayerSlots = []
      tttHubotSlots = []
      tttAvailable = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      tttUnavailable = []
      tttBoard = ['  ','  ','  ','  ','  ','  ','  ','  ','  ']
      tttTurn = 0
      tttMode = 'off'
    }



  })


}
