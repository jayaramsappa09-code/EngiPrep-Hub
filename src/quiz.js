/**
 * Interactive Quiz Module for EngHub R23
 */

const questions = {
    c: [
        {
            q: "Who is the father of C language?",
            options: ["Steve Jobs", "James Gosling", "Dennis Ritchie", "Rasmus Lerdorf"],
            correct: 2,
            desc: "Dennis Ritchie developed C at Bell Labs in 1972."
        },
        {
            q: "Which of the following is an invalid identifier in C?",
            options: ["my_variable", "$money", "count123", "_system"],
            correct: 1,
            desc: "Identifiers in C cannot start with special characters like $."
        },
        {
            q: "What is the return type of fopen() function?",
            options: ["char", "int", "FILE pointer", "void"],
            correct: 2,
            desc: "fopen() returns a pointer to a FILE object."
        },
        {
            q: "Which keyword is used to skip the rest of the loop and start the next iteration?",
            options: ["break", "return", "pass", "continue"],
            correct: 3,
            desc: "The continue statement skips the current iteration."
        },
        {
            q: "What is the size of an 'int' data type in C (usually)?",
            options: ["1 Byte", "2 or 4 Bytes", "8 Bytes", "Depends on OS only"],
            correct: 1,
            desc: "Typically 2 bytes on 16-bit systems and 4 bytes on 32/64-bit systems."
        }
    ],
    ds: [
        {
            q: "Which data structure works on the LIFO principle?",
            options: ["Queue", "Stack", "Linked List", "Tree"],
            correct: 1,
            desc: "Stack stands for Last-In-First-Out."
        },
        {
            q: "Complexity of searching in a balanced Binary Search Tree is:",
            options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
            correct: 2,
            desc: "A balanced BST allows for logarithmic search time."
        },
        {
            q: "A queue which allows insertion/deletion at both ends is called:",
            options: ["Circular Queue", "Priority Queue", "Deque", "Linear Queue"],
            correct: 2,
            desc: "Deque stands for Double Ended Queue."
        },
        {
            q: "Which of the following uses more memory to store elements?",
            options: ["Array", "Linked List", "They are same", "Depends on compiler"],
            correct: 1,
            desc: "Linked lists need extra memory for storing pointers/nodes."
        },
        {
            q: "Which tree traversal visited root last?",
            options: ["Pre-order", "In-order", "Post-order", "Level-order"],
            correct: 2,
            desc: "In Post-order traversal, root is visited after children."
        }
    ],
    maths: [
        {
            q: "What is the rank of an Identity Matrix of order 3?",
            options: ["1", "2", "3", "0"],
            correct: 2,
            desc: "Rank of an In matrix is always n."
        },
        {
            q: "Cayley-Hamilton theorem is used to find:",
            options: ["Rank", "Inverse", "Determinant", "Trace"],
            correct: 1,
            desc: "It is widely used to find the inverse of a matrix."
        }
    ],
    physics: [
        {
            q: "In Newton's Rings, the central spot is usually:",
            options: ["Bright", "Dark", "Colored", "Invisible"],
            correct: 1,
            desc: "Due to zero air film thickness and phase change at the glass surface."
        },
        {
            q: "Superconductors show perfect:",
            options: ["Paramagnetism", "Diamagnetism", "Ferromagnetism", "Resistance"],
            correct: 1,
            desc: "Meissner effect makes them perfect diamagnets."
        }
    ],
    chemistry: [
        {
            q: "What does ψ² represent in quantum mechanics?",
            options: ["Wave amplitude", "Probability density", "Electron velocity", "Energy levels"],
            correct: 1,
            desc: "ψ² represents the probability of finding an electron in a given region."
        },
        {
            q: "The bond order of O₂ molecule is:",
            options: ["1", "2", "3", "2.5"],
            correct: 1,
            desc: "Bond order of O₂ is 2, with a double bond."
        },
        {
            q: "C₆₀ (Buckminsterfullerene) consists of how many hexagons and pentagons?",
            options: ["Single-layer hexagonal lattice only", "12 hexagons and 20 pentagons", "20 hexagons and 12 pentagons", "60 hexagons only"],
            correct: 2,
            desc: "C₆₀ has 20 hexagons and 12 pentagons causing its soccer ball shape."
        }
    ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

window.startQuiz = (topic) => {
    currentQuiz = questions[topic];
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-active').classList.remove('hidden');
    
    const topicNames = {
        c: 'C Programming',
        ds: 'Data Structures',
        maths: 'Engineering Maths I',
        physics: 'Engineering Physics',
        chemistry: 'Engineering Chemistry'
    };
    document.getElementById('quiz-topic').innerText = topicNames[topic];
    
    showQuestion();
};

window.startAIQuiz = async () => {
    const topic = document.getElementById('custom-topic').value.trim();
    if (!topic) return alert('Please enter a topic for the AI to generate questions.');

    const btn = document.getElementById('ai-quiz-btn');
    btn.disabled = true;
    btn.innerText = 'Crafting...';

    try {
        const res = await fetch('/api/ai/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic })
        });
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);

        // Map AI format to quiz app format
        currentQuiz = data.quiz.map(q => ({
            q: q.question,
            options: q.options,
            correct: q.options.indexOf(q.answer),
            desc: q.explanation
        }));

        currentQuestionIndex = 0;
        score = 0;
        
        document.getElementById('quiz-start').classList.add('hidden');
        document.getElementById('quiz-active').classList.remove('hidden');
        document.getElementById('quiz-topic').innerText = topic;
        
        showQuestion();
    } catch (err) {
        alert('AI Service is currently unavailable: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = 'Generate';
    }
};

function showQuestion() {
    answered = false;
    const qData = currentQuiz[currentQuestionIndex];
    
    document.getElementById('quiz-progress').innerText = `Question ${currentQuestionIndex + 1}/${currentQuiz.length}`;
    document.getElementById('quiz-question').innerText = qData.q;
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('quiz-feedback').classList.add('hidden');
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = qData.options.map((opt, i) => `
        <button onclick="handleAnswer(${i})" class="quiz-option animate-fadeIn" style="animation-delay: ${i * 0.1}s">
            ${opt}
        </button>
    `).join('');
}

window.handleAnswer = (idx) => {
    if (answered) return;
    answered = true;
    
    const qData = currentQuiz[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackDesc = document.getElementById('feedback-desc');
    const feedbackIcon = document.getElementById('feedback-icon');
    
    feedback.classList.remove('hidden');
    
    if (idx === qData.correct) {
        score++;
        options[idx].classList.add('correct');
        feedback.className = 'mb-10 p-4 rounded-xl border border-green-500/30 bg-green-500/5 flex items-start gap-3 animate-fadeIn';
        feedbackText.innerText = 'Correct Answer!';
        feedbackText.className = 'text-sm font-bold text-green-400 mb-1';
        feedbackIcon.innerHTML = `<svg class="text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
    } else {
        options[idx].classList.add('incorrect');
        options[qData.correct].classList.add('correct');
        feedback.className = 'mb-10 p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex items-start gap-3 animate-fadeIn';
        feedbackText.innerText = 'Oops, Wrong Answer';
        feedbackText.className = 'text-sm font-bold text-red-400 mb-1';
        feedbackIcon.innerHTML = `<svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;
    }
    
    feedbackDesc.innerText = qData.desc;
    document.getElementById('next-btn').classList.remove('hidden');
    
    if (currentQuestionIndex === currentQuiz.length - 1) {
        document.getElementById('next-btn').innerText = 'Finish Quiz & See Score';
    }
};

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById('quiz-active').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    
    const percentage = Math.round((score / currentQuiz.length) * 100);
    document.getElementById('final-score').innerText = `${percentage}%`;
    document.getElementById('correct-count').innerText = `${score}/${currentQuiz.length}`;
}
