// ==========================================
// NEXORA AI ACADEMY
// AIML.JS
// ==========================================


// ==========================================
// CURSOR GLOW
// ==========================================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    if (glow) {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    }

});


// ==========================================
// SCROLL REVEAL
// ==========================================

const sections = document.querySelectorAll("section");

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "0.8s ease";

});


function revealSections() {

    sections.forEach(section => {

        const position = section.getBoundingClientRect().top;

        if (position < window.innerHeight - 100) {

            section.style.opacity = "1";
            section.style.transform = "translateY(0)";

        }

    });

}


window.addEventListener("scroll", revealSections);

window.addEventListener("load", revealSections);


// ==========================================
// MODULE SYSTEM
// Cards with data-href open a module.
// data-requires names a localStorage flag that must be "true".
// ==========================================

function showNotice(message) {

    let notice = document.getElementById("moduleNotice");

    if (!notice) {

        notice = document.createElement("div");

        notice.id = "moduleNotice";

        notice.setAttribute("role", "status");

        notice.style.cssText =
            "position:fixed;left:50%;bottom:34px;transform:translateX(-50%);" +
            "padding:14px 22px;border-radius:14px;z-index:9999;" +
            "background:rgba(5,5,12,.92);color:#fff;font-size:14px;" +
            "border:1px solid rgba(168,85,247,.45);" +
            "box-shadow:0 0 30px rgba(124,58,237,.25);" +
            "transition:opacity .3s;";

        document.body.appendChild(notice);
    }

    notice.textContent = message;
    notice.style.opacity = "1";

    clearTimeout(notice.hideTimer);

    notice.hideTimer = setTimeout(() => {
        notice.style.opacity = "0";
    }, 2600);
}

document.querySelectorAll(".module-card").forEach((card) => {

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {

        const href = card.dataset.href;

        if (!href) {
            showNotice("This module is coming soon.");
            return;
        }

        const gate = card.dataset.requires;

        if (gate && localStorage.getItem(gate) !== "true") {
            showNotice("Pass the Deep Learning quiz to unlock Computer Vision.");
            return;
        }

        window.location.href = href;
    });

});


// ==========================================
// CARD SCROLL REVEAL
// ==========================================

const animatedCards = document.querySelectorAll(
    ".about-card, \
    .feature-card, \
    .team-card, \
    .contact-card, \
    .module-card, \
    .lesson-card, \
    .project-card, \
    .learning-card, \
    .resource-box div, \
    .mentor-card, \
    .note-card, \
    .roadmap-card, \
    .dash-card"
);


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show-card");

            }

        });

    },

    {
        threshold: 0.15
    }

);


animatedCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.08}s`;

    observer.observe(card);

});


// ==========================================
// EXPLORE MODULES BUTTON
// ==========================================

const exploreButton = document.querySelector(
    ".hero-buttons .glass-btn"
);

if (exploreButton) {

    exploreButton.addEventListener("click", () => {

        document
            .getElementById("modules")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}


// ==========================================
// START LEARNING BUTTON
// ==========================================

const startButton = document.querySelector(
    ".hero-buttons .gold-btn"
);

if (startButton) {

    startButton.addEventListener("click", () => {

        document
            .getElementById("modules")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}