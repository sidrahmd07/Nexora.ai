/* =========================================================
   NEXORA STUDENT DASHBOARD
   VANILLA JAVASCRIPT
   ========================================================= */


/* =========================================================
   DEFAULT USER DATA
   ========================================================= */

const defaultUser = {
    name: "Nexorian",
    username: "@nexorian",
    avatar: "N",
    level: 1,
    xp: 0,
    xpRequired: 500,
    streak: 0,
    courses: 0,
    projects: 0,
    coins: 0,
    todayCoins: 0,
    quizzesCompleted: 0,
    averageScore: 0,
    bestScore: 0,
    questionsSolved: 0,
    correctAnswers: 0,
    accuracy: 0
};


let user =
    JSON.parse(
        localStorage.getItem("nexoraUser")
    ) || defaultUser;


/* =========================================================
   SAVE USER
   ========================================================= */

function saveUser() {

    localStorage.setItem(
        "nexoraUser",
        JSON.stringify(user)
    );

}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeDashboard();

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeDashboard() {

    setupIntro();

    setupGalaxy();

    updateUserUI();

    setupNavigation();

    setupProfile();

    setupQuizSystem();

    setupAI();

    setupButtons();

    setupRevealAnimations();

    setupClock();

    setupShootingStars();

    checkAchievements();

}


/* =========================================================
   INTRO
   ========================================================= */

function setupIntro() {

    const intro =
        document.getElementById(
            "introScreen"
        );

    const app =
        document.getElementById(
            "app"
        );

    setTimeout(
        () => {

            intro.classList.add("hide");

            app.classList.remove("hidden");

        },
        2200
    );

}


/* =========================================================
   GALAXY
   ========================================================= */

