/* =========================================================
   NEXORA DASHBOARD

   - Three learning worlds with seven-step roadmaps
   - Steps unlock in order
   - Steps tied to a hands-on module complete automatically
     when the module is done; the rest are self-study steps
   - One XP total: self-study XP + hands-on module XP
   - Signed-in student, saved per account (see nexora-core.js)
========================================================= */

import { requireAuth, getProgress, logout } from "./nexora-core.js";


/* =========================================================
   CURRICULUM

   `module` ties a step to a hands-on module in nexora-core.js.
   Those steps finish automatically and earn the module's XP,
   so they carry no separate step XP.
========================================================= */

const STEPS_PER_WORLD = 7;

const WORLDS = {

    aiml: {
        name: "AI & ML",
        icon: "cpu",
        description: "Learn Python foundations, data, machine learning and intelligent systems.",
        steps: [
            {
                title: "Python Foundations",
                summary: "Meet variables, data types, input and output, the building blocks of Python.",
                xp: 25,
                goals: [
                    "Store values in variables and recognise data types",
                    "Read input and print output",
                    "Write and run your first small programs"
                ],
                module: "python",
                moduleNote: "the Python Basics mission (all five stages)"
            },
            {
                title: "Conditions and Loops",
                summary: "Make decisions with if/else and repeat tasks with loops.",
                xp: 25,
                goals: [
                    "Make decisions with if, elif and else",
                    "Repeat work with for and while loops",
                    "Control loops with break and continue"
                ]
            },
            {
                title: "Functions and Collections",
                summary: "Organise reusable code with functions, lists, dictionaries and tuples.",
                xp: 30,
                goals: [
                    "Write functions with parameters and return values",
                    "Use lists, dictionaries and tuples",
                    "Choose the right collection for the job"
                ]
            },
            {
                title: "Working with Data",
                summary: "Read, clean and explore simple datasets using Python.",
                xp: 35,
                goals: [
                    "Read data from files such as CSV",
                    "Clean missing or messy values",
                    "Summarise a dataset with simple statistics"
                ]
            },
            {
                title: "NumPy and Pandas Basics",
                summary: "Discover the arrays and tables used in data analysis.",
                xp: 35,
                goals: [
                    "Create and slice NumPy arrays",
                    "Load a table into a pandas DataFrame",
                    "Filter, sort and group rows"
                ]
            },
            {
                title: "Machine Learning Essentials",
                summary: "Understand features, labels, training, testing and predictions.",
                xp: 40,
                goals: [
                    "Tell features from labels",
                    "Split data into training and test sets",
                    "Train a model and measure its predictions"
                ]
            },
            {
                title: "Mini AI Project",
                summary: "Plan and build a beginner-friendly AI/ML project.",
                xp: 50,
                goals: [
                    "Pick a small problem and a dataset",
                    "Train and evaluate a simple model",
                    "Present what you built and what you learned"
                ]
            }
        ]
    },

    cyber: {
        name: "Cybersecurity",
        icon: "shield",
        description: "Learn networking, threats, defensive thinking and responsible security practice.",
        steps: [
            {
                title: "Security Foundations",
                summary: "Explore confidentiality, integrity, availability and security ethics.",
                xp: 25,
                goals: [
                    "Explain confidentiality, integrity and availability",
                    "Tell threats from vulnerabilities",
                    "Describe why security ethics matter"
                ],
                module: "cyber",
                moduleNote: "the five knowledge checks in Cybersecurity Basics"
            },
            {
                title: "Networking Basics",
                summary: "Understand IP addresses, ports, DNS and common protocols.",
                xp: 25,
                goals: [
                    "Understand IP addresses and ports",
                    "See how DNS finds a website",
                    "Recognise common protocols such as HTTP and SSH"
                ],
                module: "net",
                moduleNote: "the Basic level of the Networking module"
            },
            {
                title: "Linux and Command Line",
                summary: "Practise basic terminal navigation and file operations.",
                xp: 30,
                goals: [
                    "Move around folders with cd and ls",
                    "Create, copy and remove files",
                    "Read file permissions"
                ]
            },
            {
                title: "Web Security Basics",
                summary: "Learn common web risks and defensive concepts.",
                xp: 35,
                goals: [
                    "Recognise common web risks such as injection and XSS",
                    "Explain how sessions and cookies work",
                    "Describe basic defences like validation and HTTPS"
                ]
            },
            {
                title: "Threats and Attacks",
                summary: "Recognise phishing, malware and social-engineering patterns.",
                xp: 35,
                goals: [
                    "Spot phishing and social engineering",
                    "Tell common kinds of malware apart",
                    "Describe how attacks usually unfold"
                ]
            },
            {
                title: "Defensive Monitoring",
                summary: "Explore logs, alerts and incident response basics.",
                xp: 40,
                goals: [
                    "Read logs and find unusual activity",
                    "Explain what alerts and detections are",
                    "Outline the steps of incident response"
                ]
            },
            {
                title: "Safe Security Lab",
                summary: "Plan an authorised, isolated security practice lab.",
                xp: 50,
                goals: [
                    "Set up an isolated practice environment",
                    "Only test systems you are authorised to test",
                    "Document your findings clearly"
                ]
            }
        ]
    },

    web: {
        name: "Web Development",
        icon: "code",
        description: "Build responsive websites with HTML, CSS, JavaScript and projects.",
        steps: [
            {
                title: "HTML Foundations",
                summary: "Build a semantic page structure with common HTML elements.",
                xp: 25,
                goals: [
                    "Structure a page with semantic elements",
                    "Add links, images and lists",
                    "Build a simple form"
                ]
            },
            {
                title: "CSS Styling",
                summary: "Style content with selectors, spacing, colours and typography.",
                xp: 25,
                goals: [
                    "Select elements and apply styles",
                    "Control spacing with the box model",
                    "Choose colours and typography"
                ]
            },
            {
                title: "Responsive Layouts",
                summary: "Use Flexbox, Grid and media queries for mobile-friendly layouts.",
                xp: 30,
                goals: [
                    "Lay out pages with Flexbox",
                    "Build grids with CSS Grid",
                    "Adapt layouts with media queries"
                ]
            },
            {
                title: "JavaScript Basics",
                summary: "Work with variables, functions, conditions and events.",
                xp: 35,
                goals: [
                    "Use variables, functions and conditions",
                    "Work with arrays and objects",
                    "Handle simple events"
                ]
            },
            {
                title: "DOM Interactions",
                summary: "Update page content and respond to user actions.",
                xp: 35,
                goals: [
                    "Select and change elements",
                    "Respond to clicks and input",
                    "Build a small interactive feature"
                ]
            },
            {
                title: "Git and Deployment",
                summary: "Track changes with Git and publish a small website.",
                xp: 40,
                goals: [
                    "Commit and track changes with Git",
                    "Push a project to a remote repository",
                    "Publish a small website online"
                ]
            },
            {
                title: "Portfolio Project",
                summary: "Combine your skills into a polished portfolio project.",
                xp: 50,
                goals: [
                    "Plan a portfolio with a few strong projects",
                    "Combine HTML, CSS and JavaScript",
                    "Publish and share it"
                ]
            }
        ]
    }
};

