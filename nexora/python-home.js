/* =========================================================
   NEXORA PYTHON ACADEMY
   MASTER ROADMAP SYSTEM
========================================================= */


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


document.addEventListener(
    "mousemove",
    (event) => {

        if (!cursorGlow) return;

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);


/* =========================================================
   PYTHON LEVEL DATA
========================================================= */

const pythonLevels = [

    {
        level: 1,
        name: "Python Basics",
        description:
            "Learn Python fundamentals from zero and write your first programs.",
        xp: 150,
        modules: 10,
        page: "python.html"
    },

    {
        level: 2,
        name: "Control Flow",
        description:
            "Master conditions, loops, decisions and program flow.",
        xp: 200,
        modules: 8,
        page: "python-control-flow.html"
    },

    {
        level: 3,
        name: "Data Structures",
        description:
            "Learn lists, tuples, sets, dictionaries and collections.",
        xp: 250,
        modules: 10,
        page: "python-data-structures.html"
    },

    {
        level: 4,
        name: "Functions",
        description:
            "Build reusable functions, parameters, return values and scope.",
        xp: 250,
        modules: 9,
        page: "python-functions.html"
    },

    {
        level: 5,
        name: "Object Oriented Python",
        description:
            "Understand classes, objects, inheritance and polymorphism.",
        xp: 300,
        modules: 8,
        page: "python-oop.html"
    },

    {
        level: 6,
        name: "Files & Exceptions",
        description:
            "Read files, write files and handle Python errors properly.",
        xp: 250,
        modules: 7,
        page: "python-files.html"
    },

    {
        level: 7,
        name: "Modules & Libraries",
        description:
            "Learn modules, packages, pip and useful Python libraries.",
        xp: 250,
        modules: 7,
        page: "python-modules.html"
    },

    {
        level: 8,
        name: "Advanced Python",
        description:
            "Explore generators, decorators, iterators, APIs and advanced concepts.",
        xp: 350,
        modules: 8,
        page: "python-advanced.html"
    },

    {
        level: 9,
        name: "Problem Solving",
        description:
            "Improve logic, coding skills and real Python problem solving.",
        xp: 400,
        modules: 12,
        page: "python-problems.html"
    },

    {
        level: 10,
        name: "Python Projects",
        description:
            "Build real-world Python applications and complete your journey.",
        xp: 500,
        modules: 10,
        page: "python-projects.html"
    }

];


/* =========================================================
   STORAGE KEYS
========================================================= */

/*
   NEW VERSIONED KEY

   This prevents old roadmap data from interfering
   with the new Python Academy.

   0 = Basics not completed
   1 = Basics completed
   2 = Control Flow completed
   ...
*/

const ROADMAP_PROGRESS_KEY =
    "nexoraPythonRoadmapV2CompletedLevel";


const PYTHON_XP_KEY =
    "nexoraPythonXP";


const PYTHON_STREAK_KEY =
    "nexoraPythonStreak";


const PYTHON_LAST_VISIT_KEY =
    "nexoraPythonLastVisit";


/* =========================================================
   SAFE NUMBER
========================================================= */

function getStoredNumber(
    key,
    defaultValue = 0
){

    const value =
        Number(
            localStorage.getItem(key)
        );


    if(
        Number.isFinite(value) &&
        value >= 0
    ){

        return value;

    }


    return defaultValue;

}


/* =========================================================
   GET COMPLETED LEVELS
========================================================= */

function getCompletedLevels(){

    const saved =
        Number(
            localStorage.getItem(
                ROADMAP_PROGRESS_KEY
            )
        );


    if(
        Number.isFinite(saved) &&
        saved >= 0
    ){

        return Math.min(
            Math.floor(saved),
            pythonLevels.length
        );

    }


    /*
       BRAND NEW PYTHON ACADEMY

       Level 01 starts fresh.
    */

    return 0;

}


/* =========================================================
   SAVE COMPLETED LEVEL
========================================================= */

function saveCompletedLevel(level){

    const safeLevel =
        Math.max(
            0,
            Math.min(
                Math.floor(level),
                pythonLevels.length
            )
        );


    localStorage.setItem(
        ROADMAP_PROGRESS_KEY,
        safeLevel
    );


    updatePythonAcademy();

}


/* =========================================================
   CURRENT LEVEL
========================================================= */

function getCurrentLevel(){

    const completed =
        getCompletedLevels();


    if(
        completed >=
        pythonLevels.length
    ){

        return pythonLevels.length;

    }


    return completed + 1;

}


/* =========================================================
   COURSE PERCENTAGE
========================================================= */

function getCoursePercentage(){

    const completed =
        getCompletedLevels();


    return Math.round(
        (
            completed /
            pythonLevels.length
        ) * 100
    );

}


/* =========================================================
   PLAYER XP
========================================================= */

function getPlayerXP(){

    return getStoredNumber(
        PYTHON_XP_KEY,
        0
    );

}


/* =========================================================
   PLAYER LEVEL
========================================================= */

function calculatePlayerLevel(xp){

    return (
        Math.floor(
            xp / 250
        ) + 1
    );

}


/* =========================================================
   SYNC OLD XP ONLY
========================================================= */

function syncOldXP(){

    /*
       We keep your old XP.

       We do NOT use old stage progress
       to unlock roadmap levels.
    */

    const oldXP =
        getStoredNumber(
            "nexoraPythonXP",
            0
        );


    const currentXP =
        getStoredNumber(
            PYTHON_XP_KEY,
            0
        );


    if(
        oldXP > currentXP
    ){

        localStorage.setItem(
            PYTHON_XP_KEY,
            oldXP
        );

    }

}


/* =========================================================
   UPDATE HUD
========================================================= */

function updateHUD(){

    const xpDisplay =
        document.getElementById(
            "xpDisplay"
        );


    const streakDisplay =
        document.getElementById(
            "streakDisplay"
        );


    const levelDisplay =
        document.getElementById(
            "levelDisplay"
        );


    const xp =
        getPlayerXP();


    const playerLevel =
        calculatePlayerLevel(
            xp
        );


    const streak =
        getStoredNumber(
            PYTHON_STREAK_KEY,
            0
        );


    if(xpDisplay){

        xpDisplay.textContent =
            `${xp} XP`;

    }


    if(streakDisplay){

        streakDisplay.textContent =
            streak;

    }


    if(levelDisplay){

        levelDisplay.textContent =
            String(
                playerLevel
            ).padStart(
                2,
                "0"
            );

    }

}


/* =========================================================
   UPDATE HERO STATS
========================================================= */

function updateHeroStats(){

    const completedElement =
        document.getElementById(
            "completedLevels"
        );


    const totalElement =
        document.getElementById(
            "totalLevels"
        );


    const percentageElement =
        document.getElementById(
            "overallPercent"
        );


    const completed =
        getCompletedLevels();


    const percentage =
        getCoursePercentage();


    if(completedElement){

        completedElement.textContent =
            completed;

    }


    if(totalElement){

        totalElement.textContent =
            pythonLevels.length;

    }


    if(percentageElement){

        percentageElement.textContent =
            `${percentage}%`;

    }

}


/* =========================================================
   UPDATE ROADMAP PROGRESS
========================================================= */

function updateRoadmapProgress(){

    const fill =
        document.getElementById(
            "roadmapFill"
        );


    const percent =
        document.getElementById(
            "roadmapPercent"
        );


    const percentage =
        getCoursePercentage();


    if(fill){

        fill.style.width =
            `${percentage}%`;

    }


    if(percent){

        percent.textContent =
            `${percentage}%`;

    }

}


/* =========================================================
   UPDATE CURRENT POSITION
========================================================= */

function updateCurrentPosition(){

    const currentName =
        document.getElementById(
            "currentLevelName"
        );


    const currentDescription =
        document.getElementById(
            "currentLevelDescription"
        );


    const nextTarget =
        document.getElementById(
            "nextTarget"
        );


    const nextTargetDescription =
        document.getElementById(
            "nextTargetDescription"
        );


    const statusButton =
        document.querySelector(
            ".continue-small"
        );


    const nextButton =
        document.querySelector(
            ".next-card .primary-btn"
        );


    const current =
        getCurrentLevel();


    const data =
        pythonLevels[
            current - 1
        ];


    if(!data) return;


    /*
       CURRENT POSITION
    */

    if(currentName){

        currentName.textContent =
            `Level ${data.level} — ${data.name}`;

    }


    if(currentDescription){

        currentDescription.textContent =
            data.description;

    }


    /*
       NEXT TARGET
    */

    if(nextTarget){

        nextTarget.textContent =
            `Level ${data.level} — ${data.name}`;

    }


    if(nextTargetDescription){

        if(current === 1){

            nextTargetDescription.textContent =
                "Start Python Basics and begin your Python journey.";

        }
        else if(
            current <=
            pythonLevels.length
        ){

            nextTargetDescription.textContent =
                `Complete Level ${current - 1} to unlock this level.`;

        }

    }


    /*
       CURRENT POSITION BUTTON
    */

    if(statusButton){

        statusButton.innerHTML = `
            ${current === 1 ? "Start Level" : "Enter Level"}
            <i class="fa-solid fa-chevron-right"></i>
        `;

    }


    /*
       NEXT TARGET BUTTON
    */

    if(nextButton){

        nextButton.innerHTML = `
            ${current === 1 ? "Start" : "Continue"}
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }

}


/* =========================================================
   UPDATE LEVEL CARDS
========================================================= */

function updateLevelCards(){

    const completed =
        getCompletedLevels();


    const current =
        getCurrentLevel();


    const cards =
        document.querySelectorAll(
            ".level-card"
        );


    cards.forEach(
        (card) => {

            const level =
                Number(
                    card.dataset.level
                );


            const state =
                card.querySelector(
                    ".level-state"
                );


            const button =
                card.querySelector(
                    ".level-btn"
                );


            card.classList.remove(
                "completed",
                "current",
                "locked"
            );


            /* =====================================
               COMPLETED LEVEL
            ===================================== */

            if(
                level <= completed
            ){

                card.classList.add(
                    "completed"
                );


                if(state){

                    state.textContent =
                        "✓ COMPLETED";

                }


                if(button){

                    button.disabled =
                        false;


                    button.innerHTML = `
                        Review Level
                        <i class="fa-solid fa-rotate-left"></i>
                    `;


                    button.onclick = () => {

                        openPythonLevel(
                            level
                        );

                    };

                }

            }


            /* =====================================
               CURRENT LEVEL
            ===================================== */

            else if(
                level === current
            ){

                card.classList.add(
                    "current"
                );


                if(state){

                    state.textContent =
                        "● CURRENT";

                }


                if(button){

                    button.disabled =
                        false;


                    button.innerHTML = `
                        ${level === 1 ? "Start Level" : "Enter Level"}
                        <i class="fa-solid fa-arrow-right"></i>
                    `;


                    button.onclick = () => {

                        openPythonLevel(
                            level
                        );

                    };

                }

            }


            /* =====================================
               LOCKED LEVEL
            ===================================== */

            else{

                card.classList.add(
                    "locked"
                );


                if(state){

                    state.textContent =
                        "🔒 LOCKED";

                }


                if(button){

                    button.disabled =
                        true;


                    button.innerHTML = `
                        Locked
                        <i class="fa-solid fa-lock"></i>
                    `;


                    button.onclick =
                        null;

                }

            }

        }
    );

}


/* =========================================================
   OPEN LEVEL
========================================================= */

function openPythonLevel(level){

    const data =
        pythonLevels[
            level - 1
        ];


    if(!data) return;


    const completed =
        getCompletedLevels();


    /*
       Cannot skip levels.
    */

    if(
        level >
        completed + 1
    ){

        showLockedMessage(
            level
        );

        return;

    }


    /*
       LEVEL 01
    */

    if(level === 1){

        document.body.classList.add(
            "page-transition"
        );


        setTimeout(
            () => {

                window.location.href =
                    "python.html";

            },
            700
        );


        return;

    }


    /*
       Future levels

       These will become real pages
       when we build them.
    */

    showComingSoonMessage(
        data
    );

}


/* =========================================================
   CONTINUE
========================================================= */

function continuePython(){

    const current =
        getCurrentLevel();


    openPythonLevel(
        current
    );

}


/* =========================================================
   BACK TO AIML
========================================================= */

function goBackToAIML(){

    window.location.href =
        "aiml.html";

}


/* =========================================================
   BACK TO NEXORA
========================================================= */

function goBackToNexora(){

    window.location.href =
        "index.html";

}


/* =========================================================
   SCROLL TO ROADMAP
========================================================= */

function scrollToRoadmap(){

    const roadmap =
        document.getElementById(
            "pythonRoadmap"
        );


    if(!roadmap) return;


    roadmap.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}


/* =========================================================
   LOCKED MESSAGE
========================================================= */

function showLockedMessage(level){

    const data =
        pythonLevels[
            level - 1
        ];


    if(!data) return;


    showNotification(

        "fa-solid fa-lock",

        "Level Locked",

        `Complete the previous level to unlock ${data.name}.`

    );

}


/* =========================================================
   COMING SOON MESSAGE
========================================================= */

function showComingSoonMessage(data){

    if(!data) return;


    showNotification(

        "fa-solid fa-hammer",

        data.name,

        "This level will be built next."

    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

function showNotification(
    icon,
    title,
    message
){

    let notification =
        document.querySelector(
            ".python-lock-message"
        );


    if(!notification){

        notification =
            document.createElement(
                "div"
            );


        notification.className =
            "python-lock-message";


        document.body.appendChild(
            notification
        );

    }


    notification.innerHTML = `

        <i class="${icon}"></i>

        <div>

            <strong>
                ${title}
            </strong>

            <span>
                ${message}
            </span>

        </div>

    `;


    notification.classList.remove(
        "show"
    );


    requestAnimationFrame(
        () => {

            notification.classList.add(
                "show"
            );

        }
    );


    clearTimeout(
        notification.hideTimer
    );


    notification.hideTimer =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   DAILY STREAK
========================================================= */

function updateStreak(){

    const today =
        new Date().toDateString();


    const lastVisit =
        localStorage.getItem(
            PYTHON_LAST_VISIT_KEY
        );


    let streak =
        getStoredNumber(
            PYTHON_STREAK_KEY,
            0
        );


    if(!lastVisit){

        streak = 1;

    }
    else if(
        lastVisit !== today
    ){

        const previous =
            new Date(
                lastVisit
            );


        const current =
            new Date(
                today
            );


        const difference =
            Math.floor(
                (
                    current -
                    previous
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if(
            difference === 1
        ){

            streak++;

        }
        else{

            streak = 1;

        }

    }


    localStorage.setItem(
        PYTHON_STREAK_KEY,
        streak
    );


    localStorage.setItem(
        PYTHON_LAST_VISIT_KEY,
        today
    );

}


/* =========================================================
   CARD ANIMATION
========================================================= */

function animateLevelCards(){

    const cards =
        document.querySelectorAll(
            ".level-card"
        );


    cards.forEach(
        (card,index) => {

            card.style.opacity =
                "0";


            card.style.transform =
                "translateY(25px)";


            setTimeout(
                () => {

                    card.style.transition =
                        "opacity .55s ease, transform .55s ease";


                    card.style.opacity =
                        "1";


                    card.style.transform =
                        "translateY(0)";

                },
                index * 80
            );

        }
    );

}


/* =========================================================
   UPDATE EVERYTHING
========================================================= */

function updatePythonAcademy(){

    syncOldXP();

    updateHUD();

    updateHeroStats();

    updateRoadmapProgress();

    updateCurrentPosition();

    updateLevelCards();

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateStreak();

        updatePythonAcademy();

        animateLevelCards();

    }
);


/* =========================================================
   LIVE STORAGE SYNC
========================================================= */

window.addEventListener(
    "storage",
    () => {

        updatePythonAcademy();

    }
);