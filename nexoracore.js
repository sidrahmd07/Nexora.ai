/* =========================================================
   NEXORA CORE
   One shared module for every protected page.

   - Firebase auth (one place, one config)
   - Per-account progress (so two students on one browser
     never see each other's XP)
   - Daily streak
   - Progress aggregation across every learning module
========================================================= */

import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyA3TEbBax-ynl5PNSrOo90jmVcVR2SHNrg",
    authDomain: "nexora-40249.firebaseapp.com",
    projectId: "nexora-40249",
    storageBucket: "nexora-40249.firebasestorage.app",
    messagingSenderId: "296414066166",
    appId: "1:296414066166:web:baa9a4806a220813ef03d7"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);


/* =========================================================
   PER-ACCOUNT STORAGE

   Every module saves progress in localStorage under keys that
   start with "nexora". localStorage is shared by everyone who
   uses the same browser, so we keep one snapshot per account
   and swap it in when a different student signs in.
========================================================= */

const ACTIVE_KEY = "nexora_account_active_uid";
const SNAPSHOT_PREFIX = "nexora_account_snapshot_";

function ownedKeys() {
    return Object.keys(localStorage).filter(
        (key) => /^nexora/i.test(key) && !key.startsWith("nexora_account_")
    );
}

function stash(uid) {
    const data = {};
    ownedKeys().forEach((key) => {
        data[key] = localStorage.getItem(key);
    });
    localStorage.setItem(SNAPSHOT_PREFIX + uid, JSON.stringify(data));
}

function clearOwned() {
    ownedKeys().forEach((key) => localStorage.removeItem(key));
}

function restore(uid) {
    clearOwned();

    const saved = localStorage.getItem(SNAPSHOT_PREFIX + uid);

    if (!saved) return;

    try {
        Object.entries(JSON.parse(saved)).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
    } catch (error) {
        console.warn("NEXORA: could not restore saved progress", error);
    }
}

/*
   Returns true when a different account's data was swapped in.
   The first account to sign in on a browser keeps any progress
   that was already saved there.
*/
function switchAccount(uid) {
    const previous = localStorage.getItem(ACTIVE_KEY);

    if (previous === uid) return false;

    if (!previous) {
        localStorage.setItem(ACTIVE_KEY, uid);
        return false;
    }

    stash(previous);
    restore(uid);
    localStorage.setItem(ACTIVE_KEY, uid);

    return true;
}

function saveSnapshotOnExit() {
    const uid = localStorage.getItem(ACTIVE_KEY);

    if (uid) stash(uid);
}

window.addEventListener("pagehide", saveSnapshotOnExit);


/* =========================================================
   AUTH
========================================================= */

export const authReady = new Promise((resolve) => {
    const stop = onAuthStateChanged(auth, (user) => {
        stop();
        resolve(user);
    });
});

export function currentPage() {
    return location.pathname.split("/").pop() || "index.html";
}

/*
   Call on any page that needs a signed-in student.
   Resolves with the user, or sends them to login.
*/
export async function requireAuth() {
    const user = await authReady;

    if (!user) {
        location.replace(
            "login.html?next=" + encodeURIComponent(currentPage())
        );

        return new Promise(() => {});
    }

    if (switchAccount(user.uid)) {
        /*
           Module scripts already read the old account's progress
           while the page was loading, so load the page again.
        */
        location.reload();

        return new Promise(() => {});
    }

    touchStreak();

    return user;
}

/*
   Same account switching, but never redirects.
   Used by public pages that show progress when signed in.
*/
export async function optionalAuth() {
    const user = await authReady;

    if (user && switchAccount(user.uid)) {
        location.reload();

        return new Promise(() => {});
    }

    if (user) touchStreak();

    return user;
}

export async function logout() {
    const user = auth.currentUser;

    if (user) stash(user.uid);

    clearOwned();
    localStorage.removeItem(ACTIVE_KEY);

    try {
        await signOut(auth);
    } catch (error) {
        console.error("NEXORA: logout failed", error);
    }

    location.href = "index.html";
}

window.nexoraLogout = logout;


/* =========================================================
   STREAK
========================================================= */

