// ==========================================
// NEXORA PYTHON BASICS
// COMPLETE MISSION SYSTEM
// ==========================================


// ==========================================
// CURSOR GLOW
// ==========================================

const glow =
    document.querySelector(".cursor-glow");


document.addEventListener(
    "mousemove",
    (e) => {

        if (!glow) return;

        glow.style.left =
            e.clientX + "px";

        glow.style.top =
            e.clientY + "px";

    }
);


// ==========================================
// PLAYER DATA
// ==========================================

let playerXP =
    Number(
        localStorage.getItem(
            "nexoraPythonXP"
        )
    ) || 0;


let completedStages =
    JSON.parse(
        localStorage.getItem(
            "nexoraPythonStages"
        )
    ) || [];


// ==========================================
// STAGE XP
// ==========================================

const stageXP = {

    notes:20,

    videos:20,

    quiz:30,

    practice:30,

    challenge:50

};


// ==========================================
// SAVE PROGRESS
// ==========================================

function saveProgress(){

    localStorage.setItem(
        "nexoraPythonXP",
        playerXP
    );


    localStorage.setItem(
        "nexoraPythonStages",
        JSON.stringify(
            completedStages
        )
    );

}


// ==========================================
// UPDATE XP
// ==========================================

function updateXPDisplay(){

    const xpValue =
        document.getElementById(
            "xpValue"
        );


    const novaXP =
        document.getElementById(
            "novaXP"
        );


    if(xpValue){

        xpValue.textContent =
            `${playerXP} XP`;

    }


    if(novaXP){

        novaXP.textContent =
            playerXP;

    }

}


// ==========================================
// UPDATE PROGRESS
// ==========================================

function updateProgress(){

    const progressText =
        document.getElementById(
            "progressText"
        );


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    const totalStages =
        Object.keys(stageXP).length;


    const percentage =
        Math.round(
            (
                completedStages.length /
                totalStages
            ) * 100
        );


    if(progressText){

        progressText.textContent =
            `${percentage}%`;

    }


    if(progressFill){

        progressFill.style.width =
            `${percentage}%`;

    }


    updateNextMission();

}


// ==========================================
// NOVA MESSAGE
// ==========================================

function showNovaMessage(message){

    const dialogue =
        document.getElementById(
            "novaDialogue"
        );


    if(!dialogue) return;


    dialogue.style.opacity = "0";


    setTimeout(() => {

        dialogue.textContent =
            message;


        dialogue.style.opacity =
            "1";

    }, 200);

}


// ==========================================
// COMPLETE STAGE
// ==========================================

/* ==========================================
   NEXT MISSION
   (python.js called these two functions but never defined them,
   so finishing any stage threw an error and the mission could
   never complete.)
========================================== */

function updateNextMission(){

    const button = document.getElementById("nextMissionBtn");
    const text = document.getElementById("unlockText");

    if(!button) return;

    const done =
        completedStages.length >= Object.keys(stageXP).length;

    button.disabled = !done;

    button.innerHTML = done
        ? 'Open Roadmap <i class="fa-solid fa-arrow-right"></i>'
        : 'Locked <i class="fa-solid fa-lock"></i>';

    button.onclick = done
        ? () => { window.location.href = "python-home.html"; }
        : null;

    if(text){
        text.textContent = done
            ? "Python Basics complete. Control Flow is now unlocked on your roadmap."
            : "Complete Python Basics to unlock Control Flow.";
    }

    if(done){
        localStorage.setItem(
            "nexoraPythonRoadmapV2CompletedLevel",
            String(Math.max(1, Number(localStorage.getItem("nexoraPythonRoadmapV2CompletedLevel")) || 0))
        );
    }
}

function missionComplete(){

    showNovaMessage(
        "MISSION COMPLETE! 🏆 Python Basics is done. Control Flow is unlocked on your roadmap."
    );

    updateNextMission();
}


function completeStage(stage){

    if(!stageXP[stage]) return;


    if(
        completedStages.includes(stage)
    ){

        showNovaMessage(
            "You already completed this stage! 😎"
        );

        return;

    }


    completedStages.push(stage);


    playerXP +=
        stageXP[stage];


    saveProgress();


    updateXPDisplay();


    updateProgress();


    const messages = {

        notes:
        "Nice! 📚 You completed the notes. Your Python journey has officially started!",

        videos:
        "Great job! 🎥 Your Python brain is warming up.",

        quiz:
        "Quiz completed! 🧠 Okayyy... you're actually getting good at this.",

        practice:
        "Coding mission complete! 💻 That's how programmers are made.",

        challenge:
        "CHALLENGE DEFEATED! 🎮🔥 You earned bonus XP!"

    };


    showNovaMessage(
        messages[stage]
    );


    if(
        completedStages.length ===
        Object.keys(stageXP).length
    ){

        setTimeout(() => {

            missionComplete();
localStorage.setItem(
    "nexoraPythonRoadmapV2CompletedLevel",
    String(Math.max(1, Number(localStorage.getItem("nexoraPythonRoadmapV2CompletedLevel")) || 0))
);
        }, 700);

    }

}