const MODULE_ICONS = {
    python: "terminal",
    dl: "cpu",
    cv: "eye",
    cyber: "shield",
    net: "globe"
};

const TIPS = [
    "Short, focused sessions beat long distracted ones. Try 25 minutes, then a break.",
    "Explain what you just learned out loud, as if teaching a friend. Gaps show up fast.",
    "Type the code yourself instead of copying it. Your hands learn too.",
    "When you are stuck, write down exactly what you expected and what happened instead.",
    "Review yesterday's step for two minutes before starting today's.",
    "Small progress every day adds up faster than one big weekend push.",
    "Break big goals into steps you can finish in one sitting."
];

const ACHIEVEMENTS = [
    { id: "first", name: "First Step", icon: "sparkle", desc: "Complete your first step", test: (s) => s.doneCount >= 1 },
    { id: "three", name: "Momentum", icon: "flame", desc: "Complete three steps", test: (s) => s.doneCount >= 3 },
    { id: "five", name: "Quick Learner", icon: "zap", desc: "Complete five steps", test: (s) => s.doneCount >= 5 },
    { id: "world", name: "World Explorer", icon: "paths", desc: "Complete a full roadmap", test: (s) => s.worldsComplete >= 1 },
    { id: "xp", name: "XP Builder", icon: "layers", desc: "Earn 100 XP", test: (s) => s.totalXP >= 100 },
    { id: "star", name: "NEXORA Star", icon: "star", desc: "Reach level 5", test: (s) => s.level >= 5 }
];

const ROUTES = [
    "home", "learn", "missions", "paths", "achievements",
    "community", "settings", "roadmap", "lesson"
];

const TITLES = {
    home: "Dashboard", learn: "Learn", missions: "Missions", paths: "Paths",
    achievements: "Achievements", community: "Community", settings: "Settings",
    roadmap: "Roadmap", lesson: "Lesson"
};


/* =========================================================
   STATE
========================================================= */

const STORAGE_KEY = "nexoraDashboardV3";

function freshState() {
    return {
        username: "",
        selectedWorld: null,
        completed: [],       // self-study steps the student marked complete
        xp: 0,               // XP earned from self-study steps
        activity: [],
        unlocked: [],        // achievement ids, never taken back
        linkedSeen: [],      // module-linked steps already logged
        notifSeenAt: null
    };
}

function parseStepId(id) {
    const match = /^([a-z]+)-(\d+)$/.exec(String(id));

    if (!match) return null;

    const world = match[1];
    const index = Number(match[2]);

    if (!WORLDS[world] || index < 1 || index > STEPS_PER_WORLD) return null;

    return { world, index, step: WORLDS[world].steps[index - 1] };
}

function loadState() {
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!raw || typeof raw !== "object") return freshState();

        const state = { ...freshState(), ...raw };

        const list = (value) => (Array.isArray(value) ? value : []);

        state.completed = list(state.completed).filter((id) => parseStepId(id));
        state.activity = list(state.activity).slice(0, 30);
        state.unlocked = list(state.unlocked).filter((id) => ACHIEVEMENTS.some((a) => a.id === id));
        state.linkedSeen = list(state.linkedSeen).filter((id) => parseStepId(id));

        state.xp = Number.isFinite(state.xp) && state.xp > 0 ? state.xp : 0;
        state.username = typeof state.username === "string" ? state.username.slice(0, 24) : "";

        if (!WORLDS[state.selectedWorld]) state.selectedWorld = null;

        return state;
    } catch (error) {
        return freshState();
    }
}

let state = loadState();
let progress = getProgress();
let firebaseUser = null;
let currentRoute = { view: "home", arg: "" };


function save() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.warn("NEXORA: could not save progress", error);
    }
}


/* =========================================================
   HELPERS
========================================================= */

const $ = (id) => document.getElementById(id);

function esc(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
}

function icon(name) {
    return `<svg class="ic" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
}

const stepId = (world, index) => `${world}-${index}`;

function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();

    if (!Number.isFinite(diff)) return "";

    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours} hr ago`;

    return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

let toastTimer = null;

function toast(message) {
    const box = $("toast");

    box.textContent = message;
    box.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => box.classList.remove("show"), 3800);
}