function dayKey(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${date.getFullYear()}-${month}-${day}`;
}

function touchStreak() {
    const today = dayKey(new Date());
    const last = localStorage.getItem("nexoraStreakLast");

    if (last === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const count = Number(localStorage.getItem("nexoraStreakCount")) || 0;

    localStorage.setItem(
        "nexoraStreakCount",
        String(last === dayKey(yesterday) ? count + 1 : 1)
    );

    localStorage.setItem("nexoraStreakLast", today);
}


/* =========================================================
   MODULE CATALOG
========================================================= */

export const MODULES = [
    {
        id: "python",
        track: "ai",
        icon: "🐍",
        label: "AI / ML",
        title: "Python for AI",
        topics: "Basics • Control Flow • Data Structures",
        href: "python-home.html"
    },
    {
        id: "dl",
        track: "ai",
        icon: "🧠",
        label: "AI / ML",
        title: "Deep Learning",
        topics: "Neural Networks • Activation • Training",
        href: "deeplearning.html"
    },
    {
        id: "cv",
        track: "ai",
        icon: "👁️",
        label: "AI / ML",
        title: "Computer Vision",
        topics: "Images • Pixels • Vision Tasks",
        href: "computer-vision.html"
    },
    {
        id: "cyber",
        track: "cyber",
        icon: "🛡️",
        label: "CYBERSECURITY",
        title: "Cybersecurity Basics",
        topics: "CIA Triad • Threats • Vulnerabilities",
        href: "cyber.html"
    },
    {
        id: "net",
        track: "cyber",
        icon: "🌐",
        label: "CYBERSECURITY",
        title: "Networking",
        topics: "Basic • Intermediate • Higher",
        href: "networking.html"
    }
];


/* =========================================================
   PROGRESS
========================================================= */

const LEVEL_XP = 500;

function readNumber(key) {
    const value = Number(localStorage.getItem(key));

    return Number.isFinite(value) && value > 0 ? value : 0;
}

function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);

        return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
        return fallback;
    }
}

function clamp(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
}

function moduleProgress(id) {
    switch (id) {

        case "python": {
            const level = Math.min(
                Math.floor(readNumber("nexoraPythonRoadmapV2CompletedLevel")),
                10
            );

            const stages = readJSON("nexoraPythonStages", []).length;

            const done = level >= 1 ? level : Math.min(stages, 5) / 5;

            return {
                percent: level >= 10 ? 100 : clamp((done / 10) * 100),
                foundationDone: level >= 1,
                xp: readNumber("nexoraPythonXP"),
                detail: level >= 10
                    ? "All 10 levels complete"
                    : `Level ${level + 1} of 10`
            };
        }

        case "dl": {
            const lessons = readJSON("nexoraDLProgress", []).length;
            const passed = localStorage.getItem("nexoraDLQuizPassed") === "true";

            return {
                percent: clamp(Math.min(lessons, 10) * 8 + (passed ? 20 : 0)),
                foundationDone: lessons >= 10 && passed,
                xp: Math.min(lessons, 10) * 20 + (passed ? 100 : 0),
                detail: `${Math.min(lessons, 10)} of 10 lessons${passed ? " • quiz passed" : ""}`
            };
        }

        case "cv": {
            const stages = Math.min(
                readJSON("nexoraComputerVisionStages", []).length,
                5
            );

            return {
                percent: clamp((stages / 5) * 100),
                foundationDone: stages >= 5,
                xp: readNumber("nexoraComputerVisionXP"),
                detail: `${stages} of 5 stages`
            };
        }

        case "net": {
            const completed =
                (readJSON("nexora_networking_levels_v1", {}) || {}).completed || {};

            const done = ["basic", "intermediate", "higher"].filter(
                (key) => completed[key]
            ).length;

            return {
                percent: clamp((done / 3) * 100),
                foundationDone: Boolean(completed.basic),
                xp: done * 100,
                detail: `${done} of 3 levels`
            };
        }

        case "cyber": {
            const done =
                localStorage.getItem("nexora_cyber_basics_completed") === "true";

            return {
                percent: done ? 100 : 0,
                foundationDone: done,
                xp: done ? 100 : 0,
                detail: done ? "Completed" : "5 knowledge checks"
            };
        }
    }

    return { percent: 0, foundationDone: false, xp: 0, detail: "" };
}

export function getProgress() {
    const modules = MODULES.map((module) => {
        const progress = moduleProgress(module.id);

        return {
            ...module,
            ...progress,
            status:
                progress.percent >= 100
                    ? "done"
                    : progress.percent > 0
                        ? "active"
                        : "new"
        };
    });

    const totalXP = modules.reduce((sum, module) => sum + module.xp, 0);
    const level = 1 + Math.floor(totalXP / LEVEL_XP);

    const started = modules.filter((m) => m.status !== "new").length;
    const completed = modules.filter((m) => m.status === "done").length;

    const average = modules.length
        ? Math.round(
            modules.reduce((sum, m) => sum + m.percent, 0) / modules.length
        )
        : 0;

    const active = modules
        .filter((m) => m.status === "active")
        .sort((a, b) => b.percent - a.percent)[0];

    /*
       "Continue where you left off": the module the student last
       opened (recorded by nexora-guard.js), unless it is finished.
    */
    const last = localStorage.getItem("nexoraLastModule");

    const resume = modules.find(
        (m) => m.id === last && m.status !== "done"
    );

    const next =
        resume ||
        active ||
        modules.find((m) => m.status === "new") ||
        modules[0];

    return {
        modules,
        totalXP,
        level,
        xpIntoLevel: totalXP % LEVEL_XP,
        xpPerLevel: LEVEL_XP,
        started,
        completed,
        average,
        streak: readNumber("nexoraStreakCount"),
        next
    };
}