function setupGalaxy() {

    const canvas =
        document.getElementById(
            "galaxyCanvas"
        );

    const ctx =
        canvas.getContext("2d");

    let width =
        window.innerWidth;

    let height =
        window.innerHeight;

    let stars = [];

    let mouseX = 0;
    let mouseY = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;


    function resize() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        canvas.width =
            width *
            Math.min(
                window.devicePixelRatio,
                2
            );

        canvas.height =
            height *
            Math.min(
                window.devicePixelRatio,
                2
            );

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";

        ctx.setTransform(
            Math.min(
                window.devicePixelRatio,
                2
            ),
            0,
            0,
            Math.min(
                window.devicePixelRatio,
                2
            ),
            0,
            0
        );

        createStars();

    }


    function createStars() {

        stars = [];

        const count =
            Math.min(
                650,
                Math.floor(
                    (width * height) /
                    1800
                )
            );


        for (
            let i = 0;
            i < count;
            i++
        ) {

            stars.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,

                radius:
                    Math.random() *
                    1.4 +
                    0.15,

                speed:
                    Math.random() *
                    0.25 +
                    0.03,

                depth:
                    Math.random(),

                alpha:
                    Math.random() *
                    0.65 +
                    0.15,

                twinkle:
                    Math.random() *
                    Math.PI *
                    2

            });

        }

    }


    function draw() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        mouseX +=
            (
                targetMouseX -
                mouseX
            ) * 0.025;

        mouseY +=
            (
                targetMouseY -
                mouseY
            ) * 0.025;


        for (
            const star of stars
        ) {

            star.y +=
                star.speed *
                (0.4 + star.depth);


            if (
                star.y >
                height + 5
            ) {

                star.y = -5;

                star.x =
                    Math.random() *
                    width;

            }


            const parallaxX =
                mouseX *
                star.depth *
                18;

            const parallaxY =
                mouseY *
                star.depth *
                12;


            const twinkle =
                Math.sin(
                    Date.now() * 0.001 +
                    star.twinkle
                );


            const alpha =
                Math.max(
                    0.08,
                    star.alpha +
                    twinkle * 0.15
                );


            ctx.beginPath();

            ctx.arc(
                star.x + parallaxX,
                star.y + parallaxY,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255,255,255,${alpha})`;

            ctx.fill();

        }


        requestAnimationFrame(
            draw
        );

    }


    window.addEventListener(
        "mousemove",
        event => {

            targetMouseX =
                event.clientX /
                width *
                2 -
                1;

            targetMouseY =
                event.clientY /
                height *
                2 -
                1;

        }
    );


    window.addEventListener(
        "resize",
        resize
    );


    resize();

    draw();

}


/* =========================================================
   SHOOTING STARS
   ========================================================= */

function setupShootingStars() {

    const container =
        document.getElementById(
            "shootingStars"
        );


    function createShootingStar() {

        const star =
            document.createElement(
                "div"
            );

        star.className =
            "shooting-star";


        star.style.left =
            Math.random() *
            100 +
            "%";

        star.style.top =
            Math.random() *
            45 +
            "%";


        container.appendChild(
            star
        );


        setTimeout(
            () => {

                star.remove();

            },
            1500
        );

    }


    setInterval(
        () => {

            if (
                Math.random() >
                0.35
            ) {

                createShootingStar();

            }

        },
        5500
    );

}


/* =========================================================
   CLOCK
   ========================================================= */

function setupClock() {

    const dateElement =
        document.getElementById(
            "currentDate"
        );

    const timeElement =
        document.getElementById(
            "currentTime"
        );


    function updateClock() {

        const now =
            new Date();


        dateElement.textContent =
            now.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            ).toUpperCase();


        timeElement.textContent =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour12: false
                }
            );

    }


    updateClock();

    setInterval(
        updateClock,
        1000
    );

}


/* =========================================================
   UPDATE USER UI
   ========================================================= */

function updateUserUI() {

    const firstName =
        user.name
            .split(" ")[0]
            .toUpperCase();


    setText(
        "welcomeName",
        firstName
    );

    setText(
        "profileName",
        user.name
    );

    setText(
        "profileUsername",
        user.username
    );

    setText(
        "navAvatar",
        getInitial(user.name)
    );

    setText(
        "profileAvatar",
        getInitial(user.name)
    );

    setText(
        "levelNumber",
        String(user.level).padStart(2,"0")
    );

    setText(
        "xpCurrent",
        user.xp.toLocaleString()
    );

    setText(
        "currentXpText",
        user.xp.toLocaleString()
    );

    setText(
        "xpRequired",
        user.xpRequired.toLocaleString()
    );

    setText(
        "remainingXp",
        Math.max(
            0,
            user.xpRequired -
            user.xp
        ).toLocaleString() +
        " XP"
    );

    setText(
        "streakValue",
        user.streak
    );

    setText(
        "streakBig",
        user.streak
    );

    setText(
        "coursesValue",
        user.courses
    );

    setText(
        "projectsValue",
        user.projects
    );

    setText(
        "coinValue",
        user.coins.toLocaleString()
    );

    setText(
        "todayCoins",
        user.todayCoins
    );

    setText(
        "quizzesCompleted",
        user.quizzesCompleted
    );

    setText(
        "averageScore",
        user.averageScore + "%"
    );

    setText(
        "bestScore",
        user.bestScore + "%"
    );

    setText(
        "questionsSolved",
        user.questionsSolved
    );

    setText(
        "correctAnswers",
        user.correctAnswers
    );

    setText(
        "accuracy",
        user.accuracy + "%"
    );


    const progress =
        Math.min(
            100,
            (
                user.xp /
                user.xpRequired
            ) * 100
        );


    const xpFill =
        document.getElementById(
            "xpFill"
        );


    if (xpFill) {

        setTimeout(
            () => {

                xpFill.style.width =
                    progress + "%";

            },
            300
        );

    }


    updateLevelRoad();

}


function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


function getInitial(name) {

    return (
        name
            ?.trim()
            ?.charAt(0)
            ?.toUpperCase()
        || "N"
    );

}


/* =========================================================
   LEVEL ROAD
   ========================================================= */

function updateLevelRoad() {

    const nodes =
        document.querySelectorAll(
            ".level-node"
        );


    nodes.forEach(
        node => {

            const level =
                parseInt(
                    node.textContent
                );


            node.classList.remove(
                "current",
                "next"
            );


            if (
                level ===
                user.level
            ) {

                node.classList.add(
                    "current"
                );

            }


            if (
                level ===
                user.level + 1
            ) {

                node.classList.add(
                    "next"
                );

            }

        }
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

    const navButtons =
        document.querySelectorAll(
            "[data-target]"
        );


    navButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.target;

                    navigateTo(
                        target
                    );

                }
            );

        }
    );


    const mobileButton =
        document.getElementById(
            "mobileMenuButton"
        );

    const mobileNav =
        document.getElementById(
            "mobileNav"
        );


    mobileButton.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle(
                "open"
            );

        }
    );

}


function navigateTo(target) {

    const section =
        document.getElementById(
            target
        );


    if (!section) return;


    section.scrollIntoView({
        behavior: "smooth"
    });


    document.querySelectorAll(
        ".nav-link"
    ).forEach(
        link => {

            link.classList.toggle(
                "active",
                link.dataset.target ===
                target
            );

        }
    );


    document.getElementById(
        "mobileNav"
    )?.classList.remove(
        "open"
    );

}


/* =========================================================
   PROFILE EDITING
   ========================================================= */

function setupProfile() {

    const editButton =
        document.getElementById(
            "editProfileBtn"
        );

    const modal =
        document.getElementById(
            "profileModal"
        );

    const close =
        document.getElementById(
            "closeProfile"
        );

    const save =
        document.getElementById(
            "saveProfile"
        );


    editButton.addEventListener(
        "click",
        () => {

            document.getElementById(
                "editName"
            ).value =
                user.name;

            document.getElementById(
                "editUsername"
            ).value =
                user.username;

            modal.classList.add(
                "open"
            );

        }
    );


    close.addEventListener(
        "click",
        () => {

            modal.classList.remove(
                "open"
            );

        }
    );


    save.addEventListener(
        "click",
        () => {

            const name =
                document.getElementById(
                    "editName"
                ).value.trim();

            let username =
                document.getElementById(
                    "editUsername"
                ).value.trim();


            if (!name) {

                showToast(
                    "ENTER YOUR NAME"
                );

                return;

            }


            if (!username) {

                username =
                    "@" +
                    name
                        .split(" ")[0]
                        .toLowerCase();

            }


            if (
                !username.startsWith("@")
            ) {

                username =
                    "@" +
                    username;

            }


            user.name =
                name;

            user.username =
                username;

            saveUser();

            updateUserUI();

            modal.classList.remove(
                "open"
            );

            showToast(
                "PROFILE UPDATED"
            );

        }
    );

}


/* =========================================================
   QUIZ DATA
   ========================================================= */

const quizSets = {

    daily: {

        name: "DAILY QUIZ",

        xp: 100,

        questions: [

            {
                question:
                    "Which language is primarily used to structure a web page?",

                options: [
                    "HTML",
                    "Python",
                    "C",
                    "SQL"
                ],

                answer: 0
            },

            {
                question:
                    "Which keyword declares a constant in JavaScript?",

                options: [
                    "let",
                    "var",
                    "const",
                    "fixed"
                ],

                answer: 2
            },

            {
                question:
                    "What does CPU stand for?",

                options: [
                    "Central Processing Unit",
                    "Computer Primary Unit",
                    "Central Program Utility",
                    "Core Processing User"
                ],

                answer: 0
            },

            {
                question:
                    "Which structure follows FIFO?",

                options: [
                    "Stack",
                    "Queue",
                    "Tree",
                    "Graph"
                ],

                answer: 1
            },

            {
                question:
                    "What does AI stand for?",

                options: [
                    "Automated Internet",
                    "Artificial Intelligence",
                    "Advanced Interface",
                    "Application Integration"
                ],

                answer: 1
            }

        ]

    },


    quick: {

        name: "QUICK QUIZ",

        xp: 50,

        questions: [

            {
                question:
                    "Which symbol starts a JavaScript single-line comment?",

                options: [
                    "//",
                    "##",
                    "<!--",
                    "**"
                ],

                answer: 0
            },

            {
                question:
                    "Which HTML tag creates a link?",

                options: [
                    "<link>",
                    "<a>",
                    "<url>",
                    "<href>"
                ],

                answer: 1
            },

            {
                question:
                    "Which is a programming language?",

                options: [
                    "Python",
                    "Chrome",
                    "Windows",
                    "GitHub"
                ],

                answer: 0
            }

        ]

    },


    brain: {

        name: "BRAIN CHALLENGE",

        xp: 100,

        questions: [

            {
                question:
                    "What is the time complexity of binary search?",

                options: [
                    "O(n)",
                    "O(log n)",
                    "O(n²)",
                    "O(1)"
                ],

                answer: 1
            },

            {
                question:
                    "Which data structure uses LIFO?",

                options: [
                    "Queue",
                    "Array",
                    "Stack",
                    "Graph"
                ],

                answer: 2
            },

            {
                question:
                    "Which number is prime?",

                options: [
                    "21",
                    "27",
                    "29",
                    "35"
                ],

                answer: 2
            }

        ]

    },


    coding: {

        name: "CODING QUIZ",

        xp: 150,

        questions: [

            {
                question:
                    "Which loop is commonly used when the number of iterations is known?",

                options: [
                    "for",
                    "switch",
                    "try",
                    "catch"
                ],

                answer: 0
            },

            {
                question:
                    "Which keyword returns a value from a JavaScript function?",

                options: [
                    "send",
                    "return",
                    "output",
                    "give"
                ],

                answer: 1
            },

            {
                question:
                    "Which structure stores key-value pairs in JavaScript?",

                options: [
                    "Object",
                    "Loop",
                    "Function",
                    "String"
                ],

                answer: 0
            }

        ]

    },


    cyber: {

        name: "CYBER CHALLENGE",

        xp: 150,

        questions: [

            {
                question:
                    "What does HTTPS provide compared with HTTP?",

                options: [
                    "Encryption",
                    "More storage",
                    "Faster CPU",
                    "Extra RAM"
                ],

                answer: 0
            },

            {
                question:
                    "What is phishing?",

                options: [
                    "A social engineering attack",
                    "A programming language",
                    "A database",
                    "A firewall"
                ],

                answer: 0
            },

            {
                question:
                    "Which is commonly used to identify a device on a network?",

                options: [
                    "IP address",
                    "HTML",
                    "CPU",
                    "CSS"
                ],

                answer: 0
            }

        ]

    },


    ai: {

        name: "AI CHALLENGE",

        xp: 150,

        questions: [

            {
                question:
                    "What does ML stand for?",

                options: [
                    "Machine Learning",
                    "Modern Logic",
                    "Memory Language",
                    "Machine Link"
                ],

                answer: 0
            },

            {
                question:
                    "Which is commonly used for AI/ML programming?",

                options: [
                    "Python",
                    "HTML",
                    "CSS",
                    "XML"
                ],

                answer: 0
            },

            {
                question:
                    "What is training data used for?",

                options: [
                    "Teaching a model patterns",
                    "Increasing monitor size",
                    "Installing RAM",
                    "Creating passwords"
                ],

                answer: 0
            }

        ]

    }

};


/* =========================================================
   QUIZ STATE
   ========================================================= */

let currentQuiz = null;

let currentQuestion = 0;

let selectedAnswer = null;

let quizCorrect = 0;


/* =========================================================
   QUIZ SYSTEM
   ========================================================= */

function setupQuizSystem() {

    document
        .querySelectorAll(
            "[data-quiz]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        startQuiz(
                            button.dataset.quiz
                        );

                    }
                );

            }
        );


    document
        .getElementById(
            "nextQuestion"
        )
        .addEventListener(
            "click",
            nextQuizQuestion
        );


    document
        .getElementById(
            "closeQuiz"
        )
        .addEventListener(
            "click",
            closeQuiz
        );


    document
        .getElementById(
            "closeResult"
        )
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "resultModal"
                    )
                    .classList.remove(
                        "open"
                    );

            }
        );

}


function startQuiz(type) {

    let selectedSet =
        quizSets[type];


    if (!selectedSet) {

        selectedSet =
            quizSets.daily;

    }


    currentQuiz =
        selectedSet;

    currentQuestion = 0;

    selectedAnswer = null;

    quizCorrect = 0;


    document
        .getElementById(
            "quizModal"
        )
        .classList.add(
            "open"
        );


    loadQuizQuestion();

}


function loadQuizQuestion() {

    const question =
        currentQuiz.questions[
            currentQuestion
        ];


    selectedAnswer = null;


    document
        .getElementById(
            "quizCategory"
        )
        .textContent =
        currentQuiz.name;


    document
        .getElementById(
            "quizProgress"
        )
        .textContent =
        `${String(currentQuestion + 1).padStart(2,"0")} / ${String(currentQuiz.questions.length).padStart(2,"0")}`;


    document
        .getElementById(
            "quizQuestionNumber"
        )
        .textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2,"0")}`;


    document
        .getElementById(
            "quizQuestion"
        )
        .textContent =
        question.question;


    document
        .getElementById(
            "quizXpReward"
        )
        .textContent =
        `+${currentQuiz.xp} XP`;


    const options =
        document.getElementById(
            "quizOptions"
        );


    options.innerHTML = "";


    question.options.forEach(
        (option,index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "quiz-option";

            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    selectQuizAnswer(
                        index,
                        button
                    );

                }
            );


            options.appendChild(
                button
            );

        }
    );


    document
        .getElementById(
            "nextQuestion"
        )
        .disabled =
        true;

}