// ==========================================
// START MISSION
// ==========================================

const startMissionBtn =
    document.getElementById(
        "startMissionBtn"
    );


if(startMissionBtn){

    startMissionBtn.addEventListener(
        "click",
        () => {

            showNovaMessage(
                "Mission started! 🚀 Scroll down and choose your first learning stage."
            );
localStorage.setItem(
    "nexoraPythonCourseProgress",
    "1"
);

            setTimeout(() => {

                document
                    .getElementById("mission")
                    ?.scrollIntoView({
                        behavior:"smooth"
                    });

            }, 500);

        }
    );

}


// ==========================================
// TALK TO NOVA
// ==========================================

const askNovaBtn =
    document.getElementById(
        "askNovaBtn"
    );


if(askNovaBtn){

    askNovaBtn.addEventListener(
        "click",
        () => {

            const messages = [

                "Hey! 👋 I'm NOVA. Don't be scared of Python. We'll learn it together.",

                "Every expert programmer once wrote their first print('Hello World'). 😎",

                "If you get stuck, don't panic. Read the concept again and try a smaller example.",

                "Python isn't about memorizing everything. It's about understanding the logic.",

                "You don't need to be perfect. You just need to keep trying. 🚀"

            ];


            const randomMessage =
                messages[
                    Math.floor(
                        Math.random() *
                        messages.length
                    )
                ];


            showNovaMessage(
                randomMessage
            );

        }
    );

}


// ==========================================
// NOVA HINT
// ==========================================

const hintBtn =
    document.getElementById(
        "hintBtn"
    );


if(hintBtn){

    hintBtn.addEventListener(
        "click",
        () => {

            showNovaMessage(
                "💡 Hint: Start with Notes, then Videos, Quiz, Practice and finally the Challenge."
            );

        }
    );

}


/* ==========================================
   PYTHON NOTES CONTENT
========================================== */

