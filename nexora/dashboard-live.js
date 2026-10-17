/* =========================================================
   NEXORA DASHBOARD — LIVE DATA

   dashboard.js draws the interface. This file fills it with the
   signed-in student's real name and real progress from every
   learning module.

   `user`, `saveUser`, `updateUserUI` and `updateLevelRoad` are
   defined by dashboard.js, which loads first.
========================================================= */

import { requireAuth, getProgress } from "./nexora-core.js";


const DEFAULT_NAMES = ["Nexorian", "Sidrah Mohamed"];
const DEFAULT_HANDLES = ["@nexorian", "@sid"];


function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function setBar(id, percent) {
    const bar = document.getElementById(id);

    if (bar) bar.style.width = percent + "%";
}

function setText(id, text) {
    const element = document.getElementById(id);

    if (element) element.textContent = text;
}


/* =========================================================
   PROFILE + XP
========================================================= */

function syncUser(firebaseUser, progress) {
    const emailName = (firebaseUser.email || "").split("@")[0];

    if (DEFAULT_NAMES.includes(user.name)) {
        user.name = firebaseUser.displayName || emailName || "Nexorian";
    }

    if (DEFAULT_HANDLES.includes(user.username)) {
        user.username = "@" + (emailName || "nexorian").toLowerCase();
    }

    user.avatar = user.name.trim().charAt(0).toUpperCase() || "N";

    const total = progress.totalXP + (user.quizXp || 0);
    const level = 1 + Math.floor(total / progress.xpPerLevel);

    user.level = level;
    user.xp = total % progress.xpPerLevel;
    user.xpRequired = progress.xpPerLevel;
    user.streak = progress.streak;
    user.courses = progress.completed;

    saveUser();
    updateUserUI();

    if (typeof updateLevelRoad === "function") updateLevelRoad();
}


/* =========================================================
   OVERALL PROGRESS
========================================================= */

function renderOverall(progress) {
    const modulesDone = progress.modules.length
        ? Math.round((progress.completed / progress.modules.length) * 100)
        : 0;

    setText("progLearning", progress.average + "%");
    setBar("progLearningFill", progress.average);

    setText("progQuiz", (user.averageScore || 0) + "%");
    setBar("progQuizFill", user.averageScore || 0);

    setText("progModules", modulesDone + "%");
    setBar("progModulesFill", modulesDone);
}


/* =========================================================
   CONTINUE CARD
========================================================= */

function renderContinue(progress) {
    const next = progress.next;

    if (!next) return;

    const fresh = progress.totalXP === 0 && next.status === "new";

    setText(
        "contLabel",
        fresh ? "START YOUR FIRST MODULE" : "CONTINUE WHERE YOU LEFT OFF"
    );

    setText("contTitle", next.title);
    setText("contDetail", next.detail);
    setText("contPercent", next.percent + "% COMPLETE");
    setText("contTrack", next.label);
    setText("contIcon", next.icon);
    setText(
        "contButtonText",
        next.status === "new" ? "START LEARNING" : "CONTINUE LEARNING"
    );

    setBar("contFill", next.percent);

    const button = document.getElementById("contButton");

    if (button) {
        button.onclick = () => {
            window.location.href = next.href;
        };
    }
}


/* =========================================================
   LEARNING GRID
========================================================= */

function renderLearning(progress) {
    const grid = document.getElementById("learningGrid");

    if (!grid) return;

    grid.innerHTML = progress.modules
        .map((module) => {
            const action =
                module.status === "new"
                    ? "START"
                    : module.status === "done"
                        ? "REVIEW"
                        : "CONTINUE";

            return `
                <article class="learning-card glass-card">

                    <div class="learning-icon">${module.icon}</div>

                    <div class="learning-title">
                        <div>
                            <span>${escapeHTML(module.label)}</span>
                            <h3>${escapeHTML(module.title)}</h3>
                        </div>
                        <strong>${module.percent}%</strong>
                    </div>

                    <div class="thin-progress">
                        <div style="width:${module.percent}%"></div>
                    </div>

                    <div class="learning-details">
                        ${escapeHTML(module.topics)}
                    </div>

                    <div class="chapter">
                        ${escapeHTML(module.detail).toUpperCase()}
                    </div>

                    <a
                        class="secondary-button"
                        href="${module.href}"
                        style="display:inline-flex;align-items:center;justify-content:center;text-decoration:none;"
                    >
                        ${action}
                    </a>

                </article>
            `;
        })
        .join("");
}


/* =========================================================
   START
========================================================= */

requireAuth().then((firebaseUser) => {
    if (!firebaseUser) return;

    const progress = getProgress();

    syncUser(firebaseUser, progress);
    renderOverall(progress);
    renderContinue(progress);
    renderLearning(progress);
});
