### What jv-hubot does

JV-Hubot will respond to a limit amount of user inputs on slack.

### Commands

"random cat gif": 
- pulls a cat-related gif from the GIPHY api

"My number guess is *insert number*":
- Hubot will generate a random number between 1 and 10 and will provide feedback
based on your answer. If you guess Hubot's number, you win

"vibe check: *insert statement*:
- Hubot will loop over an array of gifs based on what your input for your vube is ('good'
 and 'bad' are the only valid inputs)

 ### Unsolved problems

 There was difficulty getting hubot to fetch data from the OpenWeatherMap API.
 I was able to successfully fetch the data outside of Hubot, but I do not think
 Hubot is capable of using the JavaScript "fetch()" function. I also wasn unable
 to get Hubot to respond with weather data when trying to replicate the code from
 using the GIPHY API.