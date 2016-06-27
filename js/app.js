"use strict";

const $ = require('jquery');
const VIS = require("./data/viewElements");
const QUESTIONS = require('./data/questions');

const Quiz = require('./modules/quiz');
const Controller = require('./modules/controller');
const View = require('./modules/view');

const quiz = new Quiz(QUESTIONS);
const view = new View();
const controller = new Controller(quiz, view);

// ready
$(document).ready(function() {

    controller.init();

    // Listen for answer choices
    $(VIS.answersElement).on('click', 'li', () => {
        let choice = $(this).text();
        controller.onUserSubmitAnswer(choice);
    });

    // Reset game
    $(VIS.restartButtonElement).on('click', () => controller.init() );
});


