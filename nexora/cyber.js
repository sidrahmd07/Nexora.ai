/* =========================================
   NEXORA CYBER JAVASCRIPT
   ========================================= */


/* =========================================
   ELEMENTS
   ========================================= */

const bootScreen = document.getElementById("bootScreen");

const mainPage = document.getElementById("mainPage");

const startLearning = document.getElementById("startLearning");

const moduleSection = document.getElementById("moduleSection");

const basicsModule = document.getElementById("basicsModule");

const basicsPage = document.getElementById("basicsPage");

const backToModules = document.getElementById("backToModules");

const returnToMap = document.getElementById("returnToMap");

const moduleTransition =
    document.getElementById("moduleTransition");

const answerOptions =
    document.getElementById("answerOptions");

const taskFeedback =
    document.getElementById("taskFeedback");

const basicsProgressText =
    document.getElementById("basicsProgressText");

const basicsComplete =
    document.getElementById("basicsComplete");

const basicTaskTitle =
    document.getElementById("basicTaskTitle");

const basicTaskQuestion =
    document.getElementById("basicTaskQuestion");


/* =========================================
   STORAGE
   ========================================= */

const BASICS_STORAGE =
    "nexora_cyber_basics_completed";


/* =========================================
   BOOT
   ========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        bootScreen.classList.add("hide");

    }, 1500);

});


/* =========================================
   CANVAS BACKGROUND
   ========================================= */

const canvas =
    document.getElementById("cyberCanvas");

const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =========================================
   PARTICLES
   ========================================= */

function createParticles() {

    particles = [];

    const amount =
        Math.min(
            100,
            Math.floor(window.innerWidth / 12)
        );

    for (let i = 0; i < amount; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            vx:
                (Math.random() - 0.5) *
                0.25,

            vy:
                (Math.random() - 0.5) *
                0.25,

            size:
                Math.random() * 1.5 + 0.4

        });

    }

}

createParticles();


/* =========================================
   DRAW BACKGROUND
   ========================================= */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (const p of particles) {

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) {
            p.vx *= -1;
        }

        if (p.y < 0 || p.y > canvas.height) {
            p.vy *= -1;
        }


        /* particle */

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(239,68,68,0.65)";

        ctx.fill();


        /* connections */

        for (const other of particles) {

            const dx = p.x - other.x;

            const dy = p.y - other.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 130) {

                ctx.beginPath();

                ctx.moveTo(
                    p.x,
                    p.y
                );

                ctx.lineTo(
                    other.x,
                    other.y
                );

                ctx.strokeStyle =
                    `rgba(239,68,68,${
                        0.12 *
                        (1 - distance / 130)
                    })`;

                ctx.lineWidth = 0.5;

                ctx.stroke();

            }

        }

    }

    requestAnimationFrame(drawParticles);

}

drawParticles();


/* =========================================
   START LEARNING
   ========================================= */

startLearning.addEventListener(
    "click",
    () => {

        moduleSection.classList.add("show");

        moduleSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   CHECK BASICS STATUS
   ========================================= */

function isBasicsCompleted() {

    return (
        localStorage.getItem(
            BASICS_STORAGE
        ) === "true"
    );

}


/* =========================================
   UNLOCK NETWORKING
   ========================================= */

function updateModuleLocks() {

    const networking =
        document.querySelector(
            '[data-module="networking"]'
        );

    if (isBasicsCompleted()) {

        networking.classList.remove("locked");

        networking.classList.add("unlocked");

        const lock =
            networking.querySelector(".lock");

        if (lock) {
            lock.textContent = "◉";
        }

        const status =
            networking.querySelector("small");

        if (status) {
            status.textContent = "UNLOCKED";
        }

    }

}

updateModuleLocks();


/* =========================================
   MODULE OPEN TRANSITION
   ========================================= */

function openBasics() {

    /*
        First zoom the module map away.
    */

    mainPage.classList.add("zoom-out");

    moduleTransition.classList.add("active");


    setTimeout(() => {

        moduleTransition.classList.remove("active");

        basicsPage.classList.add("active");

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            document.body.style.overflow = "auto";

        }, 700);

    }, 1000);

}


/* =========================================
   BASICS BUTTON
   ========================================= */

basicsModule.addEventListener(
    "click",
    openBasics
);


/* =========================================
   BASICS TASKS
   ========================================= */