function selectQuizAnswer(
    index,
    button
) {

    selectedAnswer =
        index;


    document
        .querySelectorAll(
            ".quiz-option"
        )
        .forEach(
            option => {

                option.classList.remove(
                    "selected"
                );

            }
        );


    button.classList.add(
        "selected"
    );


    document
        .getElementById(
            "nextQuestion"
        )
        .disabled =
        false;

}


function nextQuizQuestion() {

    if (
        selectedAnswer === null
    ) return;


    const question =
        currentQuiz.questions[
            currentQuestion
        ];


    if (
        selectedAnswer ===
        question.answer
    ) {

        quizCorrect++;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        currentQuiz.questions.length
    ) {

        finishQuiz();

    } else {

        loadQuizQuestion();

    }

}


function finishQuiz() {

    const total =
        currentQuiz.questions.length;


    const percentage =
        Math.round(
            (
                quizCorrect /
                total
            ) * 100
        );


    let earnedXp =
        Math.round(
            currentQuiz.xp *
            (
                percentage /
                100
            )
        );


    if (
        percentage >= 80
    ) {

        earnedXp =
            Math.max(
                earnedXp,
                Math.round(
                    currentQuiz.xp *
                    .8
                )
            );

    }


    user.xp += earnedXp;
    user.quizXp = (user.quizXp || 0) + earnedXp;

    user.coins +=
        Math.round(
            earnedXp / 5
        );

    user.todayCoins +=
        Math.round(
            earnedXp / 5
        );

    user.quizzesCompleted++;

    user.questionsSolved +=
        total;

    user.correctAnswers +=
        quizCorrect;


    user.accuracy =
        Math.round(
            (
                user.correctAnswers /
                user.questionsSolved
            ) * 100
        );


    user.averageScore =
        Math.round(
            (
                user.averageScore +
                percentage
            ) / 2
        );


    if (
        percentage >
        user.bestScore
    ) {

        user.bestScore =
            percentage;

    }


    levelCheck();

    saveUser();

    updateUserUI();

    checkAchievements();


    document
        .getElementById(
            "quizModal"
        )
        .classList.remove(
            "open"
        );


    document
        .getElementById(
            "resultScore"
        )
        .textContent =
        percentage + "%";


    document
        .getElementById(
            "resultCorrect"
        )
        .textContent =
        quizCorrect;


    document
        .getElementById(
            "resultQuestions"
        )
        .textContent =
        total;


    document
        .getElementById(
            "resultXp"
        )
        .textContent =
        "+" + earnedXp;


    document
        .getElementById(
            "resultText"
        )
        .textContent =
        getResultMessage(
            percentage
        );


    document
        .getElementById(
            "resultModal"
        )
        .classList.add(
            "open"
        );

}


