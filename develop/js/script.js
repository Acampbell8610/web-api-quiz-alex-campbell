
    
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText= document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var start = document.querySelector("#startQuiz");
var highScoreBtn= document.querySelector("#highScoreBtn")
var newTime = 60;
let reSet = false;
let currentQuestion = {};
let acceptingAnswers = true;
let score = '';
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question: 'What does the "C" in CSS stand for ?',
        choice1: "Corrupted",
        choice2: "Cascading",
        choice3: "Capital",
        choice4: "Covid",
        answer: 2,
    },    {
        question: 'What sybols would you use for comments in JS ?',
        choice1: "/*",
        choice2: "()",
        choice3: "<!--",
        choice4: "//",
        answer: 4,
    },    {
        question: 'What symbol represents ID in CSS?',
        choice1: ".",
        choice2: "=",
        choice3: "*",
        choice4: "#",
        answer: 4,
    },    {
        question: 'Where do you put the link for Javascript in your HTML?',
        choice1: "Bottom of Body",
        choice2: "Top of Body",
        choice3: "Footer",
        choice4: "Head",
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

// start game

startGame = () =>{
    questionCounter=0
    score=0
    availableQuestions=[...questions]
    getNewQuestion()
    countdown(60)
}
getNewQuestion= () =>{
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    
        
        var name= prompt("Please enter your name", "name");
        var scoreName= name 
        var combo = scoreName.concat(" ", score)
        localStorage.setItem('mostRecentScore', combo)
        //timerEl.textContent = 0
        reSet = true
         window.alert("Great Job! " + name +''+ score)
        var restartQ= window.confirm("Would you like to play again?");
        if(restartQ){
           return reload()
           ;
        }else{
            alert("Thank you for playing");
        }

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
         if(!acceptingAnswers)return

         acceptingAnswers=false
         const selectedChoice = e.target;
         const selectedAnswer = selectedChoice.dataset['number']

         let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :'incorrect'
         
         if (classToApply=== 'correct'){
             incrementScore(SCORE_POINTS)
           
         }
         if (classToApply=== 'incorrect'){
            //subtract 10 from time
            var currenttime = timerEl.textContent
            var minusten = 10
            newTime = timerEl.textContent = currenttime - minusten
           // clearInterval(timeInterval)
           // countdown(newTime)
          
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
function countdown(timeB){
    var timeLeft = timeB;

    var timeInterval = setInterval(function(){
        if (timeLeft >= 1 || questionCounter > MAX_QUESTIONS ){
            //timeLeft = newTime
            timerEl.textContent = timeLeft;
            timeLeft--;
           if(newTime < timeLeft){
               timeLeft = newTime
               timerEl.textContent = timeLeft;
           }
           if(reSet){
                timerEl.textContent = '';
                clearInterval(timeInterval)
                
           }
        }
        else{
            timerEl.textContent = '';
            clearInterval(timeInterval)
            window.alert("Game Over")
        }
        
    },1000);
};

    


start.addEventListener("click", function () {
    startGame()})
 highScoreBtn.addEventListener("click",function(){
   alert( localStorage.getItem('mostRecentScore'))
     
 })   


    