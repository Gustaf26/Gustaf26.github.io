// Quiz Questions - Programming Languages
const possibleQuestions = [
    {
        question: "Which programming language is known as the 'mother of all languages' and was created by Dennis Ritchie in 1972?",
        options: ["Python", "C", "Java", "JavaScript"],
        correctAnswer: 1
    },
    {
        question: "What does 'HTML' stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correctAnswer: 0
    },
    {
        question: "Which language is primarily used for styling web pages?",
        options: ["JavaScript", "Python", "CSS", "Java"],
        correctAnswer: 2
    },
    {
        question: "Who created Python programming language?",
        options: ["James Gosling", "Guido van Rossum", "Bjarne Stroustrup", "Brendan Eich"],
        correctAnswer: 1
    },
    {
        question: "Which of these is NOT an object-oriented programming language?",
        options: ["Java", "C++", "Python", "C"],
        correctAnswer: 3
    },
    {
        question: "What is the file extension for JavaScript files?",
        options: [".java", ".js", ".javascript", ".script"],
        correctAnswer: 1
    },
    {
        question: "Which language is known for its use in data science and machine learning?",
        options: ["Ruby", "Swift", "Python", "PHP"],
        correctAnswer: 2
    },
    {
        question: "What was Java originally called during its development?",
        options: ["Oak", "Green", "C++ Plus", "FirstScript"],
        correctAnswer: 0
    },
    {
        question: "Which company developed the C# programming language?",
        options: ["Google", "Apple", "Microsoft", "Oracle"],
        correctAnswer: 2
    },
    {
        question: "What does 'JS' in JavaScript stand for?",
        options: ["Just Script", "Java Script", "Joint System", "JavaSource"],
        correctAnswer: 1
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = [];

// DOM Elements
let optionsContainer
let questionNumberDisplay;
let totalQuestionsDisplay;
let quizContent
let results
let finalScore
let finalTotal
let resultMessage

function initiateUI() {
    optionsContainer = document.getElementById('options-container');
    nextBtn = document.getElementById('next-btn');
    scoreDisplay = document.getElementById('score');
    questionNumberDisplay = document.getElementById('question-number');
    totalQuestionsDisplay = document.getElementById('total-questions');
    quizContent = document.getElementById('quiz-content');
    results = document.getElementById('results');
    finalScore = document.getElementById('final-score');
    finalTotal = document.getElementById('final-total');
    resultMessage = document.getElementById('result-message');
    restartBtn = document.getElementById('restart-btn');
}

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    initiateUI()

    // Empty results && show text
    document.getElementById('results').style.display = 'none'
    quizContent.style.display = 'block'

    // Shuffle questions for variety
    quizQuestions = possibleQuestions.slice(0, 4);

    totalQuestionsDisplay.textContent = quizQuestions.length;
    scoreDisplay.textContent = score;

    loadQuestion()
}


// Load Current Question
function loadQuestion() {

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionNumberDisplay.textContent = currentQuestionIndex + 1;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');


    questionText.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Create option buttons
    currentQuestion.options.forEach((option, index) => {
        optionsContainer.innerHTML += `<button onclick="selectAnswer(${index})" class="option-btn">${option}</button>`;
    });
}

// Handle Answer Selection
function selectAnswer(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    // Mark correct answer
    buttons[currentQuestion.correctAnswer].classList.add('correct');

    // Show feedback
    if (isCorrect) {
        score += 20; // 20 points per correct answer
        scoreDisplay.textContent = score;
        // feedback.classList.add('correct');
    } else {
        buttons[selectedIndex].classList.add('wrong');
        // feedback.classList.add('wrong');
        const correctOption = currentQuestion.options[currentQuestion.correctAnswer];
    }

    // feedback.classList.remove('hidden');

    // Update button text for last question
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.textContent = 'See Results';
    }
}

// Move to Next Question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Final Results
function showResults() {
    quizContent.style.display = 'none'
    results.style.display = 'block'

    finalScore.textContent = score;
    finalTotal.textContent = quizQuestions.length * 20;

    // Calculate percentage
    const percentage = (score / (quizQuestions.length * 20)) * 100;

    // Set result message based on performance
    if (percentage === 100) {
        resultMessage.textContent = "🏆 Perfect! You're a Programming Languages expert!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "🎉 Excellent work! You really know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "👍 Good job! Keep learning and you'll master it!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "📚 Not bad! A bit more practice wouldn't hurt!";
    } else {
        resultMessage.textContent = "💪 Keep studying! You'll improve with practice!";
    }
}

// Event Listeners
function restartUI() {
    quizContent.innerHTML = `
        <div id="options-container" class="options-container" >
        </div>
        <p id="feedback-message"></p>
        <button onclick="nextQuestion()" id="next-btn" class="btn btn-primary">Next Question</button>
        <div id="question-text"></div>`;
    initQuiz()
}


// Start the Quiz
initQuiz();