function confirmAction({ title, text, label }) {
    const dialog = $("confirmDialog");

    $("confirmTitle").textContent = title;
    $("confirmText").textContent = text;
    $("confirmOk").textContent = label;

    return new Promise((resolve) => {
        dialog.addEventListener("close", () => resolve(dialog.returnValue === "ok"), { once: true });

        dialog.returnValue = "cancel";
        dialog.showModal();
    });
}


/* =========================================================
   DERIVED PROGRESS
========================================================= */

function linkedModule(world, index) {
    const key = WORLDS[world].steps[index - 1].module;

    return key ? progress.modules.find((m) => m.id === key) : null;
}

function isDone(world, index) {
    const module = linkedModule(world, index);

    return module
        ? module.foundationDone
        : state.completed.includes(stepId(world, index));
}

function isUnlocked(world, index) {
    return index === 1 || isDone(world, index - 1);
}

function stepStatus(world, index) {
    if (isDone(world, index)) return "done";

    return isUnlocked(world, index) ? "open" : "locked";
}

function worldDone(world) {
    let count = 0;

    for (let i = 1; i <= STEPS_PER_WORLD; i++) {
        if (isDone(world, i)) count += 1;
    }

    return count;
}

const worldComplete = (world) => worldDone(world) === STEPS_PER_WORLD;

function nextStepIndex(world) {
    for (let i = 1; i <= STEPS_PER_WORLD; i++) {
        if (!isDone(world, i)) return i;
    }

    return 0;
}

function canChangeWorld() {
    const active = state.selectedWorld;

    return !active || worldDone(active) === 0 || worldComplete(active);
}

/* A world can be opened if it is the active one or already finished. */
function worldOpen(world) {
    return state.selectedWorld === world || worldComplete(world);
}

const totalXP = () => state.xp + progress.totalXP;
const levelFor = (xp) => Math.floor(Math.max(0, xp) / 100) + 1;

function rankFor(level) {
    if (level >= 10) return "Stargazer";
    if (level >= 7) return "Trailblazer";
    if (level >= 4) return "Pathfinder";
    if (level >= 2) return "Explorer";

    return "Newcomer";
}

function displayName() {
    if (state.username) return state.username;

    if (firebaseUser) {
        if (firebaseUser.displayName) return firebaseUser.displayName;
        if (firebaseUser.email) return firebaseUser.email.split("@")[0];
    }

    return "Learner";
}

function statsSnapshot() {
    let doneCount = 0;
    let worldsComplete = 0;

    Object.keys(WORLDS).forEach((world) => {
        const done = worldDone(world);

        doneCount += done;

        if (done === STEPS_PER_WORLD) worldsComplete += 1;
    });

    const xp = totalXP();

    return { doneCount, worldsComplete, totalXP: xp, level: levelFor(xp) };
}

function logActivity(text, xp = 0) {
    state.activity.unshift({ text, date: new Date().toISOString(), xp });
    state.activity = state.activity.slice(0, 30);
}

/* Records steps finished through a hands-on module. */
function syncLinkedSteps() {
    Object.keys(WORLDS).forEach((world) => {
        WORLDS[world].steps.forEach((step, i) => {
            const id = stepId(world, i + 1);

            if (step.module && isDone(world, i + 1) && !state.linkedSeen.includes(id)) {
                state.linkedSeen.push(id);

                logActivity(`Completed: ${step.title}`, 0);
            }
        });
    });
}

/* Returns the names of newly earned achievements. */
function checkAchievements() {
    const snapshot = statsSnapshot();
    const earned = [];

    ACHIEVEMENTS.forEach((achievement) => {
        if (!state.unlocked.includes(achievement.id) && achievement.test(snapshot)) {
            state.unlocked.push(achievement.id);
            earned.push(achievement.name);
        }
    });

    return earned;
}


/* =========================================================
   RENDER: HOME
========================================================= */

function renderStats() {
    const xp = totalXP();
    const level = levelFor(xp);
    const into = xp % 100;
    const name = displayName();

    $("greetingName").textContent = name;
    $("ghostName").textContent = name;
    $("topUsername").textContent = name;
    $("avatarInitial").textContent = name.trim().charAt(0).toUpperCase() || "L";
    $("topRank").textContent = rankFor(level);
    $("rankValue").textContent = rankFor(level);
    $("levelValue").textContent = level;
    $("xpValue").textContent = xp;
    $("nextLevelXP").textContent = level * 100;
    $("xpBar").style.width = into + "%";
    $("xpTrack").setAttribute("aria-valuenow", String(into));
    $("streakValue").textContent = progress.streak;
    $("streakUnit").textContent = progress.streak === 1 ? "day" : "days";
    $("usernameInput").value = state.username || name;
}

function renderProgressPanel() {
    const active = state.selectedWorld;
    const done = active ? worldDone(active) : 0;
    const percent = Math.round((done / STEPS_PER_WORLD) * 100);

    $("completedCount").textContent = `${done} / ${STEPS_PER_WORLD}`;
    $("completionPct").textContent = percent + "%";
    $("completionRing").style.background =
        `conic-gradient(#eef3fb ${(done / STEPS_PER_WORLD) * 360}deg, #2c333d 0deg)`;
    $("completionRing").setAttribute("aria-label", `Roadmap ${percent}% complete`);
    $("selectedWorldText").textContent = active
        ? WORLDS[active].name
        : "Choose a world to begin";
}

