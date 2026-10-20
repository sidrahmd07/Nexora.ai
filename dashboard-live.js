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
   PROJECTS
   Students add their own projects. Saved per account.
========================================================= */

const PROJECTS_KEY = "nexoraProjects";

const PROJECT_STATUS = {
    idea: { label: "IDEA", note: "JUST STARTED", percent: 10 },
    building: { label: "BUILDING", note: "IN PROGRESS", percent: 55 },
    done: { label: "COMPLETED", note: "SHIPPED", percent: 100 }
};

const PROJECT_TRACKS = [
    "AI / ML",
    "Cybersecurity",
    "Web Development",
    "Data Science",
    "Cloud",
    "App Development",
    "Other"
];

function loadProjects() {
    try {
        const list = JSON.parse(localStorage.getItem(PROJECTS_KEY));

        return Array.isArray(list) ? list : [];
    } catch (error) {
        return [];
    }
}

function saveProjects(list) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(list));
}

function refreshAfterProjects(progress) {
    const projects = loadProjects();

    user.projects = projects.filter((p) => p.status === "done").length;

    saveUser();
    updateUserUI();

    if (typeof checkAchievements === "function") checkAchievements();

    renderProjects();
    renderActivity(progress);
}

function renderProjects() {
    const grid = document.getElementById("projectGrid");

    if (!grid) return;

    const projects = loadProjects();

    if (!projects.length) {
        grid.innerHTML = `
            <article class="project-card glass-card" style="grid-column:1/-1;">
                <div class="project-number">NO PROJECTS YET</div>
                <h3>Build something real</h3>
                <span>Use + NEW PROJECT to add your first one.</span>
            </article>
        `;

        return;
    }

    grid.innerHTML = projects
        .map((project, index) => {
            const status = PROJECT_STATUS[project.status] || PROJECT_STATUS.idea;

            return `
                <article class="project-card glass-card">

                    <div class="project-number">
                        PROJECT ${String(index + 1).padStart(2, "0")}
                    </div>

                    <h3>${escapeHTML(project.title)}</h3>

                    <span>${escapeHTML(project.track.toUpperCase())}</span>

                    <div class="project-progress">
                        <div style="width:${status.percent}%"></div>
                    </div>

                    <div class="project-bottom">
                        <strong>${status.label}</strong>
                        <small>${status.note}</small>
                    </div>

                    <div style="display:flex;gap:8px;margin-top:16px;">
                        <button
                            type="button"
                            class="secondary-button"
                            data-project-advance="${project.id}"
                        >
                            ${project.status === "done" ? "REOPEN" : "NEXT STAGE"}
                        </button>
                        <button
                            type="button"
                            class="secondary-button"
                            data-project-delete="${project.id}"
                            aria-label="Delete project ${escapeHTML(project.title)}"
                        >
                            DELETE
                        </button>
                    </div>

                </article>
            `;
        })
        .join("");
}

