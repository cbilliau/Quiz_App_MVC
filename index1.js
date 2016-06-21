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



// -------Model---------
function Quiz(questions) {
  this.questions = questions;
  this.currentQuestion = null;
}
    /**
      * METHOD: Move to next question
      * increments current ques by 1
      * returns integer for curr ques or false if end of quiz
      */
    Quiz.prototype.moveToNextQuestion = function () {
      if (this.currentQuestion) {
        ++this.currentQuestion;

        if (this.currentQuestion >= this.questions.length) {
          // end of Quiz
          return false;
          } else {
            this.currentQuestion;
          }
        } else {
          this.currentQuestion = 0;
          return this.currentQuestion;
        }
      };
    Quiz.prototype.getQuestion = function (questionIndex) {
      return QUESTIONS[questionIndex].text;
    }
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
      return question.answers.indexOf(userAnswer) === question.correct;
    };
    // METHOD: Add 1 to score
    Quiz.prototype.keepScore = function () {
      quizScore += 1;
    };


// -----------View----------
function View(element) {
  this.element = $(element);
};
    // METHOD: Display question & answer choices
    View.prototype.displayQuestionAndChoices = function (questionIndex, question, answers) {
      questionCurrentElement.text(questionIndex);
      questionElement.text(question);
      answersElement.empty();
      for (var i=0; i<answers.length; i++) {
          var answer = answers[i];
          answersElement.append('<li><button type="button">' + answer + '</button></li>');
      }
    };
    // METHOD: Display score
    View.prototype.displayScore = function () {
      scoreElement.text(quizScore);
    };
    // METHOD: Listener
    View.prototype.retrieveAnswer = function () {
      answersElement.on('click', 'button', function() {
        var choice = $(this).parent().index();
        console.log(choice);
        return choice;
      });
    };

// ---------Controller----------
function Controller(model, view) {
  this.model = model;
  this.view = view;
  this.startQuiz();

};
    // Start quiz
    Controller.prototype.startQuiz = function () {
      var questionIndex = this.model.moveToNextQuestion();
      var question = this.model.getQuestion(questionIndex);
      var answerChoices = this.model.getAnswerChoices(questionIndex);
      this.view.displayQuestionAndChoices(questionIndex, question, answerChoices);
    };

    // Submit Answer
    Controller.prototype.onUserSubmitAnswer = function () {
      var answer = this.view.retrieveAnswer();
      var response = this.model.checkUserAnswer(answer);
      console.log(response);
      if (response) {
        this.model.keepScore();
        var nextQuestion = this.model.moveToNextQuestion();
        if (typeof nextQuestion === 'number') {
          this.view.displayQuestion(nextQuestion);
        } else {
          this.view.displayFinalScore();
        }
      }
    };

// Variables
var quizScore = 0;

$(document).ready(function()  {
  var quiz = new Quiz(QUESTIONS);
  var view = new View('button');
  var controller = new Controller(quiz, view);
});

// Process
  // Set game up - model moveToNextQuestion
  // Get question - model getquestion
  // Get answer choices - model getAnswerChoices
  // Display Question/answer - view displayQuestion
  // Submit answer (check ans, update score) - Controller