const lessonContent = {

    notes: {

        label: "STAGE 01 · PYTHON BASICS NOTES",

        title: "Python Basics — Complete Notes",

        html: `

            <h3>1. What is Python?</h3>

            <p>
                Python is a high-level programming language.
                It is easy to read and beginner-friendly.
                Python is used in Artificial Intelligence,
                Machine Learning, Web Development,
                Data Science, Automation and Cyber Security.
            </p>


            <div class="nova-tip">
                <strong>🤖 NOVA TIP</strong>
                <p>
                    Don't try to memorize everything.
                    First understand what the code is doing.
                </p>
            </div>


            <h3>2. Your First Python Program</h3>

            <p>
                The simplest Python program uses
                the <code>print()</code> function.
            </p>

            <pre><code>print("Hello World")
print("Welcome to NEXORA")</code></pre>


            <h3>3. Comments</h3>

            <p>
                Comments are notes written inside your code.
                Python ignores comments when running the program.
            </p>

            <pre><code># This is a comment

print("Hello")</code></pre>


            <h3>4. Variables</h3>

            <p>
                A variable is like a box that stores a value.
            </p>

            <pre><code>name = "Sidrah"
age = 18
course = "Python"</code></pre>

            <p>
                Here:
            </p>

            <ul>
                <li><strong>name</strong> stores "Sidrah"</li>
                <li><strong>age</strong> stores 18</li>
                <li><strong>course</strong> stores "Python"</li>
            </ul>


            <h3>5. Data Types</h3>

            <p>
                A data type tells Python what kind of value
                you are storing.
            </p>

            <pre><code>name = "NEXORA"     # String
age = 18             # Integer
price = 99.5         # Float
active = True        # Boolean</code></pre>

            <p>Common types:</p>

            <ul>
                <li>String → text</li>
                <li>Integer → whole number</li>
                <li>Float → decimal number</li>
                <li>Boolean → True or False</li>
            </ul>


            <h3>6. Checking Data Type</h3>

            <p>
                Use <code>type()</code> to find the type
                of a value.
            </p>

            <pre><code>age = 18

print(type(age))</code></pre>


            <h3>7. Taking User Input</h3>

            <p>
                The <code>input()</code> function allows
                the user to enter information.
            </p>

            <pre><code>name = input("Enter your name: ")

print("Hello", name)</code></pre>


            <h3>8. Type Conversion</h3>

            <p>
                Input normally comes as text.
                We can convert it into another type.
            </p>

            <pre><code>age = int(input("Enter your age: "))

print(age)</code></pre>

            <p>Common conversions:</p>

            <pre><code>int()
float()
str()
bool()</code></pre>


            <h3>9. Operators</h3>

            <p>
                Operators are symbols used to perform
                operations on values.
            </p>


            <h4>Arithmetic Operators</h4>

            <pre><code>+   Addition
-   Subtraction
*   Multiplication
/   Division
%   Remainder
**  Power
//  Floor Division</code></pre>


            <h3>10. Comparison Operators</h3>

            <pre><code>==   Equal
!=   Not Equal
>    Greater Than
<    Less Than
>=   Greater or Equal
<=   Less or Equal</code></pre>


            <h3>11. Conditional Statements</h3>

            <p>
                Conditions allow a program to make decisions.
            </p>

            <pre><code>marks = 85

if marks >= 75:
    print("Grade A")
else:
    print("Keep practicing")</code></pre>


            <h3>12. if, elif and else</h3>

            <pre><code>marks = 85

if marks >= 90:
    print("A+")

elif marks >= 75:
    print("A")

else:
    print("B")</code></pre>


            <h3>13. for Loop</h3>

            <p>
                A for loop repeats a block of code.
            </p>

            <pre><code>for i in range(5):
    print(i)</code></pre>

            <p>
                Output:
            </p>

            <pre><code>0
1
2
3
4</code></pre>


            <h3>14. while Loop</h3>

            <pre><code>count = 1

while count <= 5:
    print(count)
    count += 1</code></pre>


            <h3>15. break</h3>

            <p>
                <code>break</code> stops a loop.
            </p>

            <pre><code>for i in range(10):

    if i == 5:
        break

    print(i)</code></pre>


            <h3>16. continue</h3>

            <p>
                <code>continue</code> skips the current
                loop iteration.
            </p>

            <pre><code>for i in range(5):

    if i == 2:
        continue

    print(i)</code></pre>


            <h3>17. Strings</h3>

            <p>
                A string is text stored inside quotes.
            </p>

            <pre><code>name = "NEXORA"

print(name)</code></pre>

            <p>
                Strings can be joined together.
            </p>

            <pre><code>first = "Sidrah"
last = "Mohamed"

full_name = first + " " + last

print(full_name)</code></pre>


            <h3>18. Lists</h3>

            <p>
                A list stores multiple values in one variable.
            </p>

            <pre><code>skills = [
    "Python",
    "AI",
    "Web"
]

print(skills)</code></pre>


            <h4>Adding an item</h4>

            <pre><code>skills.append("Cyber")</code></pre>


            <h4>Accessing an item</h4>

            <pre><code>print(skills[0])</code></pre>


            <h3>19. Tuples</h3>

            <p>
                A tuple is similar to a list,
                but its values cannot normally be changed.
            </p>

            <pre><code>coordinates = (10, 20)

print(coordinates)</code></pre>


            <h3>20. Sets</h3>

            <p>
                A set stores unique values.
            </p>

            <pre><code>numbers = {1, 2, 3, 3}

print(numbers)</code></pre>


            <h3>21. Dictionaries</h3>

            <p>
                A dictionary stores data using
                key and value pairs.
            </p>

            <pre><code>student = {
    "name": "Sidrah",
    "age": 18,
    "course": "Python"
}

print(student["name"])</code></pre>


            <h3>22. Functions</h3>

            <p>
                A function is a reusable block of code.
            </p>

            <pre><code>def greet():
    print("Hello NEXORA")

greet()</code></pre>


            <h3>23. Function Parameters</h3>

            <pre><code>def greet(name):

    print("Hello", name)

greet("Sidrah")</code></pre>


            <h3>24. Return</h3>

            <p>
                <code>return</code> sends a result back
                from a function.
            </p>

            <pre><code>def add(a, b):

    return a + b

result = add(10, 5)

print(result)</code></pre>


            <h3>25. Exception Handling</h3>

            <p>
                Errors can happen while a program runs.
                We can handle them using
                <code>try</code> and <code>except</code>.
            </p>

            <pre><code>try:

    number = int(input("Enter number: "))

    print(number)

except ValueError:

    print("Please enter a valid number.")</code></pre>


            <h3>26. File Handling</h3>

            <p>
                Python can read and write files.
            </p>

            <pre><code>file = open("notes.txt", "w")

file.write("Welcome to NEXORA")

file.close()</code></pre>


            <h3>27. Modules</h3>

            <p>
                A module is a Python file containing
                reusable code.
            </p>

            <pre><code>import math

print(math.sqrt(25))</code></pre>


            <h3>28. Classes and Objects</h3>

            <p>
                Classes are used in Object-Oriented Programming.
                A class acts like a blueprint for creating objects.
            </p>

            <pre><code>class Student:

    def __init__(self, name):
        self.name = name

student = Student("Sidrah")

print(student.name)</code></pre>


            <h3>29. Common Python Errors</h3>

            <p>
                Beginners commonly see these errors:
            </p>

            <ul>
                <li>SyntaxError</li>
                <li>NameError</li>
                <li>TypeError</li>
                <li>ValueError</li>
                <li>IndexError</li>
                <li>KeyError</li>
                <li>IndentationError</li>
                <li>ZeroDivisionError</li>
            </ul>


            <h3>30. Problem Solving</h3>

            <p>
                Before writing code, understand the problem.
            </p>

            <pre><code>Problem
   ↓
Understand Input
   ↓
Understand Output
   ↓
Break Into Steps
   ↓
Write Logic
   ↓
Write Code
   ↓
Test
   ↓
Fix Errors</code></pre>


            <h3>31. Beginner Projects</h3>

            <ul>
                <li>Calculator</li>
                <li>Number Guessing Game</li>
                <li>Student Grade Calculator</li>
                <li>Simple Quiz Game</li>
                <li>To-Do List</li>
                <li>Rock Paper Scissors</li>
                <li>Expense Tracker</li>
            </ul>


            <h3>32. Python Cheat Sheet</h3>

            <pre><code>print()
input()

if
elif
else

for
while

break
continue

list
tuple
set
dict

def
return

try
except

import

class</code></pre>


            <div class="nova-tip">

                <strong>🤖 NOVA FINAL TIP</strong>

                <p>
                    You do NOT need to memorize Python
                    in one day. Learn one concept,
                    write code, make mistakes, fix them,
                    and repeat.
                </p>

            </div>


            <h3>Quick Recap</h3>

            <p>
                You now have the foundation needed to start
                writing Python programs. Your next step is
                practice: write small programs, solve problems,
                complete quizzes and build projects.
            </p>

        `
    }

};



