"use strict";

const QUESTIONS = require("./questions.js");
console.log(QUESTIONS);

const VIS = require("./viewElements.js");
console.log(VIS);

// -------Model---------
function Quiz(questions) {
    this.questions = questions;
    this.currentQuestion = null;
    console.log('Quiz constructor - this.currentQuestion set to ' + this.currentQuestion);
}
// Get questions length for score board
Quiz.prototype.questionsLength = function() {
    var questions = (QUESTIONS.length);
    return questions;
};

/**
 * METHOD: Move to next question
 * increments current ques by 1
 * returns integer for curr ques or false if end of quiz
 */
Quiz.prototype.moveToNextQuestion = function() {
    if (typeof this.currentQuestion === 'number') {
        ++this.currentQuestion;

        if (this.currentQuestion >= this.questions.length) {
            // end of Quiz
            return false;
        } else {
            return this.currentQuestion;
        }
    } else {
        this.currentQuestion = 0;
        return this.currentQuestion;
    }
};

// Pulls the question from QUESTIONS
Quiz.prototype.getQuestion = function(questionIndex) {
        return QUESTIONS[questionIndex].text;
    }
    /**
     * METHOD: Create multi-choice answer
     * creates array w/answer choices
     * returns array
     */

Quiz.prototype.getAnswerChoices = function(questionIndex) {
    var answerChoices = [];
    var question = QUESTIONS[questionIndex].answers;
    for (var i = 0; i < question.length; i++) {
        answerChoices.push(question[i]);
    };
    return answerChoices;
};

/** METHOD: Check answer
 * Accept user's answer choice
 * returns ture or false
 */
Quiz.prototype.checkUserAnswer = function(userAnswer) {
    var question = this.questions[this.currentQuestion];
    console.log('quiz.checkUserAnswer - this.currentQuestion = ' + this.currentQuestion);
    return question.answers.indexOf(userAnswer) === question.correct;
};

// METHOD: Add 1 to score
Quiz.prototype.keepScore = function() {
    quizScore += 1;
};

// METHOD: Reset score
Quiz.prototype.resetScore = function() {
    quizScore = 0;
};

// -----------View----------
function View() {};
// METHOD: Display question & answer choices
View.prototype.displayQuestionAndChoices = function(questionIndex, question, answers) {
    VIS.questionCurrentElement.text(questionIndex);
    VIS.questionElement.text(question);
    VIS.answersElement.empty();
    for (var i = 0; i < answers.length; i++) {
        var answer = answers[i];
        VIS.answersElement.append('<li><button type="button" class"button">' + answer + '</button></li>');
    }
};

// METHOD: Hide questions / show results
View.prototype.displayFinalScore = function() {
    VIS.questionsPageElement.hide(); // Hide question
    VIS.resultsPageElement.show(); // Show anser
    VIS.scoreElement.text(quizScore);
};

View.prototype.displayQuestions = function() {
    VIS.questionsPageElement.show(); // Show question
    VIS.resultsPageElement.hide(); // Hide anser
};

View.prototype.setQuestionNumbers = function(totalQuestions) {
    VIS.questionsTotalElement.text(totalQuestions);
}
View.prototype.setCurrentQuestionNumber = function(totalQuestions) {
    VIS.questionCurrentElement.text(totalQuestions);
};

// ---------Controller----------
function Controller(model, view) {
    this.model = model;
    this.model.resetScore();
    this.view = view;
    this.view.displayQuestions();
    this.playQuiz();
};
// Play quiz
Controller.prototype.playQuiz = function() {
    var numberOfQuestions = this.model.questionsLength();
    // display question number total
    this.view.setQuestionNumbers(numberOfQuestions);
    // Get index of next question
    var questionIndex = this.model.moveToNextQuestion();
    // display current question number
    this.view.setCurrentQuestionNumber(questionIndex);
    // If index is a number
    if (typeof questionIndex === 'number') {
        // Get question, answer choices, and send to view
        var question = this.model.getQuestion(questionIndex);
        var answerChoices = this.model.getAnswerChoices(questionIndex);
        this.view.displayQuestionAndChoices(questionIndex, question, answerChoices);
    } else {
        // end game
        this.view.displayFinalScore();
    }
};

// Submit Answer
Controller.prototype.onUserSubmitAnswer = function(answer) {
    // Determine if answer is true (corr) or flase (wrong)
    var response = this.model.checkUserAnswer(answer);
    if (response) {
        // If true, score and got to next question
        this.model.keepScore();
        // this.view.displayScore();
        this.playQuiz();
    } else {
        this.playQuiz();
    }
};

// Variables
var quizScore = 0;

// ready
$(document).ready(function() {
    var quiz = new Quiz(QUESTIONS);
    var view = new View();
    var controller = new Controller(quiz, view);

    // Listen for answer choices
    $(VIS.answersElement).on('click', 'li', function() {
        var choice = $(this).text();
        controller.onUserSubmitAnswer(choice);
    });

    // Reset game
    $(VIS.restartButtonElement).on('click', function() {
        var quiz = null,
            view = null,
            controller = null;
        var quiz = new Quiz(QUESTIONS);
        var view = new View();
        var controller = new Controller(quiz, view);
    });
});
