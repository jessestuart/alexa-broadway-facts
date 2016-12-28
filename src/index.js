'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.8a9ee741-26eb-4928-8c08-9147dab20d4e';

var languageStrings = {
    "en-US": {
        "translation": {
            "FACTS": [
                "Broadway Theaters are mostly not on Broadway There are 40 Broadway theaters, but only 4 are actually on Broadway.",
                "Broadway theaters were mostly downtown in the 19th century. Not until the turn of the century did they begin to cluster around what became Times Square.",
                "A Broadway theater doesn’t have to be on Broadway, but it does have to seat at least 500 people.",
                "There is no row ‘I’ in most Broadway theaters. This is to avoid disappointing people who might have thought they were sitting in row 1.",
                "The longest running Broadway show in history is 'Phantom of the Opera', with over 12,000 performances and counting.",
                "The highest grossing Broadway show to date is 'The Lion King', grossing $1.32 billion to date.",
                "The first Tony Awards were held in 1947.",
                "The most highly-awarded musical ever was 'The Producers', which won 12 Tony awards.",
                "In 2013-2014, 70% of Broadway tickets were bought by tourists.",
                "Broadway audiences tend to skew female. In 2013-2014, 68% of Broadway theatergoers were female.",
                "No actor named Tony has ever won a Tony.",
                "The first Broadway theater, 'The Playhouse', was opened in the 1730s on Broadway in downtown Manhattan, between Beaver and Exchange Place.",
                "Attendance at Broadway shows has risen 13.3% between 2014 and 2016.",
                "Broadway was once commonly referred to as the 'Great White Way'.",
                "More than 13 million tickets were sold to Broadway productions in 2016; more than any year in history.",
                "The Booth Theatre was named in memory of one of America’s greatest 19th century classical and Shakespearean actors, Edwin Booth (brother of Abraham Lincoln assassin, John Wilkes Booth).",
                "Mae West’s 1926 play 'Sex', the story of a Montreal prostitute, ran for a year before New York's deputy police commissioner charged the theater company with lewdness and the corruption of youth. She spent 10 days in jail.",
                "The first nude Broadway musical was Hair, which opened in 1968 and ran 1750 performances.",
                "Audra McDonald has won six Tony Awards for performance, more than any other individual. She is the only person to have won Tony Awards in four different acting categories.",
                "Only one cast replacement has ever been nominated for a Tony Award in a competitive category. Larry Kert was nominated for Best Actor in a Musical for his performance in Company (1971). Dean Jones originated the role (and can be heard on the cast album) but left the production soon after the opening.",
                "Stephen Sondheim has received eight Tony Awards, more than any other composer."
            ],
            "SKILL_NAME" : "Broadway Theatre Facts",
            "GET_FACT_MESSAGE" : "Here's your fact: ",
            "HELP_MESSAGE" : "You can say tell me a Broadway fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