function worldCard(id) {
    const world = WORLDS[id];
    const done = worldDone(id);
    const percent = Math.round((done / STEPS_PER_WORLD) * 100);
    const selected = state.selectedWorld === id;
    const finished = worldComplete(id);
    const locked = !selected && !finished && !canChangeWorld();

    let label = "Choose world";

    if (finished) label = "Review roadmap";
    else if (selected) label = done ? "Continue roadmap" : "Open roadmap";
    else if (locked) label = "Locked";

    const classes = ["world-card"];

    if (locked) classes.push("locked");
    if (selected) classes.push("selected");
    if (finished) classes.push("finished");

    return `
        <article class="${classes.join(" ")}">
            <div class="world-top">
                <span class="world-icon">${icon(world.icon)}</span>
                <div>
                    <h3>${esc(world.name)}</h3>
                    <p>${esc(world.description)}</p>
                </div>
            </div>
            <div class="world-meta">
                <span><b>${done}</b> / ${STEPS_PER_WORLD} steps</span>
                <span>${percent}%</span>
            </div>
            <div class="progress-track" role="progressbar" aria-label="${esc(world.name)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}">
                <span style="width:${percent}%"></span>
            </div>
            <button class="outline-button" type="button" data-action="choose-world" data-world="${id}" ${locked ? "disabled" : ""}>
                ${label} ${icon(locked ? "lock" : "arrow-right")}
            </button>
            ${selected && !finished ? '<p class="selected-note">Your active world</p>' : ""}
        </article>
    `;
}

function renderWorlds() {
    const html = Object.keys(WORLDS).map(worldCard).join("");

    $("worldGrid").innerHTML = html;
    $("learnWorldGrid").innerHTML = html;

    const hint = $("worldsHint");

    if (!state.selectedWorld) {
        hint.textContent = "Choose one world to begin. The others unlock when you finish it.";
    } else if (canChangeWorld()) {
        hint.textContent = "You can pick any world. Finished worlds stay open for review.";
    } else {
        hint.textContent = `Finish ${WORLDS[state.selectedWorld].name} to unlock the other worlds.`;
    }
}

function stepRow(world, index, { mission = false } = {}) {
    const step = WORLDS[world].steps[index - 1];
    const status = stepStatus(world, index);
    const module = linkedModule(world, index);
    const id = stepId(world, index);

    const reward =
        status === "done" ? "Completed"
            : module ? "Module XP"
                : `+${step.xp} XP`;

    const action =
        status === "done" ? "Review"
            : status === "locked" ? "Locked"
                : mission ? "Start" : "Start";

    const symbol =
        status === "done" ? icon("check")
            : status === "locked" ? icon("lock")
                : mission ? String(index) : icon(WORLDS[world].icon);

    return `
        <article class="lesson-card ${status === "locked" ? "locked" : ""}">
            <span class="lesson-symbol">${symbol}</span>
            <div class="lesson-info">
                <h3>${esc(step.title)}</h3>
                <p>${esc(WORLDS[world].name)} · Step ${index} of ${STEPS_PER_WORLD}${module ? " · Hands-on module" : ""}</p>
            </div>
            <span class="lesson-reward">${reward}</span>
            <button class="lesson-action" type="button" data-action="open-step" data-step="${id}" ${status === "locked" ? "disabled" : ""}>
                ${action}
            </button>
        </article>
    `;
}

function renderContinue() {
    const target = $("lessonList");
    const active = state.selectedWorld;

    if (!active) {
        target.innerHTML = `
            <article class="lesson-card">
                <span class="lesson-symbol">${icon("sparkle")}</span>
                <div class="lesson-info">
                    <h3>Your journey starts here</h3>
                    <p>Choose one learning world to see your next steps.</p>
                </div>
                <button class="lesson-action" type="button" data-view="learn">Choose world ${icon("arrow-right")}</button>
            </article>
        `;

        return;
    }

    if (worldComplete(active)) {
        target.innerHTML = `
            <article class="lesson-card">
                <span class="lesson-symbol">${icon("achievements")}</span>
                <div class="lesson-info">
                    <h3>You finished ${esc(WORLDS[active].name)}</h3>
                    <p>Pick your next world, or review this roadmap any time.</p>
                </div>
                <button class="lesson-action" type="button" data-view="learn">Choose next world ${icon("arrow-right")}</button>
            </article>
        `;

        return;
    }

    const first = nextStepIndex(active);
    const rows = [];

    for (let i = first; i <= STEPS_PER_WORLD && rows.length < 3; i++) {
        if (!isDone(active, i)) rows.push(stepRow(active, i));
    }

    target.innerHTML = rows.join("");
}

function renderModules() {
    $("moduleGrid").innerHTML = progress.modules.map((module) => `
        <article class="lesson-card">
            <span class="lesson-symbol">${icon(MODULE_ICONS[module.id] || "code")}</span>
            <div class="lesson-info">
                <h3>${esc(module.title)}</h3>
                <p>${esc(module.label)} · ${esc(module.detail)}</p>
            </div>
            <div class="progress-track" role="progressbar" aria-label="${esc(module.title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${module.percent}">
                <span style="width:${module.percent}%"></span>
            </div>
            <span class="lesson-reward">${module.percent}%</span>
            <a class="lesson-action" href="${module.href}">
                ${module.status === "new" ? "Start" : module.status === "done" ? "Review" : "Continue"} ${icon("arrow-right")}
            </a>
        </article>
    `).join("");
}

function renderActivity() {
    const list = $("activityList");

    if (!state.activity.length) {
        list.innerHTML = '<p class="empty-state">Your journey starts here. Choose a world to begin.</p>';

        return;
    }

    list.innerHTML = state.activity.slice(0, 4).map((item) => `
        <div class="activity-item">
            <span class="activity-icon">${icon(item.xp ? "check" : "sparkle")}</span>
            <div>
                <strong>${esc(item.text)}</strong>
                <small>${esc(timeAgo(item.date))}${item.xp ? ` · +${item.xp} XP` : ""}</small>
            </div>
        </div>
    `).join("");
}

