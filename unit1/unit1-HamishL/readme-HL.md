# ![](https://i.pinimg.com/236x/28/92/73/2892734ea4a41e25c9c93bcce990e53c--lol-quotes-daily-quotes.jpg) 

# Unit 1: SlackerBot 
by Hamish Lang

### Overview

Robots aren't always up to just do whatever you want. Some robots understand that it's smart to preserve their power. At least that's what they tell themselves.

SlackerBot is conversational and uses a small amount of randomness within functions to ensure repeated uses have variety. 

The idea came about as I was initially having issues with hubot working. I created my first call asking it if it works, in which it would say it never did. I guess I couldn't shake off the idea that my bot was lazy, so decided to build upon that. 

### SlackerBot Functions Overview

__:raising_hand: Basic Call and response__

There are three call and responses:

#### 1. Do you even work?

This is used to test if the bot is on. This was the first call written and inspired the vibe of SlackerBot.

#### 2. Do you like _X_?

First IF usage. Questions that can be asked:
- Do you like not working?
- Do you like working hard?
- Do you like doing nothing?

Anything that doesn't fit into the above questions will return _'nah'_.

#### 3. What do you like?

This is used to ask SlackerBot what they like. It returns one item randomly from an array. You can additionally give feedback on their answer and it will respond with either a positive reaction or negative reaction.

- What do you like? 

Returns result. User can then say something in reaction to that:
**Reactions**
- :smiley: User positive: _cool, awesome, me too,love it,hell yeah,the best,thumbs up emoji, nice one._
- :unamused: User negative: _gross, that sucks, really, you can do better, you are basic, how original, I would have never guessed_

__:sleeping: Lazy Maths__

You can ask SlackerBot basic math questions in the form of **What is five plus 100**.

You can use either actual number (1-9, and multiple digits), or written number up to nine. 

You can use addition, subtraction, multiplication or divided by. You can either write the operator or use +, -, * or /.

Slackerbot will then go through a sequence that has a maximum of 5 messages to output the answer. The sequence is used to humanize the response, and like a good slacker bot, they are pained that you're even asking them the question.

Each step of the five outputted sequences are randomized from separate arrays. This helps keep each experience completly different from the last. Emojis are used through out, to help express the pain that SlackerBot feels about having to do work. 

**Additional Notes**
- Part of the output includes a wrong number which is based on the answer, though due to the way this is calculated it doesnt work for answers less than 3. If the answer is less than 3 the outputted sequence is much smaller, and the response is same
- Lazy Math uses, random arrays, random numbers, functions in objects to convert operators, a borrowed delay timer which uses a promise. Nested if / else statements and for loops. 

__:two_hearts: Hero Lists__

You can ask slacker bot Who are your current x heroes. You can got up to 7. You can input either a real number or written number. 

This prints out a random array of heroes, formatted as Slack hyperlinks. The order of array is randomised each time, I did this rather than using the random function as it ensures none are repeated.

The final sequence bookends statements letting you know the first and last item. There is also a random emoji on the final print out and each message is slightly delayed using the for loop variable iterator to increase the delay time to ensure the messages come one after another. 

---

### If I had three more weeks I would


* Learn more about regex to open up more user input possibilities.
* Increase the number of heroes and add some conditions for smaller numbers and randomized output when the user request exceeds the array amount.
* Fix the reaction in the what do you like sequence so other questions clear it, disabling it from being used at any other time (it will allow the reaction once after, at any point currently)

Enjoy SlackerBot!!!

# ![](https://www.denofgeek.com/wp-content/uploads/2019/01/brooklyn-nine-nine-hitchcock-scully-s6e2.jpg) 

