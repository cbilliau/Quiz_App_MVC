const VIS = require('../data/viewElements');

class View {
    
    constructor(){
    }

    // METHOD: Display question & answer choices
    displayQuestionAndChoices(questionIndex, question, answers) {
        VIS.questionCurrentElement.text(questionIndex);
        VIS.questionElement.text(question);
        VIS.answersElement.empty();
        for (var i = 0; i < answers.length; i++) {
            var answer = answers[i];
            VIS.answersElement.append('<li><button type="button" class"button">' + answer + '</button></li>');
        }
    }

    // METHOD: Hide questions / show results
    displayFinalScore(score) {
        VIS.questionsPageElement.hide(); // Hide question
        VIS.resultsPageElement.show(); // Show anser
        VIS.scoreElement.text(score);
    }    

    displayQuestions() {
        VIS.questionsPageElement.show(); // Show question
        VIS.resultsPageElement.hide(); // Hide anser
    }

    setQuestionNumbers(totalQuestions){
        VIS.questionsTotalElement.text(totalQuestions);
    }

    setCurrentQuestionNumber(totalQuestions){
        VIS.questionCurrentElement.text(totalQuestions);
    }
}

module.exports = View;