function achievementCard(achievement, detailed) {
    const earned = state.unlocked.includes(achievement.id);

    return `
        <article class="achievement ${earned ? "earned" : ""}">
            <div class="badge-shape">${icon(achievement.icon)}</div>
            <strong>${esc(achievement.name)}</strong>
            <small>${earned ? "Unlocked" : detailed ? esc(achievement.desc) : "Locked"}</small>
        </article>
    `;
}

function renderAchievements() {
    $("achievementPreview").innerHTML =
        ACHIEVEMENTS.map((a) => achievementCard(a, false)).join("");

    $("allAchievements").innerHTML =
        ACHIEVEMENTS.map((a) => achievementCard(a, true)).join("");

    $("achievementSummary").textContent =
        `${state.unlocked.length} of ${ACHIEVEMENTS.length} unlocked. They come from your real progress and never lock again.`;
}

function renderTip() {
    const day = Math.floor(Date.now() / 86400000);

    $("tipText").textContent = TIPS[day % TIPS.length];
}


/* =========================================================
   RENDER: OTHER VIEWS
========================================================= */

function renderMissions() {
    const target = $("missionPageList");
    const active = state.selectedWorld;

    if (!active) {
        target.innerHTML = `
            <div class="feature-panel">
                ${icon("missions").replace('class="ic"', 'class="ic feature-icon"')}
                <h2>No active learning world</h2>
                <p>Choose AI &amp; ML, Cybersecurity or Web Development first.</p>
                <button class="primary-button inline" type="button" data-view="learn">Explore worlds</button>
            </div>
        `;

        return;
    }

    let rows = "";

    for (let i = 1; i <= STEPS_PER_WORLD; i++) rows += stepRow(active, i, { mission: true });

    target.innerHTML = rows;
}

function renderPaths() {
    const target = $("pathContent");

    const cards = Object.keys(WORLDS)
        .filter((id) => id === state.selectedWorld || worldComplete(id))
        .map((id) => {
            const world = WORLDS[id];
            const done = worldDone(id);
            const percent = (done / STEPS_PER_WORLD) * 100;
            const finished = worldComplete(id);

            return `
                <div class="path-card panel">
                    <span class="world-icon">${icon(world.icon)}</span>
                    <div>
                        <p class="eyebrow">${finished ? "COMPLETED PATH" : "ACTIVE PATH"}</p>
                        <h2>${esc(world.name)}</h2>
                        <p>${esc(world.description)}</p>
                        <div class="progress-track" role="progressbar" aria-label="${esc(world.name)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(percent)}"><span style="width:${percent}%"></span></div>
                        <small>${done} of ${STEPS_PER_WORLD} steps completed</small>
                    </div>
                    <button class="outline-button" type="button" data-action="choose-world" data-world="${id}">
                        ${finished ? "Review roadmap" : "Open roadmap"} ${icon("arrow-right")}
                    </button>
                </div>
            `;
        });

    if (!cards.length) {
        target.innerHTML = `
            <div class="feature-panel">
                ${icon("paths").replace('class="ic"', 'class="ic feature-icon"')}
                <h2>Choose your first path</h2>
                <p>Pick one world to unlock its seven-step roadmap.</p>
                <button class="primary-button inline" type="button" data-view="learn">Choose a world ${icon("arrow-right")}</button>
            </div>
        `;

        return;
    }

    target.innerHTML = cards.join("");
}

function renderRoadmap(worldId) {
    const world = WORLDS[worldId];
    const next = nextStepIndex(worldId);

    $("roadmapTitle").textContent = `${world.name} Roadmap`;
    $("roadmapEyebrow").textContent = `${world.name.toUpperCase()} · ${STEPS_PER_WORLD} STEPS`;

    let html = "";

    world.steps.forEach((step, i) => {
        const index = i + 1;
        const status = stepStatus(worldId, index);
        const classes = ["roadmap-node"];
        const current = index === next;

        if (status === "done") classes.push("completed");
        if (status === "locked") classes.push("locked");
        if (current) classes.push("current");

        const label =
            `Step ${index}: ${step.title}. ${status === "done" ? "Completed" : status === "locked" ? "Locked" : "Available"}`;

        const content =
            status === "done" ? icon("check")
                : status === "locked" ? icon("lock")
                    : String(index);

        html += `
            <button class="${classes.join(" ")}" type="button" data-action="open-step" data-step="${stepId(worldId, index)}" aria-label="${esc(label)}" title="${esc(`${index}. ${step.title}`)}" ${current ? 'aria-current="step"' : ""}>
                <span class="node-number">${content}</span>
            </button>
        `;
    });

    $("roadmapNodes").innerHTML = html;
}

