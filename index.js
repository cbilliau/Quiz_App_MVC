var QUESTIONS = [
    {
        text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 0
    },
    {
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 1
    },
    {
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 2
    },
    {
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 3
    }
];
// View items
var questionsPageElement = $('.questions-page');
var questionCurrentElement = $('.question-current');
var questionsTotalElement = $('.questions-total');
var questionElement = $('.question');
var answersElement = $('.answers');

var resultsPageElement = $('.results-page');
var scoreElement = $('.score');
var restartButtonElement = $('.restart-button');

// View
var showResults = function() {
    questionsPageElement.hide(); // Hide question
    resultsPageElement.show(); // Show anser
};
// View
var showQuestions = function() {
    resultsPageElement.hide(); // Hide answer
    questionsPageElement.show(); // Show question
};
// View
var resetScore = function() {
    scoreElement.text(0); // Set score to 0
};
// View / Model
var increaseScore = function() {
    var score = parseInt(scoreElement.text(), 10); // update var to current score
    scoreElement.text(score + 1); // Post current score value
};
// View / Model
var setQuestion = function(questionIndex) {
    var question = QUESTIONS[questionIndex]; // Get question
    questionCurrentElement.text(questionIndex); // Display question number
    questionElement.text(question.text); // Display question
    answersElement.empty(); // Empty answer area
    for (var i=0; i<question.answers.length; i++) { // Display answer choices
        var answer = question.answers[i];
        answersElement.append('<li><button type="button">' + answer + '</button></li>');
    }
};
// Listen for answer choices
answersElement.on('click', 'button', function() {
    // View item
    var choice = $(this).parent().index(); // Set var to answer chosen
    // View item
    var questionIndex = parseInt(questionCurrentElement.text(), 10); // Set questionIndex to the diplayed question number
    // Model item
    var question = QUESTIONS[questionIndex]; // Assign a question to var
    // Model item
    if (question.correct === choice) {
        increaseScore(); // If choice is correct, increase score
    }

    if (questionIndex + 1 < QUESTIONS.length) {
        setQuestion(questionIndex + 1); // Call method to display next question
    }
    else {
        showResults(); // show results end game
    }
});

// View
restartButtonElement.click(function() {
    setQuestion(0);
    resetScore();
    showQuestions();
});


$(document).ready(function() {
    questionsTotalElement.text(QUESTIONS.length); // View item
    setQuestion(0); // Kicks off quiz by setting up first question
});
