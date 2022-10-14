//Array of objects that include questions,choices, and answers 
var questions = [
    {
    question: "What do Javascript file extensions end with?",
    answers: ["A.) .css","B.) .js","C.) .html","D.) .md"],
    answer:"B.) .js"
    },
    {
    question:"HTML is the framework of the web page while CSS styles it, what does Javascript provide?",
    answers: ["A: Advanced styling","B: Audio","C: Objects","D: Interactive Platform"],
    answer:"D: Interactive Platform"
    },
    {
    question:"Javascript uses what to denote an array?",
    answers: ["A.) Square Brackets","B.) Curly Brackets","C.) Parathesis","D.)Apostrophe Marks"],
    answer:"A.) Square Brackets"
    },
    {
    question:"In order to run a function in Javascript, what must be done?",
    answers:["A.) It will run on its own","B.) Put the function at the top of the page","C.) Call them by name to execute","D.) Functions don't run"],
    answer:"C.) Call them by name to execute"
    },
    {
    question:"Variables are containers that store __?",
    answers:["A.) Language", "B.) Text", "C.) Factors", "D.) Values"],
    answer:"D.) Values"  
    },
    {
    question:"Which of these has a value of true/false?",
    answers:["A.) Numbers", "B.) Boolean", "C.) String", "D.) Object"],
    answer:"B.) Boolean"
    }
]
//variables that allow functions to track where in the index certain outputs will be
var startButton = document.querySelector("#quiz-btn");
var quiz = document.querySelector("#quiz-question");
var choices = document.querySelector("#choices");
var confirmE = document.querySelector("#confirm");
var timeLeft = document.querySelector("#timer")
var resultsE = document.querySelector("#results");
var intialsE = document.querySelector("#endscreen");
var resultsBtn = document.querySelector("#results-btn");
var startOver = document.querySelector("#start-over")

var currentQuestionIndex = 0;
var results = 0;
var timeLeft = 40;

//when start is clicked, countdown and generateQuestion function is initiated
function startQuiz () {
    countDown();
    generateQuestion();
}
//Generates question and answers from variable questions
function generateQuestion(){
//Ends the generate function and calls the endscreen function, if all questions have been cycled through    
    if(currentQuestionIndex >= questions.length){
        endScreen ();
        } else {
            quiz.innerHTML="";
            choices.innerHTML="";
            var showQuestion = questions[currentQuestionIndex];
            var h1 = document.createElement("h1");
            h1.textContent = showQuestion.question;
            quiz.append(h1);
 //creates li element for answers to be displayed in 
            for(var i = 0; i < showQuestion.answers.length; i++){
                var liE = document.createElement("li");
                liE.textContent = showQuestion.answers[i];
                choices.append(liE);
             }
        }
}
//function that checks answers selected by user and returns correct/incorrect feedback
function checkAnswer(event){
 //creates h1 element after user selects answer, and informs user if they are correct/incorrect, also tallies correct answers   
    if(questions[currentQuestionIndex].answer == event.target.innerText){
        results++;
        confirmE.innerHTML="";
        var confirm = document.createElement("h1");
        confirm.textContent ="Correct";
        confirmE.append(confirm);
    } else {
        confirmE.innerHTML="";
        var confirm = document.createElement("h1");
        confirm.textContent ="Incorrect";
        confirmE.append(confirm);
        deduct();
        }
//Allows user to answer next question by cycling through index and generating next question 
      currentQuestionIndex++;
      generateQuestion ();
}
//Function that deducts time for incorrect answers
 function deduct(event){ 
            if(confirm.textContent ="Incorrect"){
            timeLeft -= 5;
            timer.textContent = timeLeft + " seconds remaining";
            timeLeft--;
            }
        }
//timer function for starting countdown and calls endscreen function when it hits 0
function countDown () {
    var timeInterval = setInterval(function () {
        if(timeLeft >= 0) {
         timer.textContent = timeLeft + " seconds remaining";
         timeLeft--;
        }
       if(timeLeft === 0 && (currentQuestionIndex >= questions.length)) {
            clearInterval(timeInterval);
            timer.setAttribute("style", "display:none");
          }else if (timeLeft === 0) {
                clearInterval(timeInterval);
                endScreen();
                timer.setAttribute("style", "display:none");
          }}, 1000)
    }
//Function for end form that allows users to submit their initials 
function endScreen () {
    quiz.innerHTML="";
    choices.innerHTML="";
    var end = document.createElement("h1");
    end.textContent="QUIZ IS OVER!";
    intialsE.append(end);
    end.setAttribute("style", "text-align: center; font-size: 5rem")
    var initials = document.createElement("input");
    initials.setAttribute("style","background-color: darkgoldenrod; color:darkred");
    intialsE.append(initials);
    var submit=document.createElement("button");
    submit.textContent="Submit Initials";
    intialsE.append(submit);
    submit.setAttribute("style", "background-color: darkgoldenrod; color: darkred");
    takeAgain();
}

//functions that allow user to save and view score
function saveScore (event){
    if(event.target.textContent == "Submit Initials"){
        var score = document.querySelector("input");
        score.textContent="";
        localStorage.setItem("High Scores", JSON.stringify(`Name: ${score.value}, Score: ${results}`));
        localStorage.getItem("High Scores", (`Name: ${score.value}, Score: ${results}`));
        viewScore();
    }

function viewScore () {
    var results = document.createElement("h1");
    results = localStorage.getItem("High Scores", (`Name: ${score}, Score: ${results}`));
    results.textContent=results;
    resultsE.append(results);
    }   
}
//allows user to see last score recorded, click again to get rid of score
var scoresView=true;
function viewHighScore (event) {
    if(scoresView){
        var highScores = document.createElement("h2");
        highScores = localStorage.getItem("High Scores");
        highScores.value=highScores;
        resultsBtn.append(highScores);
    } else {
        window.location.reload("Refresh");
        highScores = true;
    }
    scoresView=false;
}
          
       
function takeAgain (event){
        var take = document.createElement("button");
        take.textContent ="START OVER";
        startOver.append(take);
        take.setAttribute("style", "background-color: darkgoldenrod; color:darkred");
        if(event.target.click){
            window.location.reload("Refresh");
        }
}
//event listeners added for functions to conduct quiz app
startButton.addEventListener('click', startQuiz);
choices.addEventListener("click", checkAnswer);
intialsE.addEventListener("click", saveScore);
resultsBtn.addEventListener("click", viewHighScore);
startOver.addEventListener("click", takeAgain);