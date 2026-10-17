/* =========================================================
   NEXORA — MAIN JAVASCRIPT
   Firebase + Navigation + Animations
========================================================= */


/* =========================================================
   FIREBASE
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyA3TEbBax-ynl5PNSrOo90jmVcVR2SHNrg",
    authDomain: "nexora-40249.firebaseapp.com",
    projectId: "nexora-40249",
    storageBucket: "nexora-40249.firebasestorage.app",
    messagingSenderId: "296414066166",
    appId: "1:296414066166:web:baa9a4806a220813ef03d7"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


/* =========================================================
   DOM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader =
        document.getElementById("loader");

    const mainContent =
        document.getElementById("mainContent");

    const joinButton =
        document.getElementById("joinNexoraBtn");

    const logoutButton =
        document.getElementById("logoutBtn");

    /*
       Dashboard is NO LONGER USED.
    */

    const dashboardButton =
        document.getElementById("dashboardBtn");


    const sections = [
        "home",
        "about",
        "features",
        "team",
        "contact"
    ];


    const navLinks =
        document.querySelectorAll(
            ".navbar a[data-page]"
        );
// =========================================================
// NEXORA TEAM POPUP
// =========================================================

const teamProfiles = {

    founder: {
        name: "Sidrah Mohamed",
        role: "FOUNDER & CEO",
        description:
            "Leading the vision, product development and future direction of the Nexora student ecosystem.",
        image: "images/founder.jpg",
        initial: "NX"
    },

    cyber: {
        name: "Indu",
        role: "CYBERSECURITY LEAD",
        description:
            "Leading cybersecurity initiatives focused on security awareness, ethical hacking and secure digital systems.",
        image: "",
        initial: "CY"
    },

    aiml: {
        name: "Vasavi",
        role: "AI & ML LEAD",
        description:
            "Leading Artificial Intelligence and Machine Learning initiatives and intelligent solutions inside Nexora.",
        image: "",
        initial: "AI"
    },

    web: {
        name: "Web Lead",
        role: "WEB DEVELOPMENT",
        description:
            "Working on the development of Nexora's web experience and digital products.",
        image: "",
        initial: "WD"
    },

    cloud: {
        name: "Cloud Lead",
        role: "CLOUD & DEVOPS",
        description:
            "Working with cloud technologies, deployment systems and the infrastructure behind Nexora.",
        image: "",
        initial: "CL"
    },

    design: {
        name: "Design Lead",
        role: "UI / UX & CREATIVE",
        description:
            "Working on Nexora's visual identity, interface design and creative experience.",
        image: "",
        initial: "DS"
    }

};

// =========================================================
// NEXORA TEAM — CARD SELECTION
// =========================================================

window.openTeamPopup = function(type, card) {

    const profile = teamProfiles[type];

    if (!profile || !card) return;


    // -----------------------------------------
    // REMOVE ACTIVE FROM ALL CARDS
    // -----------------------------------------

    document
        .querySelectorAll(".nexora-member")
        .forEach(member => {

            member.classList.remove("active");

        });


    // -----------------------------------------
    // ACTIVATE CLICKED CARD
    // -----------------------------------------

    card.classList.add("active");


    // -----------------------------------------
    // GET DETAILS ELEMENTS
    // -----------------------------------------

    const details = document.getElementById(
        "teamLeadDetails"
    );

    const role = document.getElementById(
        "teamDetailsRole"
    );

    const name = document.getElementById(
        "teamDetailsName"
    );

    const description = document.getElementById(
        "teamDetailsDescription"
    );

    const number = document.querySelector(
        ".team-details-number"
    );


    if (!details || !role || !name || !description) {
        return;
    }


    // -----------------------------------------
    // CARD CLICK ANIMATION
    // -----------------------------------------

    card.classList.remove("member-launch");

    void card.offsetWidth;

    card.classList.add("member-launch");


    // -----------------------------------------
    // DETAILS FADE OUT
    // -----------------------------------------

    details.style.opacity = "0";
    details.style.transform = "translateY(12px)";


    // -----------------------------------------
    // UPDATE DETAILS
    // -----------------------------------------

    setTimeout(() => {

        role.textContent = profile.role;

        name.textContent = profile.name;

        description.textContent =
            profile.description;

        if (number) {

            const cardNumber =
                card.querySelector(".member-number");

            if (cardNumber) {

                number.textContent =
                    cardNumber.textContent.trim();

            }

        }


        // -----------------------------------------
        // FADE DETAILS BACK IN
        // -----------------------------------------

        details.style.opacity = "1";

        details.style.transform =
            "translateY(0)";

    }, 180);


    // -----------------------------------------
    // KEEP SELECTED CARD VISIBLE
    // -----------------------------------------

    card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
    });

};