/* ==========================================
   OPEN LESSON MODAL
========================================== */

function openLessonModal(stageKey) {

    const data = lessonContent[stageKey];

    if (!data) return;


    const modal =
        document.getElementById("lessonModal");

    const stageLabel =
        document.getElementById("modalStageLabel");

    const title =
        document.getElementById("modalTitle");

    const body =
        document.getElementById("modalBody");


    if (!modal || !stageLabel || !title || !body) {
        console.error("Lesson modal elements not found.");
        return;
    }


    stageLabel.textContent =
        data.label;

    title.textContent =
        data.title;

    body.innerHTML =
        data.html;


    modal.classList.add("open");

    modal.dataset.stage =
        stageKey;

}

/* ==========================================
   OPEN NOTES
========================================== */

function openNotes() {

    openLessonModal("notes");

}


/* ==========================================
   NEXORA INFINITE LESSON CAROUSEL
   SEAMLESS LOOP
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const track =
            document.querySelector(
                ".lesson-track"
            );


        if (!track) return;


        /* ----------------------------------
           ORIGINAL CARDS
        ---------------------------------- */

        const originalCards =
            Array.from(
                track.querySelectorAll(
                    ".learning-card"
                )
            );


        if (
            originalCards.length === 0
        ) {
            return;
        }


        /* ----------------------------------
           PREVENT DUPLICATION
        ---------------------------------- */

        if (
            track.dataset.loopReady === "true"
        ) {
            return;
        }


        track.dataset.loopReady = "true";


        /* ----------------------------------
           CLONE ORIGINAL FIVE CARDS
        ---------------------------------- */

        originalCards.forEach(
            (card) => {

                const clone =
                    card.cloneNode(true);

                clone.dataset.clone =
                    "true";

                track.appendChild(
                    clone
                );

            }
        );


        /* ----------------------------------
           CALCULATE EXACT LOOP DISTANCE
        ---------------------------------- */

        const firstCard =
            originalCards[0];


        const cardWidth =
            firstCard.getBoundingClientRect().width;


        const styles =
            window.getComputedStyle(
                track
            );


        const gap =
            parseFloat(
                styles.columnGap ||
                styles.gap
            ) || 0;


        const loopDistance =
            (
                cardWidth + gap
            ) *
            originalCards.length;


        /* ----------------------------------
           SEND DISTANCE TO CSS
        ---------------------------------- */

        track.style.setProperty(
            "--loop-distance",
            `${loopDistance}px`
        );


        /* ----------------------------------
           PAUSE WHEN MOUSE IS OVER TRACK
        ---------------------------------- */

        track.addEventListener(
            "mouseenter",
            () => {

                track.style.animationPlayState =
                    "paused";

            }
        );


        track.addEventListener(
            "mouseleave",
            () => {

                track.style.animationPlayState =
                    "running";

            }
        );

    }
);

/* ==========================================
   VIDEO LESSON
========================================== */

function openVideos() {

    const videoModal =
        document.getElementById("videoModal");

    if (!videoModal) return;

    videoModal.classList.add("open");

}


/* ==========================================
   CLOSE VIDEO MODAL
========================================== */

function closeVideoModal() {

    const videoModal =
        document.getElementById("videoModal");

    const video =
        document.getElementById("pythonVideo");

    if (!videoModal) return;


    videoModal.classList.remove("open");


    /* Stop video when modal closes */

    if (video) {

        video.src =
            video.src;

    }

}


/* ==========================================
   COMPLETE VIDEO LESSON
========================================== */

function completeVideoLesson() {

    completeStage("videos");

    closeVideoModal();

}


/* ==========================================
   PYTHON QUIZ
========================================== */