function closeQuiz() {

    document
        .getElementById(
            "quizModal"
        )
        .classList.remove(
            "open"
        );

}


/* =========================================================
   LEVEL SYSTEM
   ========================================================= */

function levelCheck() {

    let levelUp =
        false;


    while (
        user.xp >=
        user.xpRequired
    ) {

        user.xp -=
            user.xpRequired;

        user.level++;

        user.xpRequired = 500;

        levelUp =
            true;

    }


    if (levelUp) {

        showToast(
            `LEVEL UP — LEVEL ${user.level}`
        );

        document.body.animate(
            [
                {
                    filter:
                        "brightness(1)"
                },
                {
                    filter:
                        "brightness(1.8)"
                },
                {
                    filter:
                        "brightness(1)"
                }
            ],
            {
                duration: 900
            }
        );

    }

}


/* =========================================================
   QUIZ MESSAGE
   ========================================================= */

function getResultMessage(
    percentage
) {

    if (
        percentage === 100
    ) {

        return "PERFECT RUN. YOUR KNOWLEDGE IS SHARP.";

    }

    if (
        percentage >= 80
    ) {

        return "EXCELLENT WORK. KEEP PUSHING YOUR LEVEL.";

    }

    if (
        percentage >= 60
    ) {

        return "GOOD PROGRESS. ONE MORE RUN CAN MAKE IT BETTER.";

    }

    return "KEEP LEARNING. EVERY ATTEMPT BUILDS YOUR SKILL.";

}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function checkAchievements() {

    unlock(
        "quiz",
        user.quizzesCompleted >= 1
    );

    unlock(
        "streak",
        user.streak >= 7
    );

    unlock(
        "tenquiz",
        user.quizzesCompleted >= 10
    );

    unlock(
        "project",
        user.projects >= 1
    );

    unlock(
        "builder",
        user.projects >= 4
    );

    unlock(
        "level10",
        user.level >= 10
    );

}