// =========================================================
// CLOSE TEAM POPUP
// =========================================================

window.closeTeamPopup = function() {

    const popup =
        document.getElementById("teamPopup");

    if (!popup) return;

    popup.classList.remove("active");

    document.body.style.overflow = "";

};


// =========================================================
// ESC TO CLOSE
// =========================================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeTeamPopup();

    }

});
    /* =====================================================
       GSAP
    ===================================================== */

    const hasGSAP =
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined";


    if (hasGSAP) {
        gsap.registerPlugin(ScrollTrigger);
    }

/* =====================================================
   AUTH STATE
===================================================== */

onAuthStateChanged(auth, (user) => {

    const joinBtn = document.getElementById("joinNexoraBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!joinBtn || !logoutBtn) return;

    const dashBtn = document.getElementById("dashboardBtn");

    if (dashBtn) {
        dashBtn.style.setProperty(
            "display",
            user ? "inline-flex" : "none",
            "important"
        );
    }

    if (user) {

        // ==============================
        // USER LOGGED IN
        // ==============================

        const name = user.displayName || "NEXORIAN";

        joinBtn.textContent = `HI, ${name} 👋`;

        // Show JOIN/NAME button
        joinBtn.style.setProperty(
            "display",
            "inline-flex",
            "important"
        );

        // Show LOGOUT
        logoutBtn.style.setProperty(
            "display",
            "inline-flex",
            "important"
        );

        joinBtn.onclick = () => {
            showUserMenu(user);
        };

    } else {

        // ==============================
        // USER LOGGED OUT
        // ==============================

        joinBtn.textContent = "JOIN NEXORA";

        // Show ONLY JOIN NEXORA
        joinBtn.style.setProperty(
            "display",
            "inline-flex",
            "important"
        );

        // IMPORTANT:
        // Completely hide LOGOUT
        logoutBtn.style.setProperty(
            "display",
            "none",
            "important"
        );

        // Remove any old user menu
        closeUserMenu();

        joinBtn.onclick = () => {
            openJoinModal();
        };

    }

});
   /* =====================================================
   LOGOUT
===================================================== */

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        try {

            await signOut(auth);

            console.log("NEXORA LOGOUT SUCCESS");

            // DO NOT redirect.
            // Firebase onAuthStateChanged() will
            // automatically update the navbar.

        } catch (error) {

            console.error(
                "NEXORA LOGOUT ERROR:",
                error
            );

        }

    });

}
    /* =====================================================
       USER MENU
    ===================================================== */

    function showUserMenu(user) {

        let menu =
            document.getElementById(
                "nexoraUserMenu"
            );


        /*
         * If menu already exists,
         * toggle it.
         */

        if (menu) {

            menu.classList.toggle(
                "user-menu-show"
            );

            return;

        }


        menu =
            document.createElement("div");

        menu.id =
            "nexoraUserMenu";

        menu.className =
            "nexora-user-menu";


        menu.innerHTML = `

            <div class="user-menu-title">

                WELCOME BACK

            </div>


            <div class="user-menu-name">

                ${escapeHTML(
                    user.displayName ||
                    "NEXORIAN"
                )} 👋

            </div>


            <div class="user-menu-email">

                ${escapeHTML(
                    user.email ||
                    ""
                )}

            </div>


            <div class="user-menu-line"></div>


            <button
                type="button"
                onclick="location.href='dashboard.html'"
            >
                MY DASHBOARD
            </button>
            <button
                id="userMenuExplore"
                type="button"
            >

                EXPLORE NEXORA

            </button>


            <button
                id="userMenuLogout"
                type="button"
            >

                LOGOUT

            </button>

        `;


        document.body.appendChild(menu);


        /*
         * Position menu under JOIN button.
         */

        if (joinButton) {

            const rect =
                joinButton.getBoundingClientRect();


            menu.style.position =
                "fixed";

            menu.style.top =
                `${rect.bottom + 12}px`;

            menu.style.right =
                `${window.innerWidth - rect.right}px`;

        }


        requestAnimationFrame(() => {

            menu.classList.add(
                "user-menu-show"
            );

        });


        /*
         * Explore
         */

        document
            .getElementById(
                "userMenuExplore"
            )
            ?.addEventListener(
                "click",
                () => {

                    closeUserMenu();

                    showFeatures();

                }
            );


        /*
         * Logout
         */

        document
            .getElementById(
                "userMenuLogout"
            )
            ?.addEventListener(
                "click",
                async () => {

                    try {

                        await signOut(auth);

                        closeUserMenu();

                    } catch (error) {

                        console.error(error);

                    }

                }
            );


        /*
         * Close when clicking outside.
         */

        setTimeout(() => {

            document.addEventListener(
                "click",
                outsideUserMenuClick,
                {
                    once: true
                }
            );

        }, 50);

    }


    function outsideUserMenuClick(event) {

        const menu =
            document.getElementById(
                "nexoraUserMenu"
            );


        if (!menu) return;


        if (
            menu.contains(event.target) ||
            event.target === joinButton
        ) {

            return;

        }


        closeUserMenu();

    }


    function closeUserMenu() {

        const menu =
            document.getElementById(
                "nexoraUserMenu"
            );


        if (menu) {

            menu.remove();

        }

    }


    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