const pythonQuiz = [

    {
        question:
            "What is Python?",

        options: [
            "A programming language",
            "A web browser",
            "An operating system",
            "A database"
        ],

        answer: 0
    },


    {
        question:
            "Which function is used to display output in Python?",

        options: [
            "input()",
            "print()",
            "display()",
            "show()"
        ],

        answer: 1
    },


    {
        question:
            "Which symbol is used to create a comment in Python?",

        options: [
            "//",
            "/* */",
            "#",
            "--"
        ],

        answer: 2
    },


    {
        question:
            "Which of these is a valid variable?",

        options: [
            "2name",
            "student_name",
            "student-name",
            "class"
        ],

        answer: 1
    },


    {
        question:
            "What data type is 25?",

        options: [
            "String",
            "Float",
            "Integer",
            "Boolean"
        ],

        answer: 2
    },


    {
        question:
            "Which function is used to get input from a user?",

        options: [
            "scan()",
            "input()",
            "get()",
            "read()"
        ],

        answer: 1
    },


    {
        question:
            "Which keyword is used for a condition?",

        options: [
            "if",
            "when",
            "check",
            "condition"
        ],

        answer: 0
    },


    {
        question:
            "Which loop is commonly used to repeat through a range?",

        options: [
            "repeat",
            "for",
            "loop",
            "foreach"
        ],

        answer: 1
    },


    {
        question:
            "Which collection uses square brackets?",

        options: [
            "Tuple",
            "Set",
            "Dictionary",
            "List"
        ],

        answer: 3
    },


    {
        question:
            "Which keyword creates a function?",

        options: [
            "function",
            "func",
            "def",
            "create"
        ],

        answer: 2
    }

];


let currentQuestion = 0;

let quizScore = 0;

let questionAnswered = false;


/* ==========================================
   OPEN QUIZ
========================================== */

function openQuiz() {

    const quizModal =
        document.getElementById(
            "quizModal"
        );


    if (!quizModal) return;


    currentQuestion = 0;

    quizScore = 0;

    questionAnswered = false;


    quizModal.classList.add(
        "open"
    );


    loadQuestion();

}


/* ==========================================
   LOAD QUESTION
========================================== */