function unlock(
    id,
    condition
) {

    const card =
        document.querySelector(
            `[data-achievement="${id}"]`
        );


    if (!card) return;


    if (condition) {

        card.classList.add(
            "unlocked"
        );

    } else {

        card.classList.remove(
            "unlocked"
        );

    }

}


/* =========================================================
   AI DEMO
   ========================================================= */

function setupAI() {

    document
        .querySelectorAll(
            ".ai-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const action =
                            button.dataset.ai;

                        handleAI(
                            action
                        );

                    }
                );

            }
        );

}


function handleAI(action) {

    const response =
        document.getElementById(
            "aiResponse"
        );


    const responses = {

        "ASK NEXORA AI":
            "NEXORA AI: Ask me any learning question and I will help you break it down step by step.",

        "GET STUDY HELP":
            "NEXORA AI: Start with your weakest topic, study for 25 minutes, then test yourself with a short quiz.",

        "EXPLAIN THIS":
            "NEXORA AI: Select a topic or paste the concept you are struggling with. I can explain it using beginner-friendly examples.",

        "DEBUG MY CODE":
            "NEXORA AI: Paste your code and the error message. We can trace the problem together."
    };


    response.textContent =
        responses[action] ||
        "NEXORA AI IS READY.";


    response.animate(
        [
            {
                opacity: 0
            },
            {
                opacity: 1
            }
        ],
        {
            duration: 400
        }
    );

}


