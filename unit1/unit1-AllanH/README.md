# Heobot

## Commands

### hubot help
- This command will show all the possible commands that Heobot knows. 

### hubot break for x 
- This command can be used to set a timer before the class goes on break. 
- Heobot will ping @here when the timer is over. 
- x represents minutes and has to be a positive number. 
- You can use this command multiple times in a row, but you can only cancel the most recent command with the "cancel break" command. Be careful!

### cancel break
- This command can be used to cancel the most recent timer set by "break for x" command

### hubot rps
- This command will initiative a game of Korean Rock Paper Scissor against hubot
- It's very similar to the original Rock Paper Scissor, but there's one more layer to the game
- Try it out, and read Hubot's directions!

### hubot ttt
- This command will initiative a game of Tic Tac Toe against hubot
- I wanted to have the winning pattern be written in strikethrough font using ~x~, but it wasn't being translated correctly, so I took it out
- There's a lot of inefficiencies for this code where multiple codes are repeated for both Player and Hubot. The next version would simplify the code by creating functions instead of copy and pasting code. 