function loadQuestion() {

    const question =
        pythonQuiz[currentQuestion];


    if (!question) return;


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const questionText =
        document.getElementById(
            "questionText"
        );


    const options =
        document.getElementById(
            "quizOptions"
        );


    const score =
        document.getElementById(
            "quizScore"
        );


    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    const nextButton =
        document.getElementById(
            "nextQuestionBtn"
        );


    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${pythonQuiz.length}`;


    questionText.textContent =
        question.question;


    score.textContent =
        `Score: ${quizScore}`;


    feedback.textContent =
        "";


    nextButton.disabled =
        true;


    questionAnswered =
        false;


    options.innerHTML =
        "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.onclick = () => {

                selectAnswer(
                    index
                );

            };


            options.appendChild(
                button
            );

        }
    );

}


/* ==========================================
   SELECT ANSWER
========================================== */

function selectAnswer(selectedIndex) {

    if (questionAnswered)
        return;


    questionAnswered =
        true;


    const question =
        pythonQuiz[currentQuestion];


    const options =
        document.querySelectorAll(
            ".quiz-option"
        );


    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    const nextButton =
        document.getElementById(
            "nextQuestionBtn"
        );


    options.forEach(
        (button, index) => {

            button.disabled =
                true;


            if (
                index ===
                question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }


            if (
                index ===
                selectedIndex &&
                selectedIndex !==
                question.answer
            ) {

                button.classList.add(
                    "wrong"
                );

            }

        }
    );


    if (
        selectedIndex ===
        question.answer
    ) {

        quizScore++;


        feedback.textContent =
            "✅ Correct! Great job.";

    }

    else {

        feedback.textContent =
            `❌ Not quite. The correct answer is: ${question.options[question.answer]}`;

    }


    document.getElementById(
        "quizScore"
    ).textContent =
        `Score: ${quizScore}`;


    nextButton.disabled =
        false;

}


/* ==========================================
   NEXT QUESTION
========================================== */

function nextQuestion() {

    if (!questionAnswered)
        return;


    currentQuestion++;


    if (
        currentQuestion >=
        pythonQuiz.length
    ) {

        finishQuiz();

        return;

    }


    loadQuestion();

}


/* ==========================================
   FINISH QUIZ
========================================== */

function finishQuiz() {

    const percentage =
        Math.round(
            (
                quizScore /
                pythonQuiz.length
            ) * 100
        );


    const questionText =
        document.getElementById(
            "questionText"
        );


    const options =
        document.getElementById(
            "quizOptions"
        );


    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    const nextButton =
        document.getElementById(
            "nextQuestionBtn"
        );


    questionText.textContent =
        `Quiz Complete! 🎉`;


    options.innerHTML = `
        <div class="quiz-result">
            <strong>${quizScore} / ${pythonQuiz.length}</strong>
            <span>${percentage}%</span>
        </div>
    `;


    feedback.textContent =
        percentage >= 70
            ? "🔥 Excellent! You passed the Python Basics quiz."
            : "📚 Keep practicing and try again.";


    nextButton.textContent =
        "Finish";


    nextButton.onclick =
        () => {

            if (percentage >= 70) {

                completeStage(
                    "quiz"
                );

            }

            closeQuiz();

        };

}


/* ==========================================
   CLOSE QUIZ
========================================== */

function closeQuiz() {

    const quizModal =
        document.getElementById(
            "quizModal"
        );


    if (!quizModal) return;


    quizModal.classList.remove(
        "open"
    );

}

/* ==========================================
   PYTHON FINAL CHALLENGE
   10 QUESTIONS
   PASS MARK = 70%
========================================== */

const pythonChallenges = [

    {
        question:
            `What is the output?

x = 10
x = x + 5
print(x)`,

        options: [
            "10",
            "15",
            "105",
            "Error"
        ],

        answer: 1
    },


    {
        question:
            `Which of these creates a Python list?`,

        options: [
            "(1, 2, 3)",
            "{1, 2, 3}",
            "[1, 2, 3]",
            "<1, 2, 3>"
        ],

        answer: 2
    },


    {
        question:
            `What is the output?

name = "NEXORA"
print(name[0])`,

        options: [
            "N",
            "E",
            "A",
            "Error"
        ],

        answer: 0
    },


    {
        question:
            `What does len() return?`,

        options: [
            "The first item",
            "The last item",
            "The number of items",
            "The data type"
        ],

        answer: 2
    },


    {
        question:
            `What is the output?

for i in range(3):
    print(i)`,

        options: [
            "1 2 3",
            "0 1 2",
            "0 1 2 3",
            "3 2 1"
        ],

        answer: 1
    },


    {
        question:
            `Which keyword is used to define a function?`,

        options: [
            "function",
            "func",
            "define",
            "def"
        ],

        answer: 3
    },


    {
        question:
            `What is the output?

age = 18

if age >= 18:
    print("Adult")
else:
    print("Minor")`,

        options: [
            "Minor",
            "Adult",
            "18",
            "Error"
        ],

        answer: 1
    },


    {
        question:
            `Which method adds one item to the end of a list?`,

        options: [
            "add()",
            "insertEnd()",
            "append()",
            "push()"
        ],

        answer: 2
    },


    {
        question:
            `What does == mean in Python?`,

        options: [
            "Assignment",
            "Comparison for equality",
            "Not equal",
            "Greater than"
        ],

        answer: 1
    },


    {
        question:
            `What is wrong with this code?

if marks >= 50
    print("Pass")`,

        options: [
            "marks cannot be used",
            "print() is wrong",
            "A colon : is missing",
            "if cannot be used"
        ],

        answer: 2
    }

];

/* ==========================================
   FINISH CHALLENGE
========================================== */

/* finishChallenge() is defined once, further down this file. */


let currentChallenge = 0;

let challengeScore = 0;

let challengeAnswered = false;


/* ==========================================
   OPEN CHALLENGE
========================================== */

function openChallenge() {

    const modal =
        document.getElementById(
            "challengeModal"
        );

    if (!modal) {

        console.error(
            "challengeModal not found in HTML"
        );

        return;

    }

    currentChallenge = 0;

    challengeScore = 0;

    challengeAnswered = false;

    modal.classList.add("open");

    loadChallenge();

}


/* ==========================================
   LOAD CHALLENGE
========================================== */

function loadChallenge() {

    const challenge =
        pythonChallenges[
            currentChallenge
        ];

    const number =
        document.getElementById(
            "challengeNumber"
        );

    const score =
        document.getElementById(
            "challengeScore"
        );

    const question =
        document.getElementById(
            "challengeQuestion"
        );

    const options =
        document.getElementById(
            "challengeOptions"
        );

    const feedback =
        document.getElementById(
            "challengeFeedback"
        );

    const nextButton =
        document.getElementById(
            "nextChallengeBtn"
        );


    if (
        !challenge ||
        !number ||
        !score ||
        !question ||
        !options ||
        !feedback ||
        !nextButton
    ) {

        console.error(
            "Challenge elements missing."
        );

        return;

    }


    number.textContent =
        `Challenge ${currentChallenge + 1} / ${pythonChallenges.length}`;


    score.textContent =
        `Score: ${challengeScore}`;


    question.textContent =
        challenge.question;


    feedback.textContent =
        "";


    options.innerHTML =
        "";


    nextButton.disabled =
        true;


    nextButton.innerHTML = `
        Next
        <i class="fa-solid fa-arrow-right"></i>
    `;


    challengeAnswered =
        false;


    challenge.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "challenge-option";

            button.textContent =
                option;

            button.addEventListener(
                "click",
                () => {

                    selectChallengeAnswer(
                        index
                    );

                }
            );

            options.appendChild(
                button
            );

        }
    );

}


/* ==========================================
   SELECT ANSWER
========================================== */

function selectChallengeAnswer(
    selectedIndex
) {

    if (challengeAnswered)
        return;


    challengeAnswered =
        true;


    const challenge =
        pythonChallenges[
            currentChallenge
        ];


    const options =
        document.querySelectorAll(
            ".challenge-option"
        );


    const feedback =
        document.getElementById(
            "challengeFeedback"
        );


    const nextButton =
        document.getElementById(
            "nextChallengeBtn"
        );


    options.forEach(
        (button, index) => {

            button.disabled =
                true;


            if (
                index ===
                challenge.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }


            if (
                index === selectedIndex &&
                selectedIndex !==
                challenge.answer
            ) {

                button.classList.add(
                    "wrong"
                );

            }

        }
    );


    if (
        selectedIndex ===
        challenge.answer
    ) {

        challengeScore++;

        feedback.textContent =
            "✅ Correct!";

    }

    else {

        feedback.textContent =
            `❌ Wrong. Correct answer: ${challenge.options[challenge.answer]}`;

    }


    const score =
        document.getElementById(
            "challengeScore"
        );


    if (score) {

        score.textContent =
            `Score: ${challengeScore}`;

    }


    nextButton.disabled =
        false;

}


/* ==========================================
   NEXT CHALLENGE
========================================== */

function nextChallenge() {

    if (!challengeAnswered)
        return;


    currentChallenge++;


    if (
        currentChallenge >=
        pythonChallenges.length
    ) {

        finishChallenge();

        return;

    }


    loadChallenge();

}


/* ==========================================
   FINISH CHALLENGE
========================================== */

function finishChallenge() {

    const total =
        pythonChallenges.length;


    const percentage =
        Math.round(
            (challengeScore / total) * 100
        );


    const question =
        document.getElementById(
            "challengeQuestion"
        );


    const options =
        document.getElementById(
            "challengeOptions"
        );


    const feedback =
        document.getElementById(
            "challengeFeedback"
        );


    const nextButton =
        document.getElementById(
            "nextChallengeBtn"
        );


    question.textContent =
        "🏆 Challenge Complete!";


    options.innerHTML = `

        <div class="challenge-result">

            <strong>
                ${challengeScore} / ${total}
            </strong>

            <span>
                ${percentage}%
            </span>

        </div>

    `;


    if (percentage >= 70) {

        feedback.textContent =
            "🔥 CHALLENGE DEFEATED! You passed with 70% or higher.";


        nextButton.innerHTML = `
            Exit Challenge
            <i class="fa-solid fa-door-open"></i>
        `;


        nextButton.disabled =
            false;


        nextButton.onclick =
            () => {

                completeStage(
                    "challenge"
                );

                closeChallenge();

            };

    }

    else {

        feedback.textContent =
            `❌ You scored ${percentage}%. You need at least 70% (7/10) to finish.`;


        nextButton.innerHTML = `
            Retry Challenge
            <i class="fa-solid fa-rotate-right"></i>
        `;


        nextButton.disabled =
            false;


        nextButton.onclick =
            () => {

                currentChallenge = 0;

                challengeScore = 0;

                challengeAnswered = false;

                loadChallenge();

            };

    }

}


/* ==========================================
   CLOSE CHALLENGE
========================================== */

function closeChallenge() {

    const modal =
        document.getElementById(
            "challengeModal"
        );

    if (!modal) return;

    modal.classList.remove(
        "open"
    );

}

/* ==========================================
   PYTHON PRACTICE
   5 DEFINITION QUESTIONS
========================================== */

const pythonPractice = [

    {
        question: "What is Python?",
        answer: "Python is a programming language"
    },

    {
        question: "What is a variable?",
        answer: "A variable stores a value"
    },

    {
        question: "What is a list?",
        answer: "A list stores multiple values"
    },

    {
        question: "What is a function?",
        answer: "A function is a reusable block of code"
    },

    {
        question: "What is a loop?",
        answer: "A loop repeats code"
    }

];


let currentPractice = 0;

let practiceScore = 0;

let practiceAnswered = false;


/* ==========================================
   OPEN PRACTICE
========================================== */

function openPractice() {

    const modal =
        document.getElementById("practiceModal");

    if (!modal) {

        console.error(
            "ERROR: practiceModal is missing from python.html"
        );

        return;
    }

    currentPractice = 0;

    practiceScore = 0;

    practiceAnswered = false;

    modal.classList.add("open");

    loadPracticeQuestion();

}


/* ==========================================
   LOAD QUESTION
========================================== */

function loadPracticeQuestion() {

    const question =
        pythonPractice[currentPractice];

    if (!question) return;


    const number =
        document.getElementById("practiceNumber");

    const score =
        document.getElementById("practiceScore");

    const questionText =
        document.getElementById("practiceQuestion");

    const input =
        document.getElementById("practiceAnswer");

    const feedback =
        document.getElementById("practiceFeedback");

    const button =
        document.getElementById("checkPracticeBtn");


    if (!number ||
        !score ||
        !questionText ||
        !input ||
        !feedback ||
        !button) {

        console.error(
            "ERROR: Practice HTML elements are missing."
        );

        return;
    }


    number.textContent =
        `Question ${currentPractice + 1} / ${pythonPractice.length}`;


    score.textContent =
        `Score: ${practiceScore}`;


    questionText.textContent =
        question.question;


    input.value = "";

    input.disabled = false;

    input.style.display = "block";


    feedback.textContent = "";


    practiceAnswered = false;


    button.disabled = false;

    button.innerHTML = `
        Check Answer
        <i class="fa-solid fa-check"></i>
    `;

    button.onclick =
        checkPracticeAnswer;


    setTimeout(() => {

        input.focus();

    }, 100);

}


/* ==========================================
   CHECK ANSWER
========================================== */

function checkPracticeAnswer() {

    if (practiceAnswered)
        return;


    const input =
        document.getElementById(
            "practiceAnswer"
        );

    const feedback =
        document.getElementById(
            "practiceFeedback"
        );

    const score =
        document.getElementById(
            "practiceScore"
        );

    const button =
        document.getElementById(
            "checkPracticeBtn"
        );


    const question =
        pythonPractice[currentPractice];


    if (!input ||
        !feedback ||
        !score ||
        !button ||
        !question) {

        return;
    }


    const userAnswer =
        input.value
            .trim()
            .toLowerCase();


    if (!userAnswer) {

        feedback.textContent =
            "✍️ Write an answer first.";

        return;

    }   


    practiceAnswered = true;

    input.disabled = true;


    /*
       Accept the important words
       instead of forcing an exact sentence.
    */

    let correct = false;


    switch (currentPractice) {

        case 0:

            correct =
                userAnswer.includes("python") &&
                userAnswer.includes("programming");

            break;


        case 1:

            correct =
                userAnswer.includes("variable") &&
                userAnswer.includes("value");

            break;


        case 2:

            correct =
                userAnswer.includes("list") &&
                userAnswer.includes("multiple");

            break;


        case 3:

            correct =
                userAnswer.includes("function") &&
                (
                    userAnswer.includes("reusable") ||
                    userAnswer.includes("reuse")
                );

            break;


        case 4:

            correct =
                userAnswer.includes("loop") &&
                (
                    userAnswer.includes("repeat") ||
                    userAnswer.includes("repeats")
                );

            break;

    }


    if (correct) {

        practiceScore++;

        feedback.textContent =
            "✅ Correct! Nice definition.";

    }
    else {

        feedback.textContent =
            `❌ Not quite. Example answer: ${question.answer}`;

    }


    score.textContent =
        `Score: ${practiceScore}`;


    button.innerHTML = `
        Next Question
        <i class="fa-solid fa-arrow-right"></i>
    `;


    button.onclick =
        nextPracticeQuestion;

}


/* ==========================================
   NEXT QUESTION
========================================== */

function nextPracticeQuestion() {

    currentPractice++;


    if (
        currentPractice >=
        pythonPractice.length
    ) {

        finishPractice();

        return;

    }


    loadPracticeQuestion();

}


/* ==========================================
   FINISH PRACTICE
========================================== */

function finishPractice() {

    const total =
        pythonPractice.length;


    const percentage =
        Math.round(
            (practiceScore / total) * 100
        );


    const questionText =
        document.getElementById(
            "practiceQuestion"
        );

    const input =
        document.getElementById(
            "practiceAnswer"
        );

    const feedback =
        document.getElementById(
            "practiceFeedback"
        );

    const button =
        document.getElementById(
            "checkPracticeBtn"
        );


    if (!questionText ||
        !input ||
        !feedback ||
        !button) {

        return;

    }


    questionText.textContent =
        "💻 Practice Complete!";


    input.style.display =
        "none";


    if (percentage >= 70) {

        feedback.textContent =
            `🔥 Great work! You scored ${practiceScore}/${total} (${percentage}%).`;


        button.innerHTML = `
            Complete Practice
            <i class="fa-solid fa-check"></i>
        `;


        button.onclick = () => {

            completeStage("practice");

            closePractice();

        };

    }
    else {

        feedback.textContent =
            `📚 You scored ${practiceScore}/${total} (${percentage}%). You need 70% or more. Try again.`;


        button.innerHTML = `
            Retry Practice
            <i class="fa-solid fa-rotate-right"></i>
        `;


        button.onclick = () => {

            currentPractice = 0;

            practiceScore = 0;

            practiceAnswered = false;

            loadPracticeQuestion();

        };

    }

}


/* ==========================================
   CLOSE PRACTICE
========================================== */

function closePractice() {

    const modal =
        document.getElementById(
            "practiceModal"
        );


    if (!modal) return;


    modal.classList.remove("open");

}