function setupProjects(progress) {
    const grid = document.getElementById("projectGrid");
    const addButton = document.getElementById("newProjectBtn");

    if (!grid || !addButton) return;

    const style = document.createElement("style");

    style.textContent = `
        #projectDialog {
            width: min(460px, 92vw);
            padding: 32px;
            border-radius: 22px;
            color: #fff;
            font-family: 'Outfit', sans-serif;
            background: linear-gradient(145deg, #090712, #05050b);
            border: 1px solid rgba(168, 85, 247, .35);
            box-shadow: 0 0 60px rgba(124, 58, 237, .2);
        }

        #projectDialog::backdrop {
            background: rgba(0, 0, 0, .75);
            backdrop-filter: blur(8px);
        }

        #projectDialog h2 { margin-bottom: 18px; font-size: 24px; }

        #projectDialog label {
            display: block;
            margin: 14px 0 6px;
            font-size: 12px;
            letter-spacing: 1.5px;
            color: #A855F7;
        }

        #projectDialog input,
        #projectDialog select {
            width: 100%;
            padding: 12px 14px;
            border-radius: 10px;
            font: inherit;
            color: #fff;
            background: rgba(255, 255, 255, .05);
            border: 1px solid rgba(168, 85, 247, .25);
        }

        #projectDialog select option { color: #000; }

        #projectDialog input:focus,
        #projectDialog select:focus {
            outline: 2px solid #A855F7;
            outline-offset: 1px;
        }

        #projectDialog .row {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 24px;
        }
    `;

    document.head.appendChild(style);

    const dialog = document.createElement("dialog");

    dialog.id = "projectDialog";

    dialog.innerHTML = `
        <form method="dialog" id="projectForm">

            <h2>New project</h2>

            <label for="projectTitle">PROJECT NAME</label>
            <input id="projectTitle" maxlength="60" required autocomplete="off">

            <label for="projectTrack">TRACK</label>
            <select id="projectTrack">
                ${PROJECT_TRACKS.map((t) => `<option>${escapeHTML(t)}</option>`).join("")}
            </select>

            <label for="projectStatus">WHERE ARE YOU?</label>
            <select id="projectStatus">
                <option value="idea">Idea</option>
                <option value="building">Building</option>
                <option value="done">Completed</option>
            </select>

            <div class="row">
                <button type="button" class="secondary-button" id="projectCancel">CANCEL</button>
                <button type="submit" class="primary-button" value="add">ADD PROJECT</button>
            </div>

        </form>
    `;

    document.body.appendChild(dialog);

    addButton.addEventListener("click", () => {
        dialog.querySelector("#projectForm").reset();
        dialog.showModal();
        dialog.querySelector("#projectTitle").focus();
    });

    dialog.querySelector("#projectCancel").addEventListener("click", () => dialog.close());

    dialog.querySelector("#projectForm").addEventListener("submit", () => {
        const title = dialog.querySelector("#projectTitle").value.trim();

        if (!title) return;

        const list = loadProjects();

        list.push({
            id: Date.now().toString(36),
            title,
            track: dialog.querySelector("#projectTrack").value,
            status: dialog.querySelector("#projectStatus").value
        });

        saveProjects(list);
        refreshAfterProjects(progress);
    });

    grid.addEventListener("click", (event) => {
        const advance = event.target.closest("[data-project-advance]");
        const remove = event.target.closest("[data-project-delete]");

        if (!advance && !remove) return;

        let list = loadProjects();

        if (advance) {
            const order = ["idea", "building", "done"];

            list = list.map((project) => {
                if (project.id !== advance.dataset.projectAdvance) return project;

                const next = project.status === "done"
                    ? "building"
                    : order[order.indexOf(project.status) + 1];

                return { ...project, status: next };
            });
        } else if (window.confirm("Delete this project?")) {
            list = list.filter((p) => p.id !== remove.dataset.projectDelete);
        } else {
            return;
        }

        saveProjects(list);
        refreshAfterProjects(progress);
    });

    renderProjects();
}


/* =========================================================
   ACTIVITY
   Built from what the student has actually done.
========================================================= */

function renderActivity(progress) {
    const timeline = document.getElementById("activityTimeline");

    if (!timeline) return;

    const items = [];

    progress.modules.forEach((module) => {
        if (module.status === "done") {
            items.push(["✓", `Completed ${module.title}`, "Module"]);
        } else if (module.status === "active") {
            items.push(["→", `${module.title}: ${module.detail} (${module.percent}%)`, "Module"]);
        }
    });

    if (user.quizzesCompleted > 0) {
        items.push([
            "✓",
            `Completed ${user.quizzesCompleted} quiz${user.quizzesCompleted === 1 ? "" : "zes"}, ${user.averageScore}% average`,
            "Quiz"
        ]);
    }

    loadProjects().forEach((project) => {
        items.push([
            project.status === "done" ? "✓" : "+",
            `${PROJECT_STATUS[project.status].label.charAt(0)}${PROJECT_STATUS[project.status].label.slice(1).toLowerCase()}: ${project.title}`,
            "Project"
        ]);
    });

    if (progress.streak > 0) {
        items.push(["+", `${progress.streak}-day learning streak`, "Streak"]);
    }

    if (!items.length) {
        items.push(["→", "Nothing yet. Start a module and your activity will appear here.", "Start"]);
    }

    timeline.innerHTML = items
        .slice(0, 8)
        .map(([icon, text, tag]) => `
            <div class="timeline-item">
                <span>${icon}</span>
                <div>
                    <strong>${escapeHTML(text)}</strong>
                    <small>${tag}</small>
                </div>
            </div>
        `)
        .join("");
}


/* =========================================================
   TRACK ACHIEVEMENTS
   dashboard.js unlocks the quiz, streak, project and level
   badges. These two depend on module progress.
========================================================= */

function unlockTrackBadges(progress) {
    const average = (track) => {
        const list = progress.modules.filter((m) => m.track === track);

        return list.length
            ? list.reduce((sum, m) => sum + m.percent, 0) / list.length
            : 0;
    };

    [["ai", average("ai") >= 50], ["cyber", average("cyber") >= 50]].forEach(
        ([id, earned]) => {
            const card = document.querySelector(`[data-achievement="${id}"]`);

            if (card) card.classList.toggle("unlocked", earned);
        }
    );
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

    user.projects = loadProjects().filter((p) => p.status === "done").length;

    saveUser();
    updateUserUI();

    setupProjects(progress);
    renderActivity(progress);

    if (typeof checkAchievements === "function") checkAchievements();

    unlockTrackBadges(progress);
});