const basicsTasks = [

    {
        title: "Task 1",

        question:
            "What are the three main goals of cybersecurity commonly represented by the CIA triad?",

        answers: [

            "Authentication, Authorization, Accounting",

            "Confidentiality, Integrity, Availability",

            "Client, Internet, Application",

            "Control, Inspection, Access"

        ],

        correct: 1
    },


    {
        title: "Task 2",

        question:
            "Which cybersecurity goal means protecting information from unauthorized access?",

        answers: [

            "Availability",

            "Integrity",

            "Confidentiality",

            "Networking"

        ],

        correct: 2
    },


    {
        title: "Task 3",

        question:
            "Which term describes a weakness that could potentially be exploited?",

        answers: [

            "Vulnerability",

            "Protocol",

            "Packet",

            "Server"

        ],

        correct: 0
    },


    {
        title: "Task 4",

        question:
            "Which cybersecurity goal focuses on keeping information accurate and protected from improper modification?",

        answers: [

            "Integrity",

            "Availability",

            "Confidentiality",

            "Authentication"

        ],

        correct: 0
    },


    {
        title: "Task 5",

        question:
            "What is a threat?",

        answers: [

            "A possible source of harm to a system",

            "A type of computer monitor",

            "A programming language",

            "A network cable"

        ],

        correct: 0
    }

];


let currentTask = 0;


/* =========================================
   LOAD TASK
   ========================================= */

function loadTask() {

    if (
        currentTask >=
        basicsTasks.length
    ) {

        finishBasics();

        return;

    }

    const task =
        basicsTasks[currentTask];


    basicTaskTitle.textContent =
        task.title;


    basicTaskQuestion.textContent =
        task.question;


    basicsProgressText.textContent =
        `${currentTask} / ${basicsTasks.length}`;


    answerOptions.innerHTML = "";

    taskFeedback.textContent = "";


    task.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );

            answerOptions.appendChild(
                button
            );

        }
    );

}


/* =========================================
   CHECK ANSWER
   ========================================= */

function checkAnswer(
    selected,
    selectedButton
) {

    const task =
        basicsTasks[currentTask];


    const allButtons =
        answerOptions.querySelectorAll(
            "button"
        );


    if (
        selected ===
        task.correct
    ) {

        selectedButton.classList.add(
            "correct-answer"
        );

        taskFeedback.textContent =
            "✓ CORRECT — NEXT TASK UNLOCKING...";

        taskFeedback.style.color =
            "#22c55e";


        allButtons.forEach(
            button => {

                button.disabled = true;

            }
        );


        currentTask++;

        setTimeout(
            loadTask,
            900
        );


    } else {

        selectedButton.classList.add(
            "wrong-answer"
        );

        taskFeedback.textContent =
            "✕ NOT CORRECT — TRY AGAIN.";

        taskFeedback.style.color =
            "#ef4444";


        setTimeout(() => {

            selectedButton.classList.remove(
                "wrong-answer"
            );

        }, 600);

    }

}


/* =========================================
   FINISH BASICS
   ========================================= */

function finishBasics() {

    localStorage.setItem(
        BASICS_STORAGE,
        "true"
    );


    basicsProgressText.textContent =
        `${basicsTasks.length} / ${basicsTasks.length}`;


    document.querySelector(
        ".basics-task"
    ).style.display = "none";


    basicsComplete.classList.add(
        "show"
    );

}


/* =========================================
   RETURN TO MODULE MAP
   ========================================= */

function returnToModules() {

    basicsPage.classList.remove(
        "active"
    );


    setTimeout(() => {

        mainPage.classList.remove(
            "zoom-out"
        );

        updateModuleLocks();

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    }, 700);

}


returnToMap.addEventListener(
    "click",
    returnToModules
);


backToModules.addEventListener(
    "click",
    returnToModules
);


/* =========================================
   INITIAL TASK
   ========================================= */

loadTask();


/* =========================================
   OTHER MODULES
   ========================================= */

document
    .querySelectorAll(
        ".module-node[data-module]"
    )
    .forEach(module => {

        module.addEventListener(
            "click",
            () => {

                const moduleName =
                    module.dataset.module;


                /*
                   NETWORKING
                   -------------------------
                   Only Networking is
                   currently available.
                */

                if (
                    moduleName ===
                    "networking"
                ) {

                    if (
                        !isBasicsCompleted()
                    ) {

                        alert(
                            "Complete Cybersecurity Basics first."
                        );

                        return;

                    }


                    /*
                       Open your separate
                       networking.html
                    */

                    mainPage.classList.add(
                        "zoom-out"
                    );

                    moduleTransition.classList.add(
                        "active"
                    );


                    setTimeout(() => {

                        window.location.href =
                            "networking.html";

                    }, 1000);

                    return;

                }


                /*
                   Future modules
                */

                alert(
                    "This module is locked. Complete the previous modules first."
                );

            }
        );

    });