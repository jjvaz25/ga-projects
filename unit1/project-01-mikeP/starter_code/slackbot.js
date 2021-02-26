//********* View the readme.md for instructions on how to use this bot ********//

module.exports = function(robot) {

robot.hear(/I wonder how many US presidents there have been.../i, (res) => {
  return res.send('The United States has had 46 presidents and counting!');
  });  



robot.respond(/Who is the (.*) president of the United States/i, function(msg) {
  let presidents = ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe', 'John Quincy Adams', 'Andrew Jackson', 'Martin Van Buren', 'William H. Harrison', 'John Tyler', 'James K. Polk', 'Zachary Taylor', 'Millard Fillmore', 'Franklin Pierce', 'James Buchanan', 'Abraham Lincoln', 'Andrew Johnson', 'Ulysses S. Grant', 'Rutherford B. Hayes', 'James A. Garfield', 'Chester A. Arthur', 'Grover Cleveland', 'Benjamin Harrison', 'Grover Cleveland', 'William McKinley', 'Theodore Roosevelt', 'William H. Taft', 'Woodrow Wilson', 'Warren G. Harding', 'Calvin Coolidge', 'Herbert Hoover', 'Franklin D. Roosevelt', 'Harry S. Truman', 'Dwight D. Eisenhower', 'John F. Kennedy', 'Lyndon B. Johnson', 'Richard M. Nixon', 'Gerald R. Ford', 'Jimmy Carter', 'Ronald Reagan', 'George H. W. Bush', 'Bill Clinton', 'George W. Bush', 'Barack Hussein Obama', 'Donald J. Trump', 'Joseph R. Biden']
  let presNumb = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth', 'thirtieth', 'thirty-first', 'thirty-second', 'thirty-third', 'thirty-fourth', 'thirty-fifth', 'thirty-sixth', 'thirty-seventh', 'thirty-eighth', 'thirty-ninth', 'fortieth', 'forty-first', 'forty-second', 'forty-third', 'forty-fourth', 'forty-fifth', 'forty-sixth']
  
  let myPres = msg.match[1]
    
  return msg.send(presidents[presNumb.indexOf(myPres)])
  });



robot.respond(/Is (.*) one of the original 13 colonies/i, (res) => {
    const colony = res.match[1]
  
    if (colony === 'New Hampshire') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}
    else if (colony === 'Massachusetts') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}
    else if (colony === 'Rhode Island') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}  
    else if (colony === 'Connecticut') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}
    else if (colony === 'New York') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}
    else if (colony === 'Pennsylvania') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}
    else if (colony === 'New Jersey') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}
    else if (colony === 'Delaware') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}
    else if (colony === 'Maryland') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}  
    else if (colony === 'Virginia') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}  
    else if (colony === 'North Carolina') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}  
    else if (colony === 'South Carolina') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}  
    else if (colony === 'Georgia') {
      return res.reply(`Yes, ${res.match[1]} is one of the original 13 colonies`)}  
    else {
      return res.reply(`No, ${res.match[1]}, is not one of the original 13 colonies`)
    }
  });



  return robot.respond(/show me a president/i, function(msg) {
    var presidents
    presidents = ['https://i.postimg.cc/Vkmmxq51/fdr.jpg', 'https://i.postimg.cc/C1L0RSk2/teddy.png', 'https://i.postimg.cc/zvC47QCh/grant.jpg', 'https://i.postimg.cc/T2n8TKzP/lincoln.jpg', 'https://i.postimg.cc/DzSDH0Qn/pullman.jpg' ]
     
     return msg.send(msg.random(presidents));
   });

}


// Using a traditional For loop instead of .indexof 
/*
robot.respond(/Who is the (.*) president of the United States/i, function(msg) {
  let presidents = ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe', 'John Quincy Adams', 'Andrew Jackson', 'Martin Van Buren', 'William H. Harrison', 'John Tyler', 'James K. Polk', 'Zachary Taylor', 'Millard Fillmore', 'Franklin Pierce', 'James Buchanan', 'Abraham Lincoln', 'Andrew Johnson', 'Ulysses S. Grant', 'Rutherford B. Hayes', 'James A. Garfield', 'Chester A. Arthur', 'Grover Cleveland', 'Benjamin Harrison', 'Grover Cleveland', 'William McKinley', 'Theodore Roosevelt', 'William H. Taft', 'Woodrow Wilson', 'Warren G. Harding', 'Calvin Coolidge', 'Herbert Hoover', 'Franklin D. Roosevelt', 'Harry S. Truman', 'Dwight D. Eisenhower', 'John F. Kennedy', 'Lyndon B. Johnson', 'Richard M. Nixon', 'Gerald R. Ford', 'Jimmy Carter', 'Ronald Reagan', 'George H. W. Bush', 'Bill Clinton', 'George W. Bush', 'Barack Hussein Obama', 'Donald J. Trump', 'Joseph R. Biden']
  let presNumb = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth', 'thirtieth', 'thirty-first', 'thirty-second', 'thirty-third', 'thirty-fourth', 'thirty-fifth', 'thirty-sixth', 'thirty-seventh', 'thirty-eighth', 'thirty-ninth', 'fortieth', 'forty-first', 'forty-second', 'forty-third', 'forty-fourth', 'forty-fifth', 'forty-sixth']
  
  let myPres = msg.match[1]
  let presIndex 

  for (let i = 0; i < presNumb.length; i++) {
    if (myPres === presNumb[i]) { 
      presIndex = i  
    }
  }
  return msg.send(presidents[presIndex])
 
});
*/