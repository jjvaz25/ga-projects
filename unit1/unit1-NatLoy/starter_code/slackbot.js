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

module.exports = (robot) => {

  robot.respond(/My birthday is (.*) (.*)/i, (msg) => {

    const validMonths = ["january","febuary","march","april","may","june","july","august","september","october","november", "december"];
    robot.brain.set('date',msg.match[1]);
    let date = robot.brain.get('date');
    robot.brain.set('month',msg.match[2].toLowerCase());
    let month = robot.brain.get('month');

    if(validMonths.includes(month)){  
      switch (month) {
        case "january":
          if (date <= 19){
            msg.reply("You are Capricorn!");
            robot.brain.set('starSign','Capricorn');
            return;
          }else{
            msg.reply("You are Aqarius!");
            robot.brain.set('starSign','Aqarius');
            return ;
          }
        case "febuary":
          if (date <= 18){
            msg.reply("You are Aqarius!");
            robot.brain.set('starSign','Aqarius');
            return ;
          }else{
            msg.reply("You are Pisces!");
            robot.brain.set('starSign','Pisces');
            return; 
          }
        case "march":
          if (date <= 20){
            msg.reply("You are Pisces!");
            robot.brain.set('starSign','Pisces');
            return; 
          }else{
            msg.reply("You are Aries!");
            robot.brain.set('starSign','Aries');
            return; 
          }
        case "april":
          if (date <= 19){
            msg.reply("You are Aries!");
            robot.brain.set('starSign','Aries');
            return; 
          }else{
            msg.reply("You are Taurus!");
            robot.brain.set('starSign','Taurus');
            return;
          }
        case "may":
          if (date <= 20){
            msg.reply("You are Taurus!");
            robot.brain.set('starSign','Taurus');
            return;
          }else{
            msg.reply("You are Gemini!");
            robot.brain.set('starSign','Gemini');
            return;
          }
        case "june":
          if (date <= 20){
            msg.reply("You are Gemini!");
            robot.brain.set('starSign','Gemini');
            return;
          }else{
            msg.reply("You are Cancer!");
            robot.brain.set('starSign','Cancer');
            return;
          }
        case "july":
          if (date <= 22){
            msg.reply("You are Cancer!");
            robot.brain.set('starSign','Cancer');
            return;
          }else{
            msg.reply("You are Leo!");
            robot.brain.set('starSign','Leo');
            return;
          }
        case "august":
          if (date <= 22){
            msg.reply("You are Leo!");
            robot.brain.set('starSign','Leo');
            return;
          }else{
            msg.reply("You are Virgo!");
            robot.brain.set('starSign','Virgo');
            return;
          }
        case "september":
          if (date <= 23){
            msg.reply("You are Virgo!");
            robot.brain.set('starSign','Virgo');
            return;
          }else{
            msg.reply("You are Libra!");
            robot.brain.set('starSign','Libra');
            return;
          }
        case "october":
          if (date <= 22){
            msg.reply("You are Libra!");
            robot.brain.set('starSign','Libra');
            return;
          }else{
            msg.reply("You are Scorpio!");
            robot.brain.set('starSign','Scorpio');
            return;
          }
        case "november":
          if (date <= 21){
            msg.reply("You are Scorpio!");
            robot.brain.set('starSign','Scorpio');
            return;
          }else{
            msg.reply("You are Sagittarius!");
            robot.brain.set('starSign','Sagittarius');
            return;
          }
        case "december":
          if (date <= 21){
            msg.reply("You are Sagittarius!");
            robot.brain.set('starSign','Sagittarius');
            return;
          }else{
            msg.reply("You are Capricorn!");
            robot.brain.set('starSign','Capricorn');
            return;
          }
        default:
          return msg.reply("Invalid date! Try again");
      }
    } else{
      msg.reply("That is not a valid month, please try again!")
      return;
    }
  })

  robot.respond(/What does my star sign mean/i, (msg) => {
    let starSign = robot.brain.get('starSign');
    
    if(!starSign) {
      msg.send("I dont know your birthday, Tell me your birthday 'My birthday is (date) (month)'");
      return;
    }

    switch (starSign) {
      case 'Capricorn':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/capricorn-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-12_grande.png?v=1519402077");
        return;
      case 'Sagittarius':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/sagittarius-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-11_grande.png?v=1519402038");
        return;
      case 'Scorpio':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/scorpio-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-10_grande.png?v=1519402036");
        return;
      case 'Libra':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/libra-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-09_grande.png?v=1519402034");
        return;
      case 'virgo':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/virgo-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-08_grande.png?v=1519402001");
        return;
      case 'Leo':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/leo-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-07_grande.png?v=1519401999");
        return;
      case 'Cancer':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/cancer-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-06_grande.png?v=1519401983");
        return;
      case 'Gemini':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/gemini-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-05_grande.png?v=1519357009");
        return;
      case 'Taurus':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/taurus-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-04_grande.png?v=1519357005");
        return;
      case 'Aries':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/aries-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-03_grande.png?v=1519356970");
        return;
      case 'Pisces':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/pisces-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-14_grande.png?v=1519402083");
        return;
      case 'Aquarius':
        msg.send("https://cdn.shopify.com/s/files/1/1325/0879/files/aquarius-zodiac-signs-list-cheat-sheet-horoscope-natal-chart-personality-astrology-13_grande.png?v=1519402080");
        return;
    } 
  })

  const posTrait = ['attentive','sociable','motivated','intelligent','realistic','attractive','humble','honest','loyal','smart','understanding','active','dynamic','hardworking','strong-willed','kind','positve']
  const negTrait = ['stubborn','temperamental','insensitive','talkative','emotional','shy','secretive','reserved','opinionated']
  

  robot.respond(/Tell me more/i, (msg) => {
    let askCount = robot.brain.get('askCount') || 1;
    
    if(askCount < 4) {
      robot.brain.set('askCount', askCount+1);
      msg.send("You are "+msg.random(posTrait)+"!");
      return;
    }else if (askCount == 4){
      robot.brain.set('askCount', askCount+1);
      msg.send("You are obsessed with yourself!");
      return;
    } else {
      robot.brain.set('askCount', askCount+1);
      msg.send("You are "+msg.random(negTrait)+"!");
      return;
    }
  })

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
