/* =========================================================
   NEXORA — COURSES
   Catalog of every learning path. Signed-in students also see
   their real progress; visitors can still browse everything.
========================================================= */

import { optionalAuth, getProgress, MODULES } from "./nexora-core.js";


/* =========================================================
   CATALOG
   A module with `id` is live and matches a module in
   nexora-core.js. A module without one is planned.
========================================================= */

const TRACKS = [
    {
        id: "ai",
        icon: "fa-brain",
        title: "Artificial Intelligence",
        status: "live",
        blurb: "From Python basics to neural networks and computer vision.",
        modules: [
            { id: "python", title: "Python for AI", desc: "Ten levels from first program to projects." },
            { title: "Mathematics", desc: "Linear algebra, statistics and calculus." },
            { title: "Machine Learning", desc: "Train and evaluate your first models." },
            { id: "dl", title: "Deep Learning", desc: "Neural networks, activations and training." },
            { id: "cv", title: "Computer Vision", desc: "Teach computers to understand images." },
            { title: "Natural Language Processing", desc: "Language models and text understanding." },
            { title: "Generative AI", desc: "LLMs, agents and AI applications." }
        ]
    },
    {
        id: "cyber",
        icon: "fa-shield-halved",
        title: "Cyber Security",
        status: "live",
        blurb: "Security fundamentals, networking and hands-on labs.",
        modules: [
            { id: "cyber", title: "Cybersecurity Basics", desc: "The CIA triad, threats and vulnerabilities." },
            { id: "net", title: "Networking", desc: "Three levels of networking tasks." },
            { title: "Linux", desc: "The command line for security work." },
            { title: "Ethical Hacking", desc: "Finding weaknesses the legal way." },
            { title: "Web Security", desc: "Common web attacks and how to stop them." },
            { title: "Cryptography", desc: "Hashing, encryption and keys." },
            { title: "Digital Forensics", desc: "Investigating incidents and evidence." }
        ]
    },
    {
        id: "web",
        icon: "fa-code",
        title: "Web Development",
        status: "soon",
        blurb: "Build and ship full websites and web apps.",
        modules: [
            { title: "HTML & CSS", desc: "Structure and style a page." },
            { title: "JavaScript", desc: "Make pages interactive." },
            { title: "React", desc: "Build with components." },
            { title: "Backend with Node.js", desc: "Servers, APIs and auth." },
            { title: "Databases", desc: "Store and query data." },
            { title: "Full-stack project", desc: "Launch something real." }
        ]
    },
    {
        id: "data",
        icon: "fa-chart-line",
        title: "Data Science",
        status: "soon",
        blurb: "Collect, clean, analyse and explain data.",
        modules: [
            { title: "NumPy", desc: "Fast numerical computing." },
            { title: "Pandas", desc: "Clean and reshape tables." },
            { title: "Visualization", desc: "Charts that make a point." },
            { title: "Statistics", desc: "Sampling, tests and confidence." },
            { title: "Analytics project", desc: "Answer a real question with data." }
        ]
    },
    {
        id: "cloud",
        icon: "fa-cloud",
        title: "Cloud Computing",
        status: "soon",
        blurb: "Deploy and run software on the cloud.",
        modules: [
            { title: "Cloud fundamentals", desc: "Regions, services and pricing." },
            { title: "AWS core services", desc: "Compute, storage and networking." },
            { title: "Docker", desc: "Package an app to run anywhere." },
            { title: "Kubernetes", desc: "Run containers at scale." },
            { title: "CI/CD & DevOps", desc: "Automate testing and releases." }
        ]
    },
    {
        id: "app",
        icon: "fa-mobile-screen-button",
        title: "App Development",
        status: "soon",
        blurb: "Design and build mobile apps.",
        modules: [
            { title: "Dart & Flutter basics", desc: "The language and the toolkit." },
            { title: "UI widgets", desc: "Layouts, lists and navigation." },
            { title: "State management", desc: "Keep the screen and data in sync." },
            { title: "Firebase integration", desc: "Login and a live database." },
            { title: "Publish an app", desc: "Ship it to a store." }
        ]
    }
];


/* =========================================================
   STATE
========================================================= */

const WAITLIST_KEY = "nexoraWaitlist";

const list = document.getElementById("trackList");
const searchInput = document.getElementById("courseSearch");
const chips = document.querySelectorAll(".chip");

let signedIn = false;
/* Visitors still need each module's link, so start from the catalog. */
let progressById = Object.fromEntries(
    MODULES.map((module) => [
        module.id,
        { ...module, status: "new", percent: 0, detail: "" }
    ])
);
let filter = "all";
let query = "";
let openTrack = location.hash.replace("#", "");


