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
  // Hi milbot
   robot.hear(/Hi milbot|Hello milbot/i, (res) => {
     res.send('Hello Milad')
   });
  
  // Introduce
  robot.respond(/Who are you/i, (res) => {
    res.emote('I am Milbot, Nice too meet you  ;)')
  });

  // Random Array test
   const lulz = ['lol', 'rofl', 'lmao']
   robot.respond(`/${lulz.join('|')}/i`, (res) => {
   res.send(res.random(lulz))
  });
  
  // Love Test with if  statement
  robot.respond(/Love you/i, (response) => {
    // Get number of sodas had (coerced to a number).
    const loveCount = +robot.brain.get('totalLove') || 0
    if (loveCount >= 2) {
      response.reply('wowwwwwww, I love you too Milad :)')
      return
    }
    response.reply('wowwwwwww')
    robot.brain.set('totalLove', loveCount + 1)
  })

  // Reset love count
  robot.respond(/reset/i, (res) => {
    robot.brain.set('totalLove', 0)
    res.reply('Reset Love')
  })

// if statment to know you are milbot or not
  robot.respond(/Are you (.*)/i, (res) => {
    const inType = res.match[1]
  
    if (inType === 'milbot') {
      res.reply('Yea, This is milbot')
      return
    }
  
    res.reply(`No ,I am not ${inType} `)
  })

// find user input in array and reply in match answer
  const enterReplies = ['hi', 'how are you', 'how old are you']
  const leaveReplies = ['hi there', 'I am good', 'I am 32 years old']
  robot.respond(/milbot (.*)/i, (res) => {
    const inType1 = res.match[1]
  
    if (enterReplies.includes(inType1)) {
      //res.reply('Yea,works')
      let enterRepliesIndex =  enterReplies.indexOf(inType1)
      res.reply(leaveReplies[enterRepliesIndex])
      return
    }
  
    res.reply(`${inType1} , This word is not in my memory`)
  })

// Usd To Euro
robot.respond(/usd (.*)/i, (res) => {
  //console.log('works')
  const usd = res.match[1]
  const euro = 0.83
  let final = usd*euro
  res.reply(`USD To EUR => ${final} EUR`)
  return
})

// Random Image test  
let pics = ["http://img.skitch.com/20100714-d6q52xajfh4cimxr3888yb77ru.jpg", "https://img.skitch.com/20111026-r2wsngtu4jftwxmsytdke6arwd.png", "http://cl.ly/1i0s1r3t2s2G3P1N3t3M/Screen_Shot_2011-10-27_at_9.36.45_AM.png", "http://shipitsquirrel.github.com/images/squirrel.png"];

 robot.hear(/pic/i, function(res) {
   res.send(res.random(pics))
   return
})

//  we have a class today or not
robot.respond(/Do we have a class today/i, (res) => {
 
  let today = new Date();
  //console.log(today);
  let day = today.getDay();
  //console.log(day);
  let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
  let n = weekday[day];
  if(day === 2 || day === 4){
    res.reply(`Today is ${n} and we have a class`);
  }else{
    res.reply(`Today is ${n} and we do not have a class`) ;
  }
  return
})

/// Milad Web Site
 robot.hear(/website/i, function(res) {
   res.send("This is Milad Website :   miladweb.com")
   return
})

// annoy msg
let annoyIntervalId = null
  
robot.respond(/annoy me/, (res) => {
  if (annoyIntervalId) {
    res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH')
    return
  }

  res.send('Hey, want to hear the most annoying sound in the world?')
  annoyIntervalId = setInterval(() => res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH'), 1000)
})

// stop annnoy msg
robot.respond(/unannoy me/, (res) => {
  if (!annoyIntervalId) {
    res.send('Not annoying you right now, am I?')
    return
  }

  res.send('OKAY, OKAY, OKAY!')
  clearInterval(annoyIntervalId)
  annoyIntervalId = null
})
}