// ==========================================
// NEXORA JOIN MODAL
// ==========================================

function openJoinModal() {

    // Don't create duplicates
    if (document.querySelector(".nexora-auth-overlay")) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.className = "nexora-auth-overlay";

    overlay.innerHTML = `
        <div class="nexora-auth-box">

            <button
                class="nexora-auth-x"
                id="nexoraAuthClose"
                aria-label="Close"
            >
                ×
            </button>

            <span class="nexora-auth-label">
                NEXORA // ACCESS
            </span>

            <h2>
                Ready To Enter Nexora?
            </h2>

            <p>
                Become a Nexorian and unlock the complete
                Nexora learning ecosystem.
            </p>

            <div class="nexora-auth-actions">

                <button
                    class="nexora-auth-primary"
                    id="nexoraSignup"
                >
                    BECOME A NEXORIAN
                </button>

                <button
                    class="nexora-auth-login"
                    id="nexoraLogin"
                >
                    ALREADY A NEXORIAN? LOGIN
                </button>

            </div>

            <button
                class="nexora-auth-close"
                id="nexoraMaybeLater"
            >
                MAYBE LATER
            </button>

        </div>
    `;

    document.body.appendChild(overlay);


    // ======================================
    // SIGN UP
    // ======================================

    document
        .getElementById("nexoraSignup")
        .addEventListener("click", () => {

            window.location.href = "signup.html";

        });


    // ======================================
    // LOGIN
    // ======================================

    document
        .getElementById("nexoraLogin")
        .addEventListener("click", () => {

            window.location.href = "login.html";

        });


    // ======================================
    // CLOSE
    // ======================================

    function closeModal() {

        overlay.remove();

    }


    document
        .getElementById("nexoraAuthClose")
        .addEventListener("click", closeModal);


    document
        .getElementById("nexoraMaybeLater")
        .addEventListener("click", closeModal);


    // Click outside modal

    overlay.addEventListener("click", (event) => {

        if (event.target === overlay) {

            closeModal();

        }

    });


    // ESC key

    document.addEventListener(
        "keydown",
        function escHandler(event) {

            if (event.key === "Escape") {

                closeModal();

                document.removeEventListener(
                    "keydown",
                    escHandler
                );

            }

        }
    );

}
   
    /*
     * Make modal function available
     * to HTML if needed later.
     */

    window.openJoinModal =
        openJoinModal;


    /* =====================================================
       FEATURE ACCESS CONTROL
    ===================================================== */

    window.openProtectedFeature =
        function (page) {

            const user =
                auth.currentUser;


            if (!user) {

                openJoinModal();

                return;

            }


            window.location.href =
                page;

        };


    /* =====================================================
       NAVIGATION
    ===================================================== */

    function setActive(page) {

        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === page
            );

        });

    }


    function scrollToSection(id) {

        const section =
            document.getElementById(id);


        if (!section) return;


        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    window.goHome = () => {

        scrollToSection("home");

        setActive("home");

    };


    window.showAbout = () => {

        scrollToSection("about");

        setActive("about");

    };


    window.showFeatures = () => {

        scrollToSection("features");

        setActive("features");

    };


    window.showTeam = () => {

        scrollToSection("team");

        setActive("team");

    };


    window.showContact = () => {

        scrollToSection("contact");

        setActive("contact");

    };


    /* =====================================================
       FEATURE DATA
    ===================================================== */

    const featureData = {

        aiml: {

            title:
                "🤖 Artificial Intelligence & Machine Learning",

            text:
                "Explore AI, Machine Learning, Deep Learning and intelligent systems.",

            list: [
                "Python Programming",
                "Machine Learning",
                "Deep Learning",
                "Computer Vision",
                "AI Projects",
                "Research"
            ]

        },


        cyber: {

            title:
                "🛡 Cyber Security",

            text:
                "Learn ethical hacking and build secure digital systems.",

            list: [
                "Networking",
                "Linux",
                "Ethical Hacking",
                "Pen Testing",
                "Digital Forensics",
                "Cyber Projects"
            ]

        },


        web: {

            title:
                "💻 Web Development",

            text:
                "Build modern websites and complete full-stack applications.",

            list: [
                "HTML & CSS",
                "JavaScript",
                "React",
                "Backend",
                "Databases",
                "Full Stack"
            ]

        },


        cloud: {

            title:
                "☁ Cloud Computing",

            text:
                "Learn cloud infrastructure and modern deployment technologies.",

            list: [
                "AWS",
                "Azure",
                "Docker",
                "Kubernetes",
                "DevOps",
                "Deployment"
            ]

        },


        design: {

            title:
                "🎨 UI / UX Design",

            text:
                "Create beautiful and useful digital products and experiences.",

            list: [
                "UI Design",
                "UX Research",
                "Figma",
                "Branding",
                "Graphics",
                "Product Design"
            ]

        },


        career: {

            title:
                "🚀 Career Hub",

            text:
                "Prepare for internships, projects and industry opportunities.",

            list: [
                "Resume Building",
                "Portfolio",
                "Interview Preparation",
                "Internships",
                "Networking",
                "Career Guidance"
            ]

        }

    };


    window.showFeature = (type) => {

        const data =
            featureData[type];


        const box =
            document.getElementById(
                "featureDetails"
            );


        if (!box || !data) return;


        box.innerHTML = `

            <h2>${data.title}</h2>

            <p>${data.text}</p>

            <div class="feature-list">

                ${data.list
                    .map(
                        item =>
                            `<div>${item}</div>`
                    )
                    .join("")}

            </div>

        `;


        box.classList.add(
            "feature-visible"
        );


        setTimeout(() => {

            box.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    };


    /* =====================================================
       LOADER
    ===================================================== */

    function startLoader() {

        setTimeout(() => {

            if (mainContent) {

                mainContent.classList.add(
                    "site-visible"
                );

            }


            if (loader) {

                loader.classList.add(
                    "loader-hide"
                );

            }


            setActive("home");


            setTimeout(() => {

                startHeroAnimation();

                startScrollAnimations();

            }, 150);


            setTimeout(() => {

                if (loader) {

                    loader.style.display =
                        "none";

                }

            }, 1200);

        }, 1800);

    }


    /* =====================================================
       HERO ANIMATION
    ===================================================== */

    function startHeroAnimation() {

        const content =
            document.querySelector(
                ".hero-content"
            );


        const nx =
            document.querySelector(
                ".nx-animation"
            );


        const n =
            document.querySelector(
                ".n-letter"
            );


        const x =
            document.querySelector(
                ".x-letter"
            );


        if (nx && n && x) {

            nx.classList.remove(
                "play-nx"
            );

            n.style.animation =
                "none";

            x.style.animation =
                "none";

            void nx.offsetWidth;

            n.style.animation =
                "";

            x.style.animation =
                "";

            nx.classList.add(
                "play-nx"
            );

        }


        if (!hasGSAP) return;


        if (content) {

            gsap.fromTo(

                content,

                {
                    y: 45,
                    opacity: 0
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 1.15,
                    delay: 0.25,
                    ease: "power3.out"
                }

            );

        }


        const badge =
            document.querySelector(
                ".hero-badge"
            );


        if (badge) {

            gsap.fromTo(

                badge,

                {
                    y: 25,
                    opacity: 0
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.35,
                    ease: "power3.out"
                }

            );

        }


        const heading =
            document.querySelector(
                ".hero h1"
            );


        if (heading) {

            gsap.fromTo(

                heading,

                {
                    y: 45,
                    opacity: 0
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.45,
                    ease: "power3.out"
                }

            );

        }


        const paragraph =
            document.querySelector(
                ".hero-content > p"
            );


        if (paragraph) {

            gsap.fromTo(

                paragraph,

                {
                    y: 30,
                    opacity: 0
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    delay: 0.65,
                    ease: "power3.out"
                }

            );

        }


        const buttons =
            document.querySelector(
                ".hero-buttons"
            );


        if (buttons) {

            gsap.fromTo(

                buttons,

                {
                    y: 25,
                    opacity: 0
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.8,
                    ease: "power3.out"
                }

            );

        }


        const stats =
            document.querySelector(
                ".hero-stats"
            );


        if (stats) {

            gsap.fromTo(

                stats,

                {
                    y: 20,
                    opacity: 0
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.95,
                    ease: "power3.out"
                }

            );

        }

    }


    /* =====================================================
       SCROLL ANIMATIONS
    ===================================================== */

    function startScrollAnimations() {

        if (!hasGSAP) return;


        gsap.utils.toArray(

            "#about .section-header, " +
            "#features .section-header, " +
            "#team .section-header, " +
            "#contact .section-header"

        ).forEach(header => {

            gsap.fromTo(

                header,

                {
                    y: 70,
                    opacity: 0,
                    scale: 0.96
                },

                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: header,

                        start: "top 82%",

                        toggleActions:
                            "play none none reverse"

                    }

                }

            );

        });


        animateCards(
            ".about-card",
            70
        );


        animateCards(
            ".feature-card",
            70
        );


        animateCards(
            ".team-card",
            70
        );


        animateCards(
            ".contact-card",
            70
        );

    }


    function animateCards(
        selector,
        distance = 60
    ) {

        gsap.utils.toArray(
            selector
        ).forEach((card, index) => {

            gsap.fromTo(

                card,

                {
                    y: distance,
                    opacity: 0,
                    scale: 0.94
                },

                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,

                    delay:
                        (index % 3) * 0.08,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: card,

                        start: "top 88%",

                        toggleActions:
                            "play none none reverse"

                    }

                }

            );

        });

    }


    /* =====================================================
       ACTIVE SECTION
    ===================================================== */

    function setupActiveSection() {

        if (!hasGSAP) return;


        sections.forEach(id => {

            const section =
                document.getElementById(id);


            if (!section) return;


            ScrollTrigger.create({

                trigger: section,

                start: "top 45%",

                end: "bottom 45%",

                onEnter: () => {

                    setActive(id);

                },

                onEnterBack: () => {

                    setActive(id);

                }

            });

        });

    }


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(
            ".hero"
        );


    if (hero) {

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();


                const mouseX =
                    event.clientX -
                    rect.left;


                const mouseY =
                    event.clientY -
                    rect.top;


                const px =
                    ((mouseX / rect.width) - 0.5) * 2;


                const py =
                    ((mouseY / rect.height) - 0.5) * 2;


                const nx =
                    document.querySelector(
                        ".nx-animation"
                    );


                if (nx) {

                    nx.style.marginLeft =
                        `${px * 10}px`;

                    nx.style.marginTop =
                        `${py * 10}px`;

                }


                const content =
                    document.querySelector(
                        ".hero-content"
                    );


                if (content) {

                    content.style.transform =
                        `translate3d(
                            ${px * -4}px,
                            ${py * -3}px,
                            0
                        )`;

                }

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                const nx =
                    document.querySelector(
                        ".nx-animation"
                    );


                const content =
                    document.querySelector(
                        ".hero-content"
                    );


                if (nx) {

                    nx.style.marginLeft =
                        "0px";

                    nx.style.marginTop =
                        "0px";

                }


                if (content) {

                    content.style.transform =
                        "translate3d(0,0,0)";

                }

            }
        );

    }


    /* =====================================================
       START
    ===================================================== */

    setupActiveSection();

    startLoader();

});

