// Description:
/* 
Hypebot is a bot that tells Sneaker jokes! 
It will also will provide a link to a pair of Sneakers I am looking to purchase 
*/

// Commands:
/*

*/

// Hypebot

/* Function 1
HypeBot will respond using switch statements and tell some jokes
*/
module.exports = function(robot) {
  robot.respond(/What is your favorite (.*)/, function(msg) {
    let fav;
    fav = msg.match[1];
    console.log(fav);
    switch (fav) {
      case "Sneaker":
        return msg.reply("Who needs feet?, When I can buy sneakers faster than you");
        break;
      case "brand":
        return msg.reply("It's gotta be Nike and their new draw system for teh SNKRS App");
        break;
      default:
        return msg.reply("I don't have a favorite " + fav + ". What's yours?");
    }
  });

/* Function 2
  If a user enters 'Price 85' it return a "random" their are only two designs of the Jordan 1's 85 sneakers that released earlier this year.  
  90% of the stocks were taken by bots and have not inflated the price.  So this fuction will reply with either pairs current price*/

  robot.hear(/Price 85/i, function(msg) {
    let sneakers = ["https://stockx.com/air-jordan-1-retro-high-85-neutral-grey", "https://stockx.com/air-jordan-1-retro-high-85-varsity-red"];
    return msg.send(msg.random(sneakers));
  });

/* Function 3
  Hypebot will respond with replies*/    
  robot.respond(/is it a (weekend|holiday)\s?\?/i, function(msg){
    let today = new Date();

    msg.reply(today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO");
});

robot.hear(/I took the L/i, function(msg){
    msg.send("Congratulations!");
});

robot.respond(/Where did you come from?/i, function(msg){
    msg.reply('Ive always been here lurking waiting for the right moment to strick');
});

robot.respond(/convert \$(.*) to Doge/i, function(res){
    let usd = res.match[1];
    res.reply('That is about ' + usd * 0.5549 + ' in Doge');
});

}


