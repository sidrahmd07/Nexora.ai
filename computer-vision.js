/* =========================================================
   NEXORA - COMPUTER VISION BASICS
   CLEAN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   WAIT UNTIL HTML IS FULLY LOADED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       GET HTML ELEMENTS SAFELY
    ===================================================== */

    const cursorGlow =
        document.querySelector(".cursor-glow");

    const xpValue =
        document.getElementById("xpValue");

    const novaXP =
        document.getElementById("novaXP");

    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");

    const novaDialogue =
        document.getElementById("novaDialogue");

    const startMissionBtn =
        document.getElementById("startMissionBtn");

    const askNovaBtn =
        document.getElementById("askNovaBtn");

    const hintBtn =
        document.getElementById("hintBtn");

    const nextMissionBtn =
        document.getElementById("nextMissionBtn");

    const unlockText =
        document.getElementById("unlockText");

    const nextIcon =
        document.querySelector(".next-icon i");

    const cards =
        document.querySelectorAll(".learning-card");


    /* =====================================================
       COMPUTER VISION STAGES
    ===================================================== */

    const stages = [
        "notes",
        "videos",
        "quiz",
        "practice",
        "challenge"
    ];


    const stageXP = {
        notes: 20,
        videos: 20,
        quiz: 30,
        practice: 30,
        challenge: 50
    };


    /* =====================================================
       LOAD SAVED DATA
    ===================================================== */

    let playerXP = 0;

    let completedStages = [];


    try {

        playerXP =
            Number(
                localStorage.getItem(
                    "nexoraComputerVisionXP"
                )
            ) || 0;


        const savedStages =
            localStorage.getItem(
                "nexoraComputerVisionStages"
            );


        if (savedStages) {

            const parsed =
                JSON.parse(savedStages);


            if (Array.isArray(parsed)) {

                completedStages =
                    parsed.filter(function (stage) {

                        return stages.includes(stage);

                    });

            }

        }

    } catch (error) {

        console.warn(
            "Could not load saved progress:",
            error
        );

        playerXP = 0;

        completedStages = [];

    }


    /* =====================================================
       SAVE DATA
    ===================================================== */

    function saveProgress() {

        try {

            localStorage.setItem(
                "nexoraComputerVisionXP",
                String(playerXP)
            );


            localStorage.setItem(
                "nexoraComputerVisionStages",
                JSON.stringify(completedStages)
            );

        } catch (error) {

            console.warn(
                "Could not save progress:",
                error
            );

        }

    }


    /* =====================================================
       UPDATE XP
    ===================================================== */

    function updateXP() {

        if (xpValue) {

            xpValue.textContent =
                playerXP + " XP";

        }


        if (novaXP) {

            novaXP.textContent =
                playerXP;

        }

    }


    /* =====================================================
       UPDATE PROGRESS
    ===================================================== */

    function updateProgress() {

        const total =
            stages.length;

        const completed =
            completedStages.length;


        let percentage = 0;


        if (total > 0) {

            percentage =
                Math.round(
                    (completed / total) * 100
                );

        }


        if (progressText) {

            progressText.textContent =
                percentage + "%";

        }


        if (progressFill) {

            progressFill.style.width =
                percentage + "%";

        }


        updateNextMission();

    }


    /* =====================================================
       NOVA MESSAGE
    ===================================================== */

    function showNovaMessage(message) {

        if (!novaDialogue) {

            return;

        }


        novaDialogue.style.opacity = "0";


        setTimeout(function () {

            novaDialogue.textContent =
                message;

            novaDialogue.style.opacity = "1";

        }, 150);

    }


    /* =====================================================
       COMPLETE STAGE
    ===================================================== */

    function completeStage(stage) {

        if (!stageXP[stage]) {

            return;

        }


        if (
            completedStages.includes(stage)
        ) {

            showNovaMessage(
                "You already completed this mission. Keep going! 😎"
            );

            return;

        }


        completedStages.push(stage);


        playerXP +=
            stageXP[stage];


        saveProgress();

        updateXP();

        updateProgress();


        const messages = {

            notes:
                "Nice! 📚 You completed the Computer Vision notes. Now let's see visual AI in action!",

            videos:
                "Great job! 🎥 The Computer Vision lesson is complete.",

            quiz:
                "Quiz completed! 🧠 Your Computer Vision knowledge is getting stronger.",

            practice:
                "Practice mission complete! 💻 Now you're actually working with Computer Vision.",

            challenge:
                "CHALLENGE DEFEATED! 🎮🔥 You completed the final Computer Vision challenge!"

        };


        showNovaMessage(
            messages[stage] ||
            "Mission completed! Great work!"
        );


        if (
            completedStages.length ===
            stages.length
        ) {

            setTimeout(function () {

                missionComplete();

            }, 500);

        }

    }


    /* =====================================================
       MISSION COMPLETE
    ===================================================== */

    function missionComplete() {

        showNovaMessage(
            "🏆 MISSION COMPLETE! You finished Computer Vision Basics. NOVA is proud of you! 🔥"
        );


        if (unlockText) {

            unlockText.textContent =
                "Mission complete! Your next Computer Vision mission is unlocked.";

        }


        if (nextIcon) {

            nextIcon.className =
                "fa-solid fa-lock-open";

        }


        if (nextMissionBtn) {

            nextMissionBtn.disabled =
                false;

            nextMissionBtn.innerHTML =
                'Continue <i class="fa-solid fa-arrow-right"></i>';

        }

    }


    /* =====================================================
       NEXT MISSION STATUS
    ===================================================== */

    function updateNextMission() {

        if (!nextMissionBtn) {

            return;

        }


        if (
            completedStages.length >=
            stages.length
        ) {

            nextMissionBtn.disabled =
                false;

        } else {

            nextMissionBtn.disabled =
                true;

        }

    }


    /* =====================================================
       START MISSION BUTTON
    ===================================================== */

    if (startMissionBtn) {

        startMissionBtn.addEventListener(
            "click",
            function () {

                showNovaMessage(
                    "Mission started! 🚀 Let's learn Computer Vision from the beginning."
                );


                const missionSection =
                    document.getElementById("mission");


                if (missionSection) {

                    setTimeout(function () {

                        missionSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 300);

                }

            }
        );

    }


    /* =====================================================
       ASK NOVA BUTTON
    ===================================================== */

    if (askNovaBtn) {

        askNovaBtn.addEventListener(
            "click",
            function () {

                const messages = [

                    "Hey! 👋 I'm NOVA. Don't worry, we'll learn Computer Vision step by step.",

                    "Computer Vision teaches machines how to understand images and video. Pretty cool, right? 😎",

                    "Don't try to memorize everything. Understand the idea first, then practice it.",

                    "Every Computer Vision expert started somewhere. Your mission starts here! 🚀",

                    "When you're stuck, break the problem into smaller visual steps."

                ];


                const randomIndex =
                    Math.floor(
                        Math.random() *
                        messages.length
                    );


                showNovaMessage(
                    messages[randomIndex]
                );

            }
        );

    }


    /* =====================================================
       HINT BUTTON
    ===================================================== */

    if (hintBtn) {

        hintBtn.addEventListener(
            "click",
            function () {

                showNovaMessage(
                    "💡 Hint: Complete the missions in order. Start with Notes, then Videos, Quiz, Practice, and finally the Challenge."
                );

            }
        );

    }


    /* =====================================================
       LEARNING CARD BUTTONS
    ===================================================== */

    /* Lets computer-vision-lessons.js finish a stage. */
    window.nexoraCompleteStage = completeStage;

    const cardButtons =
        document.querySelectorAll(".card-btn");


    cardButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const stage =
                    button.dataset.stage;


                if (!stage) {
                    /* Each button opens its own lesson (computer-vision-lessons.js). */
                    return;
                }


                completeStage(stage);

            }
        );

    });


    /* =====================================================
       NEXT MISSION BUTTON
    ===================================================== */

    if (nextMissionBtn) {

        nextMissionBtn.addEventListener(
            "click",
            function () {

                if (
                    completedStages.length <
                    stages.length
                ) {

                    showNovaMessage(
                        "🔒 Complete all Computer Vision missions first!"
                    );

                    return;

                }


                showNovaMessage(
                    "🚀 Next mission unlocked! Object Detection is next."
                );


                setTimeout(function () {

                    alert(
                        "NEXT COMPUTER VISION MISSION\n\nObject Detection\n\nThis mission can be connected to your next HTML page."
                    );

                }, 300);

            }
        );

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (cursorGlow) {

        document.addEventListener(
            "mousemove",
            function (event) {

                cursorGlow.style.left =
                    event.clientX + "px";

                cursorGlow.style.top =
                    event.clientY + "px";

            }
        );

    }


    /* =====================================================
       CARD ANIMATION
    ===================================================== */

    if (cards.length > 0) {

        const cardObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show-card"
                                );

                                cardObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        cards.forEach(
            function (card, index) {

                card.style.transitionDelay =
                    (index * 0.08) + "s";


                cardObserver.observe(card);

            }
        );

    }


    /* =====================================================
       CARD 3D HOVER
    ===================================================== */

    cards.forEach(function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 3;


                card.style.transform =
                    "perspective(700px) " +
                    "rotateX(" +
                    rotateX +
                    "deg) " +
                    "rotateY(" +
                    rotateY +
                    "deg) " +
                    "translateY(-8px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       RESET FUNCTION
       
       You can use this from the browser console:
       
       resetComputerVisionProgress();
    ===================================================== */

    window.resetComputerVisionProgress =
        function () {

            const confirmed =
                window.confirm(
                    "Reset all Computer Vision progress?"
                );


            if (!confirmed) {

                return;

            }


            try {

                localStorage.removeItem(
                    "nexoraComputerVisionXP"
                );


                localStorage.removeItem(
                    "nexoraComputerVisionStages"
                );

            } catch (error) {

                console.warn(
                    "Could not reset progress:",
                    error
                );

            }


            playerXP = 0;

            completedStages = [];


            updateXP();

            updateProgress();


            showNovaMessage(
                "Progress reset. 🚀 Let's start Computer Vision again!"
            );

        };


    /* =====================================================
       INITIALIZE PAGE
    ===================================================== */

    updateXP();

    updateProgress();

});