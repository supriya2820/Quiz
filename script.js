const questions = [
    {
        question : " Which is the largest animal in the World ?" ,
        answers : [
            { text: "Shark" , correct: false},
            { text: "Blue Whale" , correct: true},
            { text: "Elephant" , correct: false},
            { text: "Giraffe" , correct: false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
        ] 
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Leo Tolstoy", correct: false },
            { text: "Charles Dickens", correct: false },
            { text: "Jane Austen", correct: false },
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false },
        ]
    },
    {
        question: "What is the boiling point of water at sea level?",
        answers: [
            { text: "100°C", correct: true },
            { text: "90°C", correct: false },
            { text: "80°C", correct: false },
            { text: "120°C", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Australia", correct: true },
            { text: "Europe", correct: false },
            { text: "Antarctica", correct: false },
            { text: "South America", correct: false },
        ]
    },
    {
        question: "How many colors are there in a rainbow?",
        answers: [
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false },
            { text: "5", correct: false },
        ]
    },
    {
        question: "What do bees collect and use to make honey?",
        answers: [
            { text: "Pollen", correct: false },
            { text: "Nectar", correct: true },
            { text: "Water", correct: false },
            { text: "Leaves", correct: false },
        ]
    },
    {
        question: "Which organ pumps blood throughout the human body?",
        answers: [
            { text: "Lungs", correct: false },
            { text: "Brain", correct: false },
            { text: "Heart", correct: true },
            { text: "Liver", correct: false },
        ]
    },
    {
        question: "Which month has 28 days in a common year?",
        answers: [
            { text: "February", correct: true },
            { text: "April", correct: false },
            { text: "June", correct: false },
            { text: "November", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        

    });
}
function resetState(){
    nextButton.style.display ="none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    
}

function showScore(){
    resetState();  // Clears previous question buttons or UI

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";  // Changes the button text
    nextButton.style.display = "block";   // Makes the button visible
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();
