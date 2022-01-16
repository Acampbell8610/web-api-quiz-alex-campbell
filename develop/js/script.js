
    
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText= document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var start = document.querySelector("#startQuiz");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is 2 + 2 ?',
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "17",
        answer: 2,
    },    {
        question: 'What color is blue ?',
        choice1: "2",
        choice2: "4",
        choice3: "red",
        choice4: "blue",
        answer: 4,
    },    {
        question: 'answer 5',
        choice1: "B",
        choice2: "purple",
        choice3: "five",
        choice4: "5",
        answer: 4,
    },    {
        question: 'last question',
        choice1: "y",
        choice2: "n",
        choice3: "ty",
        choice4: "boom",
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


startGame = () =>{
    questionCounter=0
    score=0
    availableQuestions=[...questions]
    getNewQuestion()
    countdown()
}
getNewQuestion= () =>{
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.alert("Great Job!")
    }

    const questionIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion= availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText=currentQuestion['choice'+ number]
    })
    availableQuestions.splice(questionIndex,1)

    acceptingAnswers = true
}
 choices.forEach(choice => {
     choice.addEventListener('click', e=>{
         if(!acceptingAnswers) return

         acceptingAnswers=false
         const selectedChoice = e.target;
         const selectedAnswer = selectedChoice.dataset['number']

         let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :'incorrect'
         
         if (classToApply=== 'correct'){
             incrementScore(SCORE_POINTS)
           
         }

         selectedChoice.parentElement.classList.add(classToApply)

         setTimeout(() =>{
             selectedChoice.parentElement.classList.remove(classToApply)
             getNewQuestion()
         },1000)
         })
 })

 incrementScore = num =>{
     score +=num
     scoreText.innerText = score;
 }

 var timerEl = document.getElementById("countdown");
var startButtonEl1 = document.getElementById ("start")

//time interval
function countdown(){
    var timeLeft = 60;

    var timeInterval = setInterval(function(){
        if (timeLeft >= 1){
            timerEl.textContent = timeLeft;
            timeLeft--;
        }else{
            timerEl.textContent = '';
            clearInterval(timeInterval)
            ;
        }
    },1000);
};

start.addEventListener("click", function () {
    startGame()})