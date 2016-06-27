function Quiz(questions) {
    this.questions = questions;
    this.currentQuestion = null;
    this.score = 0;
    console.log('Quiz constructor - this.currentQuestion set to ' + this.currentQuestion);
}

// Get questions length for score board
Quiz.prototype.questionsLength = function() {
    var questions = (this.questions.length);
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
        return this.questions[questionIndex].text;
    }
    /**
     * METHOD: Create multi-choice answer
     * creates array w/answer choices
     * returns array
     */

Quiz.prototype.getAnswerChoices = function(questionIndex) {
    var answerChoices = [];
    var question = this.questions[questionIndex].answers;
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
    this.score += 1;
};

// METHOD: Reset score
Quiz.prototype.resetScore = function() {
    this.score = 0;
};

module.exports = Quiz;