/* =========================================================
   BUTTONS
   ========================================================= */

function setupButtons() {

    document
        .getElementById(
            "logoutBtn"
        )
        .addEventListener(
            "click",
            () => {

                showToast(
                    "LOGGING OUT..."
                );

                setTimeout(
                    () => {
                        if (window.nexoraLogout) {
                            window.nexoraLogout();
                        } else {
                            window.location.href = "login.html";
                        }
                    },
                    800
                );

            }
        );


    document
        .getElementById(
            "notificationBtn"
        )
        .addEventListener(
            "click",
            () => {

                showToast(
                    "NO NEW SYSTEM ALERTS"
                );

            }
        );


    document
        .getElementById(
            "settingsBtn"
        )
        .addEventListener(
            "click",
            () => {

                showToast(
                    "SETTINGS MODULE READY"
                );

            }
        );


    document
        .getElementById(
            "profileNavBtn"
        )
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "profileModal"
                    )
                    .classList.add(
                        "open"
                    );

            }
        );


    document
        .getElementById(
            "newProjectBtn"
        )
        .addEventListener(
            "click",
            () => {

                showToast(
                    "PROJECT CREATOR READY"
                );

            }
        );


    document
        .querySelectorAll(
            "[data-learning]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        showToast(
                            `${button.dataset.learning.toUpperCase()} MODULE OPENING`
                        );

                    }
                );

            }
        );

}


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function setupRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: .08
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   KEYBOARD ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            document
                .querySelectorAll(
                    ".modal-overlay.open"
                )
                .forEach(
                    modal => {

                        modal.classList.remove(
                            "open"
                        );

                    }
                );

        }

    }
);


/* =========================================================
   SYSTEM READY
   ========================================================= */

console.log(
    "%c NEXORA STUDENT SYSTEM ONLINE ",
    "background:#fff;color:#000;padding:8px 15px;font-weight:bold;"
);