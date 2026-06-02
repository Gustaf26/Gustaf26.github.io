// Quiz Questions - Programming Languages
const quizQuestions = [
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
let shuffledQuestions = [];

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const feedbackMessage = document.getElementById('feedback-message');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const questionNumberDisplay = document.getElementById('question-number');
const totalQuestionsDisplay = document.getElementById('total-questions');
const quizContent = document.getElementById('quiz-content');
const results = document.getElementById('results');
const finalScore = document.getElementById('final-score');
const finalTotal = document.getElementById('final-total');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    // Shuffle questions for variety
    shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);

    // Limit to 5 questions
    shuffledQuestions = shuffledQuestions.slice(0, 5);

    totalQuestionsDisplay.textContent = shuffledQuestions.length;
    scoreDisplay.textContent = score;

    quizContent.classList.remove('hidden');
    results.classList.add('hidden');

    loadQuestion();
}

// Load Current Question
function loadQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    questionNumberDisplay.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Create option buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });

    // Hide feedback
    feedback.classList.add('hidden');
    feedback.classList.remove('correct', 'wrong');
}

// Handle Answer Selection
function selectAnswer(selectedIndex) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
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
        feedback.classList.add('correct');
        feedbackMessage.textContent = '✅ Correct! Great job! +20 points';
    } else {
        buttons[selectedIndex].classList.add('wrong');
        feedback.classList.add('wrong');
        const correctOption = currentQuestion.options[currentQuestion.correctAnswer];
        feedbackMessage.textContent = `❌ Wrong! The correct answer was: ${correctOption}`;
    }

    feedback.classList.remove('hidden');

    // Update button text for last question
    if (currentQuestionIndex === shuffledQuestions.length - 1) {
        nextBtn.textContent = 'See Results';
    }
}

// Move to Next Question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Final Results
function showResults() {
    quizContent.classList.add('hidden');
    results.classList.remove('hidden');

    finalScore.textContent = score;
    finalTotal.textContent = shuffledQuestions.length * 20;

    // Calculate percentage
    const percentage = (score / (shuffledQuestions.length * 20)) * 100;

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
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', initQuiz);

// Start the Quiz
initQuiz();
