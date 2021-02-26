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

    robot.hear(/Hi|Hello/i, (res) => {
        res.send('Hey there!! What is your name? (start with name: )')

        robot.respond(/name: (.*)/i, (res) => {
            let name = res.match[1];
            res.send(`Hello ${name}`)
        })
    });

    robot.respond(/Who are you/i, (res) => {
        res.emote('I am Mr-Bot ;)')
    });

    const lulz = ['lol', 'rofl', 'lmao']
    robot.respond(`/${lulz.join('|')}/i`, (res) => {
        res.send(res.random(lulz))
    });

    robot.respond(/Are you (.*)/i, (res) => {
        const inType = res.match[1]

        if (inType === 'robot') {
            res.reply('Yeah, This is Mr-Bot')
            return
        }
        res.reply(`No ,I am not ${inType} `)
    })

    const enterReplies = ['hi', 'how are you', 'how old are you']
    const leaveReplies = ['hi there', 'I am good', 'I am 200 years old']
    robot.respond(/mr-bot (.*)/i, (res) => {
        const inType1 = res.match[1]

        if (enterReplies.includes(inType1)) {
            //res.reply('Yea,works')
            let enterRepliesIndex = enterReplies.indexOf(inType1)
            res.reply(leaveReplies[enterRepliesIndex])
            return
        }

        res.reply(`${inType1} , This word is not in my memory`)
    })


    robot.respond(/usd (.*)/i, (res) => {
        const usd = res.match[1]
        const inr = 70.0
        let final = usd * inr
        res.reply(`USD To INR => ${final} INR`)
        return
    })

    let mars_pics = ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia3.s-nbcnews.com%2Fj%2Fnewscms%2F2021_07%2F3446621%2F210201-nasa-perseverance-rover-ew-1217p_1f7e73e59a9eebba18c3f3c6992aea4e.fit-760w.jpg&imgrefurl=https%3A%2F%2Fwww.nbcnews.com%2Fthink%2Fopinion%2Fnasa-mars-rover-landing-seeks-new-alien-life-here-s-ncna1258212&tbnid=0mK-iXJRL3EwyM&vet=12ahUKEwivmpy8loTvAhUBMN8KHehEBlUQMygDegUIARDXAQ..i&docid=VdfGrgXHyddeaM&w=760&h=428&itg=1&q=images%20from%20mars&ved=2ahUKEwivmpy8loTvAhUBMN8KHehEBlUQMygDegUIARDXAQ",
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.scientificamerican.com%2Fsciam%2Fcache%2Ffile%2FB057439A-3F27-48F0-8EA54AF511520AAB_source.jpg&imgrefurl=https%3A%2F%2Fwww.scientificamerican.com%2Farticle%2Fmars-needs-money-white-house-budget-could-prompt-retreat-from-red-planet%2F&tbnid=jPY5pks1MqXNwM&vet=12ahUKEwivmpy8loTvAhUBMN8KHehEBlUQMygIegUIARDjAQ..i&docid=XYprse9B7BY0bM&w=1920&h=1080&q=images%20from%20mars&ved=2ahUKEwivmpy8loTvAhUBMN8KHehEBlUQMygIegUIARDjAQ",
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F4%2F46%2FCuriosity_at_Work_on_Mars_%2528Artist%2527s_Concept%2529.jpg%2F1200px-Curiosity_at_Work_on_Mars_%2528Artist%2527s_Concept%2529.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMars_rover&tbnid=x5WFnpPTHZXNTM&vet=12ahUKEwivmpy8loTvAhUBMN8KHehEBlUQMygRegUIARD5AQ..i&docid=wNbMj9Pub-OxVM&w=1200&h=710&q=images%20from%20mars&ved=2ahUKEwivmpy8loTvAhUBMN8KHehEBlUQMygRegUIARD5AQ"];

    robot.hear(/mars/i, function (res) {
        res.send(res.random(mars_pics))
        return
    })

    robot.respond(/What day is today?/i, (res) => {

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
        res.reply(`Today is ${n}`)
    })


    let annoyIntervalId = null

    robot.respond(/annoy me/, (res) => {
        if (annoyIntervalId) {
            res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH')
            return
        }

        res.send('Hey, want to hear the most annoying sound in the world?')
        annoyIntervalId = setInterval(() => res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH'), 1000)
    })

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