function renderLesson(id) {
    const root = $("lessonRoot");
    const ref = parseStepId(id);

    const { world, index, step } = ref;
    const worldInfo = WORLDS[world];
    const status = stepStatus(world, index);
    const module = linkedModule(world, index);

    const prevId = index > 1 ? stepId(world, index - 1) : null;
    const nextId = index < STEPS_PER_WORLD ? stepId(world, index + 1) : null;

    let content;

    if (status === "locked") {
        const previous = worldInfo.steps[index - 2];

        content = `
            <p class="eyebrow">STEP LOCKED</p>
            <h2>Finish Step ${index - 1} first</h2>
            <p>Steps unlock in order. Complete <strong>${esc(previous.title)}</strong> to open this one.</p>
            <div class="lesson-actions">
                <button class="primary-button inline" type="button" data-action="open-step" data-step="${prevId}">
                    ${icon("arrow-left")} Go to Step ${index - 1}
                </button>
            </div>
        `;
    } else {
        const goals = step.goals
            .map((goal) => `<li>${icon("check")}<span>${esc(goal)}</span></li>`)
            .join("");

        let action;

        if (module) {
            const verb = module.percent > 0 ? "Continue lesson" : "Start lesson";

            action = `
                <div class="module-link">
                    <span class="world-icon">${icon(MODULE_ICONS[module.id] || "code")}</span>
                    <div>
                        <h3>${esc(module.title)}</h3>
                        <p>${esc(module.detail)} · ${module.percent}% complete</p>
                    </div>
                    <a class="primary-button inline" href="${module.href}">${verb} ${icon("arrow-right")}</a>
                </div>
                <p class="tiny-note">This step completes by itself once you finish ${esc(step.moduleNote)}. Your XP comes from the module.</p>
            `;
        } else if (status === "done") {
            action = `
                <div class="lesson-actions">
                    <button class="primary-button inline" type="button" disabled>${icon("check")} Step completed</button>
                </div>
            `;
        } else {
            action = `
                <div class="lesson-actions">
                    <button class="primary-button inline" type="button" data-action="complete-step" data-step="${id}">
                        Mark step complete · Earn ${step.xp} XP
                    </button>
                </div>
                <p class="tiny-note">This is a self-study step. Work through the topics above, then mark it complete.</p>
            `;
        }

        content = `
            <p class="eyebrow">WHAT YOU'LL COVER</p>
            <h2>${esc(step.title)}</h2>
            <ul class="goal-list">${goals}</ul>
            ${action}
        `;
    }

    const chip =
        status === "done" ? `<span class="chip done">${icon("check")} Completed</span>`
            : status === "locked" ? `<span class="chip">${icon("lock")} Locked</span>`
                : '<span class="chip open">Available</span>';

    root.innerHTML = `
        <button class="back-button" type="button" data-view="roadmap" data-arg="${world}">
            ${icon("arrow-left")} Back to roadmap
        </button>

        <div class="step-hero">
            <span class="step-orb">${icon(worldInfo.icon)}</span>
            <p class="eyebrow">${esc(worldInfo.name.toUpperCase())} · STEP ${index} OF ${STEPS_PER_WORLD}</p>
            <h1 id="lessonTitle" tabindex="-1" data-focus>${esc(step.title)}</h1>
            <p>${esc(step.summary)}</p>
        </div>

        <div class="step-layout">

            <article class="lesson-content panel">${content}</article>

            <aside class="side-panel">
                <h2>Step details</h2>
                <div class="detail-row"><span>World</span><strong>${esc(worldInfo.name)}</strong></div>
                <div class="detail-row"><span>Step</span><strong>${index} of ${STEPS_PER_WORLD}</strong></div>
                <div class="detail-row"><span>Reward</span><strong>${module ? "Module XP" : `+${step.xp} XP`}</strong></div>
                <div class="detail-row"><span>Status</span>${chip}</div>
                <div class="step-nav">
                    <button class="outline-button" type="button" data-action="open-step" data-step="${prevId || ""}" ${prevId ? "" : "disabled"}>Previous</button>
                    <button class="outline-button" type="button" data-action="open-step" data-step="${nextId || ""}" ${nextId && status === "done" ? "" : "disabled"}>Next</button>
                </div>
            </aside>

        </div>
    `;
}

function renderSettings() {
    const active = state.selectedWorld;

    $("settingsWorldText").textContent = active
        ? `Active world: ${WORLDS[active].name}.`
        : "No world selected yet. Choose one on Home or Learn.";

    $("accountEmail").textContent = firebaseUser && firebaseUser.email ? firebaseUser.email : "-";
}

function renderShare() {
    const xp = totalXP();
    const level = levelFor(xp);
    const stats = statsSnapshot();

    $("shareText").value =
        `I'm level ${level} (${rankFor(level)}) on NEXORA with ${xp} XP, ` +
        `${progress.streak} ${progress.streak === 1 ? "day" : "days"} streak and ` +
        `${stats.doneCount} ${stats.doneCount === 1 ? "step" : "steps"} completed. Come learn with me!`;
}

function renderNotifications() {
    const list = $("notifList");
    const items = state.activity.slice(0, 5);

    list.innerHTML = items.length
        ? items.map((item) => `
            <div class="activity-item" style="margin-bottom:12px">
                <span class="activity-icon">${icon(item.xp ? "check" : "sparkle")}</span>
                <div>
                    <strong>${esc(item.text)}</strong>
                    <small>${esc(timeAgo(item.date))}${item.xp ? ` · +${item.xp} XP` : ""}</small>
                </div>
            </div>
        `).join("")
        : '<p class="empty-state">No activity yet. Complete a step to get started.</p>';

    const seen = state.notifSeenAt ? new Date(state.notifSeenAt).getTime() : 0;
    const unread = state.activity.filter((a) => new Date(a.date).getTime() > seen).length;
    const badge = $("notifBadge");

    badge.hidden = unread === 0;
    badge.textContent = unread > 9 ? "9+" : String(unread);

    $("notifButton").setAttribute(
        "aria-label",
        unread ? `Notifications, ${unread} new` : "Notifications"
    );
}

function render() {
    progress = getProgress();

    renderStats();
    renderProgressPanel();
    renderWorlds();
    renderContinue();
    renderModules();
    renderActivity();
    renderAchievements();
    renderTip();
    renderMissions();
    renderPaths();
    renderSettings();
    renderShare();
    renderNotifications();
}


/* =========================================================
   ROUTER
   #home  #learn  #missions  #paths  #achievements
   #community  #settings  #roadmap/<world>  #lesson/<step>
========================================================= */

function navigate(view, arg = "") {
    const hash = arg ? `#${view}/${arg}` : `#${view}`;

    if (location.hash === hash) route();
    else location.hash = hash;
}