function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function getWaitlist() {
    try {
        return JSON.parse(localStorage.getItem(WAITLIST_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function toggleWaitlist(id) {
    const current = getWaitlist();

    const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

    localStorage.setItem(WAITLIST_KEY, JSON.stringify(next));
}


/* =========================================================
   RENDER
========================================================= */

function matches(track) {
    if (filter !== "all" && track.status !== filter) return false;

    if (!query) return true;

    const haystack = [
        track.title,
        track.blurb,
        ...track.modules.map((m) => m.title + " " + m.desc)
    ].join(" ").toLowerCase();

    return haystack.includes(query);
}

function moduleRow(module, index) {
    if (!module.id) {
        return `
            <div class="module-row">
                <div class="module-dot"><i class="fa-solid fa-lock" aria-hidden="true"></i></div>
                <div>
                    <h3>${escapeHTML(module.title)}</h3>
                    <p>${escapeHTML(module.desc)}</p>
                </div>
                <span class="later action">Planned</span>
            </div>
        `;
    }

    const progress = progressById[module.id] || { status: "new", percent: 0, href: "#" };

    const state = signedIn ? progress.status : "new";

    const dot =
        state === "done"
            ? '<i class="fa-solid fa-check" aria-label="Completed"></i>'
            : state === "active"
                ? '<i class="fa-solid fa-play" aria-label="In progress"></i>'
                : String(index + 1);

    const label =
        state === "done" ? "Review" : state === "active" ? "Continue" : "Start";

    const note = signedIn && state !== "new"
        ? `${progress.percent}% complete • ${escapeHTML(progress.detail)}`
        : escapeHTML(module.desc);

    return `
        <div class="module-row ${state}">
            <div class="module-dot">${dot}</div>
            <div>
                <h3>${escapeHTML(module.title)}</h3>
                <p>${note}</p>
            </div>
            <a class="${state === "new" ? "gold-btn" : "glass-btn"} action" href="${progress.href}">${label}</a>
        </div>
    `;
}

function trackCard(track) {
    const live = track.modules.filter((m) => m.id);

    const done = live.filter(
        (m) => signedIn && progressById[m.id]?.status === "done"
    ).length;

    const barPercent = signedIn
        ? Math.round(
            live.reduce((sum, m) => sum + (progressById[m.id]?.percent || 0), 0) /
            track.modules.length
        )
        : 0;

    const isOpen = openTrack === track.id || Boolean(query);

    const onWaitlist = getWaitlist().includes(track.id);

    let meta;

    if (track.status === "soon") {
        meta = `<strong>Soon</strong><span>${track.modules.length} modules planned</span>`;
    } else if (signedIn) {
        meta = `<strong>${done} / ${track.modules.length}</strong><span>modules complete</span>`;
    } else {
        meta = `<strong>${live.length} open</strong><span>of ${track.modules.length} modules</span>`;
    }

    const waitlist = track.status === "soon"
        ? `
            <div class="waitlist">
                <p>This path isn't open yet. Join the waitlist to mark your interest.</p>
                <button type="button" class="${onWaitlist ? "glass-btn" : "gold-btn"}" data-waitlist="${track.id}">
                    ${onWaitlist ? "On the waitlist ✓" : "Join waitlist"}
                </button>
            </div>
        `
        : "";

    return `
        <article class="track ${isOpen ? "open" : ""}" id="${track.id}">

            <button type="button" class="track-head" aria-expanded="${isOpen}" data-track="${track.id}">

                <div class="track-icon"><i class="fa-solid ${track.icon}" aria-hidden="true"></i></div>

                <div>
                    <div class="track-title">
                        <h2>${escapeHTML(track.title)}</h2>
                        <span class="status ${track.status}">${track.status === "live" ? "Open now" : "Coming soon"}</span>
                    </div>
                    <p class="track-blurb">${escapeHTML(track.blurb)}</p>
                </div>

                <div class="track-meta">
                    ${meta}
                    <i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>
                </div>

            </button>

            <div class="track-bar"><div style="width:${barPercent}%"></div></div>

            <div class="syllabus">
                ${track.modules.map(moduleRow).join("")}
                ${waitlist}
            </div>

        </article>
    `;
}

function render() {
    const visible = TRACKS.filter(matches);

    list.innerHTML = visible.length
        ? visible.map(trackCard).join("")
        : `<div class="empty">No path matches that search. Try a topic like "python" or "linux".</div>`;
}


/* =========================================================
   EVENTS
========================================================= */

list.addEventListener("click", (event) => {
    const head = event.target.closest("[data-track]");

    if (head) {
        const id = head.dataset.track;

        openTrack = openTrack === id ? "" : id;

        render();

        return;
    }

    const waitlistButton = event.target.closest("[data-waitlist]");

    if (waitlistButton) {
        toggleWaitlist(waitlistButton.dataset.waitlist);

        render();
    }
});

searchInput.addEventListener("input", () => {
    query = searchInput.value.trim().toLowerCase();

    render();
});

chips.forEach((chip) => {
    chip.addEventListener("click", () => {
        filter = chip.dataset.filter;

        chips.forEach((c) => c.classList.toggle("active", c === chip));

        render();
    });
});

window.addEventListener("hashchange", () => {
    openTrack = location.hash.replace("#", "");

    render();

    document.getElementById(openTrack)?.scrollIntoView({ block: "start" });
});


/* =========================================================
   START
========================================================= */

render();

if (openTrack) {
    document.getElementById(openTrack)?.scrollIntoView({ block: "start" });
}

optionalAuth().then((user) => {
    if (!user) return;

    signedIn = true;

    progressById = Object.fromEntries(
        getProgress().modules.map((module) => [module.id, module])
    );

    const account = document.getElementById("accountLink");

    account.textContent = "Dashboard";
    account.href = "dashboard.html";

    render();
});