// ==========================================
// PROTECTED EXPLORE BUTTONS
// ==========================================

window.exploreNexora = function () {

    if (!auth.currentUser) {
        openJoinModal();
        return;
    }

    showFeatures();
};


window.exploreFeatures = function () {

    if (!auth.currentUser) {
        openJoinModal();
        return;
    }

    showFeatures();
};

/* =========================================================
   NEXORA TEAM — TRUE INFINITE MOVING TRACK
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("nexoraTeamGrid");

    if (!grid) {
        console.log("NEXORA TEAM: grid not found");
        return;
    }

    /* -----------------------------------------
       CREATE VIEWPORT
    ----------------------------------------- */

    const viewport = document.createElement("div");

    viewport.className = "team-moving-viewport";

    grid.parentNode.insertBefore(viewport, grid);

    viewport.appendChild(grid);


    /* -----------------------------------------
       CONVERT GRID INTO MOVING TRACK
    ----------------------------------------- */

    grid.classList.add("team-moving-track");


    /* -----------------------------------------
       DUPLICATE ORIGINAL CARDS
    ----------------------------------------- */

    const originalCards = Array.from(
        grid.querySelectorAll(".nexora-member")
    );

    originalCards.forEach(card => {

        const clone = card.cloneNode(true);

        clone.classList.add("team-clone");

        grid.appendChild(clone);

    });


    /* -----------------------------------------
       MOVEMENT
    ----------------------------------------- */

    let position = 0;

    let speed = 0.35;

    let paused = false;

    let animationFrame;


    function animateTeam() {

        if (!paused) {

            position -= speed;

            const firstCard = originalCards[0];

            if (firstCard) {

                const cardWidth =
                    firstCard.offsetWidth + 16;

                const originalWidth =
                    cardWidth * originalCards.length;

                /*
                   Once the first complete set
                   has moved away, reset invisibly.
                */

                if (Math.abs(position) >= originalWidth) {
                    position = 0;
                }

            }

            grid.style.transform =
                `translate3d(${position}px, 0, 0)`;
        }

        animationFrame =
            requestAnimationFrame(animateTeam);
    }


    /* -----------------------------------------
       PAUSE ON HOVER
    ----------------------------------------- */

    viewport.addEventListener("mouseenter", () => {

        paused = true;

    });

    viewport.addEventListener("mouseleave", () => {

        paused = false;

    });


    /* -----------------------------------------
       MOBILE TOUCH
    ----------------------------------------- */

    viewport.addEventListener("touchstart", () => {

        paused = true;

    }, { passive: true });

    viewport.addEventListener("touchend", () => {

        paused = false;

    }, { passive: true });


    /* -----------------------------------------
       START
    ----------------------------------------- */

    console.log("NEXORA TEAM: infinite carousel started");

    animateTeam();

});