function Controller(model, view) {
    this.model = model;
    this.view = view;
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
        this.view.displayFinalScore(this.model.score);
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

Controller.prototype.init = function() {
    this.model.resetScore();
    this.model.currentQuestion = null;
    this.view.displayQuestions();
    this.playQuiz();
};

module.exports = Controller;