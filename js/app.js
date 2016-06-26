/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	// "use strict";

	// -------Model---------
	function Quiz(questions) {
	    this.questions = questions;
	    this.currentQuestion = null;
	    console.log('Quiz constructor - this.currentQuestion set to ' + this.currentQuestion);
	}
	// Get questions length for score board
	Quiz.prototype.questionsLength = function () {
	    var questions = QUESTIONS.length;
	    return questions;
	};

	/**
	 * METHOD: Move to next question
	 * increments current ques by 1
	 * returns integer for curr ques or false if end of quiz
	 */
	Quiz.prototype.moveToNextQuestion = function () {
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
	Quiz.prototype.getQuestion = function (questionIndex) {
	    return QUESTIONS[questionIndex].text;
	};
	/**
	 * METHOD: Create multi-choice answer
	 * creates array w/answer choices
	 * returns array
	 */

	Quiz.prototype.getAnswerChoices = function (questionIndex) {
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
	Quiz.prototype.checkUserAnswer = function (userAnswer) {
	    var question = this.questions[this.currentQuestion];
	    console.log('quiz.checkUserAnswer - this.currentQuestion = ' + this.currentQuestion);
	    return question.answers.indexOf(userAnswer) === question.correct;
	};

	// METHOD: Add 1 to score
	Quiz.prototype.keepScore = function () {
	    quizScore += 1;
	};

	// METHOD: Reset score
	Quiz.prototype.resetScore = function () {
	    quizScore = 0;
	};

	// -----------View----------
	function View() {};
	// METHOD: Display question & answer choices
	View.prototype.displayQuestionAndChoices = function (questionIndex, question, answers) {
	    questionCurrentElement.text(questionIndex);
	    questionElement.text(question);
	    answersElement.empty();
	    for (var i = 0; i < answers.length; i++) {
	        var answer = answers[i];
	        answersElement.append('<li><button type="button" class"button">' + answer + '</button></li>');
	    }
	};

	// METHOD: Hide questions / show results
	View.prototype.displayFinalScore = function () {
	    questionsPageElement.hide(); // Hide question
	    resultsPageElement.show(); // Show anser
	    scoreElement.text(quizScore);
	};

	View.prototype.displayQuestions = function () {
	    questionsPageElement.show(); // Show question
	    resultsPageElement.hide(); // Hide anser
	};

	View.prototype.setQuestionNumbers = function (totalQuestions) {
	    questionsTotalElement.text(totalQuestions);
	};
	View.prototype.setCurrentQuestionNumber = function (totalQuestions) {
	    questionCurrentElement.text(totalQuestions);
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
	Controller.prototype.playQuiz = function () {
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
	Controller.prototype.onUserSubmitAnswer = function (answer) {
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
	$(document).ready(function () {
	    var quiz = new Quiz(QUESTIONS);
	    var view = new View();
	    var controller = new Controller(quiz, view);

	    // Listen for answer choices
	    $(answersElement).on('click', 'li', function () {
	        var choice = $(this).text();
	        controller.onUserSubmitAnswer(choice);
	    });

	    // Reset game
	    $(restartButtonElement).on('click', function () {
	        var quiz = null,
	            view = null,
	            controller = null;
	        var quiz = new Quiz(QUESTIONS);
	        var view = new View();
	        var controller = new Controller(quiz, view);
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var QUESTIONS = [{
	    text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
	    answers: ['0815', '2B', 'BAM128', 'Barely'],
	    correct: 0
	}, {
	    text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
	    answers: ['0815', '2B', 'BAM128', 'Barely'],
	    correct: 1
	}, {
	    text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
	    answers: ['0815', '2B', 'BAM128', 'Barely'],
	    correct: 2
	}, {
	    text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
	    answers: ['0815', '2B', 'BAM128', 'Barely'],
	    correct: 3
	}];
	// View items
	var questionsPageElement = $('.questions-page');
	var questionCurrentElement = $('.question-current');
	var questionsTotalElement = $('.questions-total');
	var questionElement = $('.question');
	var answersElement = $('.answers');

	var resultsPageElement = $('.results-page');
	var scoreElement = $('.score');
	var restartButtonElement = $('.restart-button');

/***/ }
/******/ ]);