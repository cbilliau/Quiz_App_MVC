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

// Model

var quizScore = 0;

function Quiz(questions) {
  this.questions = quesitons;
  this.currentQuestion = null;
}
    /**
      * METHOD: Move to next question
      * increments current ques by 1
      * returns integer fir curr ques or false if end of quiz
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

    Quiz.prototype.setMultipleChoice = function () {
      var answerChoices = [];
      var question = this.questions(this.currentQuestion)
      for (var i = 0; i < question.length; i++) {
        answerChoices.push(question[i]);
      };
      return answerChoices;
    };

    Quiz.prototype.checkUserAnswer = function (userAnswer) {
      var question = this.questions[this.currentQuestion];
      return question.answers.indexOf(userAnswer) === question.correct;
    };

    Quiz.prototype.keepScore = function () {
      quizScore += 1;
    };