function closeDrawer() {
    $("sidebar").classList.remove("open");
    $("scrim").classList.remove("show");

    $("mobileMenu").setAttribute("aria-expanded", "false");
}

function renderCurrentView() {
    if (currentRoute.view === "roadmap") renderRoadmap(currentRoute.arg);
    if (currentRoute.view === "lesson") renderLesson(currentRoute.arg);
}

/* Re-read module progress, then redraw everything. */
function refresh() {
    progress = getProgress();

    syncLinkedSteps();

    const earned = checkAchievements();

    save();
    render();
    renderCurrentView();

    return earned;
}

function route(first = false) {
    let [view, arg] = location.hash.slice(1).split("/");

    if (!ROUTES.includes(view)) view = "home";

    arg = arg || "";

    if (view === "roadmap") {
        const world = WORLDS[arg] ? arg : state.selectedWorld;

        if (!world || !worldOpen(world)) {
            if (!first) toast("Choose a learning world first.");

            return navigate("learn");
        }

        arg = world;
    }

    if (view === "lesson") {
        const ref = parseStepId(arg);

        if (!ref || !worldOpen(ref.world)) {
            if (!first) toast("Choose a learning world first.");

            return navigate("learn");
        }
    }

    currentRoute = { view, arg };

    /* Module progress can change on other pages, so re-read it. */
    if (first) {
        renderCurrentView();
    } else {
        const earned = refresh();

        if (earned.length) toast(`Achievement unlocked: ${earned.join(", ")}`);
    }

    document.querySelectorAll(".view").forEach((section) => {
        section.classList.toggle("active", section.id === `view-${view}`);
    });

    const navView = view === "roadmap" ? "paths" : view === "lesson" ? "learn" : view;

    document.querySelectorAll(".nav-link[data-view]").forEach((button) => {
        const active = button.dataset.view === navView;

        button.classList.toggle("active", active);

        if (active) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
    });

    document.title = `NEXORA | ${TITLES[view]}`;

    closeDrawer();
    window.scrollTo(0, 0);

    if (!first) {
        const heading = document.querySelector(`#view-${view} [data-focus]`);

        if (heading) heading.focus({ preventScroll: true });
    }
}


/* =========================================================
   ACTIONS
========================================================= */

function chooseWorld(id) {
    if (state.selectedWorld === id || worldComplete(id)) {
        navigate("roadmap", id);

        return;
    }

    if (!canChangeWorld()) {
        toast(`Finish ${WORLDS[state.selectedWorld].name} first. Your other worlds unlock after that.`);

        return;
    }

    state.selectedWorld = id;

    logActivity(`Selected world: ${WORLDS[id].name}`);
    save();
    render();

    toast(`${WORLDS[id].name} unlocked. Your seven-step roadmap is ready.`);

    navigate("roadmap", id);
}

function openStep(id) {
    const ref = parseStepId(id);

    if (!ref) return;

    if (stepStatus(ref.world, ref.index) === "locked") {
        toast(`Complete Step ${ref.index - 1} first. Steps unlock in order.`);

        return;
    }

    if (!worldOpen(ref.world)) {
        toast("That world is locked right now.");

        return;
    }

    navigate("lesson", id);
}

function completeStep(id) {
    const ref = parseStepId(id);

    if (!ref || ref.step.module) return;

    const { world, index, step } = ref;

    if (!isUnlocked(world, index)) {
        toast(`Complete Step ${index - 1} first.`);

        return;
    }

    if (state.completed.includes(id)) return;

    const levelBefore = levelFor(totalXP());

    state.completed.push(id);
    state.xp += step.xp;

    logActivity(`Completed: ${step.title}`, step.xp);

    const earned = checkAchievements();

    save();
    render();
    renderLesson(id);

    const parts = [`Step complete · +${step.xp} XP`];

    const levelAfter = levelFor(totalXP());

    if (levelAfter > levelBefore) parts.push(`Level up! You are level ${levelAfter}`);
    if (worldComplete(world)) parts.push(`${WORLDS[world].name} roadmap finished`);
    if (earned.length) parts.push(`Achievement: ${earned.join(", ")}`);

    toast(parts.join(" · "));

    const heading = document.querySelector("#view-lesson [data-focus]");

    if (heading) heading.focus({ preventScroll: true });
}

async function resetProgress() {
    const ok = await confirmAction({
        title: "Reset roadmap progress?",
        text: "This clears your selected world, completed self-study steps, activity and achievements. Hands-on module progress is not touched.",
        label: "Reset"
    });

    if (!ok) return;

    state = freshState();

    syncLinkedSteps();
    save();
    render();

    navigate("home");

    toast("Roadmap progress reset.");
}

function changeWorld() {
    if (!canChangeWorld()) {
        toast(`Finish ${WORLDS[state.selectedWorld].name} first, then you can switch worlds.`);

        return;
    }

    if (state.selectedWorld && worldDone(state.selectedWorld) === 0) {
        state.selectedWorld = null;

        save();
        render();
    }

    navigate("learn");
}

async function copyProgress() {
    const text = $("shareText").value;

    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        $("shareText").select();

        document.execCommand("copy");
    }

    toast("Progress summary copied.");
}

function saveName() {
    const value = $("usernameInput").value.trim();

    if (!value) {
        toast("Please enter a display name.");

        return;
    }

    state.username = value.slice(0, 24);

    save();
    render();

    toast("Profile name updated.");
}


/* =========================================================
   SEARCH
========================================================= */

const searchInput = $("searchInput");
const searchBox = $("searchResults");

let searchHits = [];
let searchActive = -1;

function runSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length < 2) {
        closeSearch();

        return;
    }

    searchHits = [];

    Object.entries(WORLDS).forEach(([worldId, world]) => {
        if (world.name.toLowerCase().includes(query)) {
            searchHits.push({
                kind: "world",
                world: worldId,
                title: world.name,
                sub: "Learning world",
                icon: world.icon
            });
        }

        world.steps.forEach((step, i) => {
            const haystack = [step.title, step.summary, ...step.goals].join(" ").toLowerCase();

            if (haystack.includes(query)) {
                searchHits.push({
                    kind: "step",
                    id: stepId(worldId, i + 1),
                    title: step.title,
                    sub: `${world.name} · Step ${i + 1}`,
                    icon: world.icon
                });
            }
        });
    });

    searchHits = searchHits.slice(0, 7);
    searchActive = searchHits.length ? 0 : -1;

    searchBox.innerHTML = searchHits.length
        ? searchHits.map((hit, i) => `
            <button class="search-item ${i === searchActive ? "active" : ""}" type="button" role="option" id="hit-${i}" data-hit="${i}" aria-selected="${i === searchActive}">
                ${icon(hit.icon)}
                <span><strong>${esc(hit.title)}</strong><small>${esc(hit.sub)}</small></span>
            </button>
        `).join("")
        : '<p class="search-empty">No matching world or topic. Try Python, security or HTML.</p>';

    searchBox.hidden = false;

    searchInput.setAttribute("aria-expanded", "true");
}

function closeSearch() {
    searchBox.hidden = true;
    searchActive = -1;

    searchInput.setAttribute("aria-expanded", "false");
    searchInput.removeAttribute("aria-activedescendant");
}

function highlightHit(index) {
    searchActive = index;

    searchBox.querySelectorAll(".search-item").forEach((item, i) => {
        item.classList.toggle("active", i === index);
        item.setAttribute("aria-selected", String(i === index));
    });

    searchInput.setAttribute("aria-activedescendant", `hit-${index}`);
}

function pickHit(index) {
    const hit = searchHits[index];

    if (!hit) return;

    closeSearch();

    searchInput.value = "";

    if (hit.kind === "world") {
        chooseWorld(hit.world);

        return;
    }

    const ref = parseStepId(hit.id);

    if (!worldOpen(ref.world)) {
        if (canChangeWorld()) {
            chooseWorld(ref.world);
        } else {
            toast(`${WORLDS[ref.world].name} unlocks after you finish ${WORLDS[state.selectedWorld].name}.`);
        }

        return;
    }

    openStep(hit.id);
}

searchInput.addEventListener("input", runSearch);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSearch();

        return;
    }

    if (searchBox.hidden || !searchHits.length) return;

    if (event.key === "ArrowDown") {
        event.preventDefault();
        highlightHit((searchActive + 1) % searchHits.length);
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        highlightHit((searchActive - 1 + searchHits.length) % searchHits.length);
    } else if (event.key === "Enter") {
        event.preventDefault();
        pickHit(Math.max(searchActive, 0));
    }
});

searchBox.addEventListener("click", (event) => {
    const item = event.target.closest("[data-hit]");

    if (item) pickHit(Number(item.dataset.hit));
});


/* =========================================================
   NOTIFICATIONS + DRAWER
========================================================= */

const notifButton = $("notifButton");
const notifPanel = $("notifPanel");

function setNotif(open) {
    notifPanel.hidden = !open;

    notifButton.setAttribute("aria-expanded", String(open));

    if (open) {
        state.notifSeenAt = new Date().toISOString();

        save();
        renderNotifications();
        notifPanel.hidden = false;
    }
}

notifButton.addEventListener("click", () => setNotif(notifPanel.hidden));

$("mobileMenu").addEventListener("click", () => {
    const open = !$("sidebar").classList.contains("open");

    $("sidebar").classList.toggle("open", open);
    $("scrim").classList.toggle("show", open);

    $("mobileMenu").setAttribute("aria-expanded", String(open));
});

$("scrim").addEventListener("click", closeDrawer);

document.addEventListener("click", (event) => {
    if (!event.target.closest(".notif-wrap")) setNotif(false);
    if (!event.target.closest(".search-wrap")) closeSearch();
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    setNotif(false);
    closeDrawer();
});


/* =========================================================
   GLOBAL CLICK HANDLING
========================================================= */

document.addEventListener("click", (event) => {

    const nav = event.target.closest("[data-view]");

    if (nav) {
        navigate(nav.dataset.view, nav.dataset.arg || "");

        return;
    }

    const action = event.target.closest("[data-action]");

    if (!action || action.disabled) return;

    switch (action.dataset.action) {
        case "choose-world":
            chooseWorld(action.dataset.world);
            break;

        case "open-step":
            openStep(action.dataset.step);
            break;

        case "complete-step":
            completeStep(action.dataset.step);
            break;
    }
});

$("brandLink").addEventListener("click", (event) => {
    event.preventDefault();

    navigate("home");
});

$("saveName").addEventListener("click", saveName);

$("usernameInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") saveName();
});

$("changeWorld").addEventListener("click", changeWorld);
$("resetProgress").addEventListener("click", resetProgress);
$("copyProgress").addEventListener("click", copyProgress);
$("logoutButton").addEventListener("click", logout);
$("navLogout").addEventListener("click", logout);

window.addEventListener("hashchange", () => route());

/* Coming back to this tab, or to the page with the Back button. */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden && firebaseUser) refresh();
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted && firebaseUser) refresh();
});


/* =========================================================
   START
========================================================= */

requireAuth().then((user) => {
    if (!user) return;

    firebaseUser = user;

    const earned = refresh();

    route(true);

    if (earned.length) toast(`Achievement unlocked: ${earned.join(", ")}`);
});