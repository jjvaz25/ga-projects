# Meet Clintbot

Have you ever wanted company on Slack, but don't want to talk to a real person? Meet Clintbot: the (only slightly annoying) bot that can keep you entertained with a variety of responses to your messages!

---

## Purpose

Clintbot is designed to offer a morsel of joy whenever you need it. Let him generate a random animal species for your amusement or play you in a game of rock, paper, scissors. Be warned-- Clintbot thinks himself a comedian and will mock you whenever given the opportunity. We're trying to patch this out.

---

## Functionality

Clintbot recognizes the following commands:

1.  ### **"random animal"**

    Upon hearing a request for a random animal, Clintbot will introduce a completely fictitious creature beyond your wildest imagination. Each animal species is made up of a randomized place of origin, descriptor, and species.

    Clintbot accepts the following optional parameters to control each part of the animal species should you desire:

    `!l:location`  
    `!d:descriptor`  
    `!a:animal`

    #### Examples

        USER> hubot2 random animal
        HUBOT2> It's a bird! It's a plane! It's a Korean Shrieking Turtle!

        USER> hubot2 random animal !l:canadian
        HUBOT2> It's a bird! It's a plane! It's a Canadian Shrieking Turtle!

2.  ### **Any form of the word "mock"**

    Clintbot is well-intended, but kind of annoying. If you even mention the word "mock" or any form of the word while talking to him, Clintbot will mock you incessantly. Rumor has it he loves mocking birds, though. So perhaps try asking him about it?

    #### Example:

        USER> hubot2 are you mocking me?
        HUBOT2> ArE You MOCkiNG Me?

3.  ### **"rockpaperscissors (choice)"**

    Rock, paper, scissors is Clintbot's game of choice. Who doesn't love a game of chance? Decide on your play then 3, 2, 1, throw your choice out there! Clintbot will be sure to tell you who won.

    #### Example:

        USER> hubot2 rockpaperscissors rock
        HUBOT2> You picked rock and I picked paper. I win!

4.  ### **Alliteration**

    Ever observant, Clintbot will point out any time you use alliteration involving 3 or more words in a row. So go ahead and say some super special sentences you little poet, you.

    #### Example:

        USER> hubot2 peter piper picked a peck of pickled peppers
        HUBOT2> Look at that alliteration! Dr. Seuss over here!

---

## Design Process

When developing Clintbot, I wanted to create something simple, but varied. Interacting with Clintbot should feel like a combination of expected call-and-response and randomness.

I first created the mock command as a way to give the bot some character. After that, I decided to introduce some humor. The fake animal generator is based off a theory a friend of mine has that in order to create a realistic sounding animal species, you just need a location, an action, and a species.

After these two, I wanted to add something that gave the user a chance to give some input, rather than just watch Clintbot spout nonsense. Rock, paper, scissors is a game that is simple enough for a beginner (me) to code, but allows the user to make a choice that ultimately affects the outcome. Continuing on this theme I decided to return to the animal generator and allow the user to control each of the three species components should they wish to restrict the randomness to some degree.

Finally, I wanted to implement a response option that did not have a specific input, but rather could be unexpectedly triggered for a fun surprise. After researching regular expressions, I came up with a pattern that detects alliteration in the user's sentences. Clintbot randomly chiming in to inform the user of their worldplay is a small thing, but gives the bot some unique character and functionality.

---

## Installation Instructions

N/A

---

## Unsolved Problems

While Clintbot runs his commands without error, there are some limitations that can be improved in the future.

For the "random animal" command, while Clintbot recognizes the parameters as optional, they must appear in a specific order if they're given. For example, `random animal !l:canadian !a:dog` will work as expected, but `random animal !a:dog !l:canadian` will not because it does not understand `!l` when it appears after `!a`.

The "mock" command is intentionally simple, and therefore I do not believe it needs to be expanded upon. However, it currently displays the same image alongside the message every time. Perhaps a random assortment of images could be used to add some variety to Clintbot's responses. Even better, if a meme creator api exists, then adding the user's text on top of a random image and returning it as a constructed meme could be a more polished version of this function.

Finally, Clintbot can only do 4 distinct operations. Adding more functionality to this bot will ~~help it achieve world domination~~ enhance the user experience.
