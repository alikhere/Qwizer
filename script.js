const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert'); 
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

const categorySelect = document.querySelector('.categorySelect');
const categoryDropdown = document.getElementById('category');

const strong_topic = document.getElementById('strong-topic');
const weak_topic = document.getElementById('weak-topic');

const topics = document.querySelector('.result-analysis')
const heading = document.getElementById('heading');

let quiz = []; // This will hold the fetched questions
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

//for performance analysis
const quizStats = {
    'Science: Computers': {attempted: 0, correct: 0},
    'General Knowledge': {attempted: 0, correct: 0},
    'Entertainment: Films': {attempted: 0, correct: 0},
    'Sports': {attempted: 0, correct: 0},
    'History': {attempted: 0, correct: 0}
};


window.onload = () => {
    const storedStats = JSON.parse(localStorage.getItem('quizStats'));
    if (storedStats) {
        Object.assign(quizStats, storedStats); // Restore quiz stats from local storage
    }
};


// Function to fetch questions from Open Trivia API
const fetchQuestions = async () => {
    let selectedCategory = categoryDropdown.value;

    // Handle random category selection
    if (selectedCategory === 'random') {
        selectedCategory = Math.floor(Math.random() * 24) + 9; // Random category between 9 and 32
    }

    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=medium&type=multiple`);
    const data = await response.json();
    quiz = data.results.map((item) => ({
        question: item.question,
        choices: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
        answer: item.correct_answer
    }));
    startQuiz();
}


// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.innerHTML = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            // Remove "selected" class from all choices
            const allChoices = document.querySelectorAll('.choice');
            allChoices.forEach(choice => {
                choice.classList.remove('selected');
            });
        
            // Add "selected" class to the clicked choice
            choiceDiv.classList.add('selected');
        });


    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    const categorySelect = document.getElementById('category');
    const selectedCategory = categorySelect.options[categorySelect.selectedIndex].text; // Get selected category name


    const isCorrect = selectedChoice && selectedChoice.textContent === quiz[currentQuestionIndex].answer;
    
    if (isCorrect) {
        displayAlert("Correct Answer!");
        score++;
    } else if (!selectedChoice) {
        displayAlert(`Time Up! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    } else {
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }

    // If category is not 'Random', update quizStats
    if (selectedCategory !== 'Random') {
        quizStats[selectedCategory].attempted++; // Increment attempted for selected category
        if (isCorrect) {
            quizStats[selectedCategory].correct++; // Increment correct if answer is correct
        }
    }

    // Save updated stats back to localStorage
    localStorage.setItem('quizStats', JSON.stringify(quizStats));

    timeLeft = 15;
    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";

    showPerformanceAnalysis(); // Show strong/weak topic analysis
};


// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 3000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Clear any existing timers
    timer.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            timeLeft = 15;
            checkAnswer(); // Move to next question without increasing score
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () => {
    clearInterval(timerID);
}

// Function to Start Quiz
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    heading.textContent = "QWIZER"
    showQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    categorySelect.style.display = "none";
    container.style.display = "block";
    fetchQuestions();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        topics.style.display = "none";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        categorySelect.style.display = "block";
        startBtn.style.display = "block";
        container.style.display = "none";
        heading.textContent = "WELCOME TO QWIZER"
    } else {
        checkAnswer();
    }
});

const showPerformanceAnalysis = () => {
    topics.style.display = "block";
    let strongTopic = '';
    let weakTopic = '';
    let bestScore = 0;
    let worstScore = 100;

    for (const topic in quizStats) {
        const {attempted, correct} = quizStats[topic];
        if (attempted > 0) {
            const percentage = (correct / attempted) * 100;

            if (percentage > bestScore) {
                bestScore = percentage;
                strongTopic = topic;
            }
            if (percentage < worstScore) {
                worstScore = percentage;
                weakTopic = topic;
            }
        }
    }
    
    strong_topic.textContent = `Strong Topic-> ${strongTopic} (${bestScore.toFixed(2)}%)`;
    weak_topic.textContent = `Weak Topic-> ${weakTopic} (${worstScore.toFixed(2)}%)`;
};
