/* =========================================================
   NEXORA GUARD
   Add to any page that needs a signed-in student:

   <script type="module" src="nexora-guard.js"></script>

   - Sends signed-out visitors to login (and back afterwards)
   - Loads the right account's progress
   - Adds a small Dashboard / Courses dock on every page
========================================================= */

import { requireAuth, currentPage } from "./nexora-core.js";

const page = currentPage();

function reveal() {
    document.documentElement.classList.remove("nx-auth-pending");
}

/* If Firebase can't be reached, don't leave a blank page forever. */
const failsafe = setTimeout(reveal, 8000);

function addDock() {
    if (page === "dashboard.html" || document.getElementById("nexoraDock")) {
        return;
    }

    const style = document.createElement("style");

    style.textContent = `
        #nexoraDock {
            position: fixed;
            left: 18px;
            bottom: 18px;
            z-index: 9990;
            display: flex;
            gap: 4px;
            padding: 5px;
            border-radius: 14px;
            background: rgba(5, 5, 12, .82);
            border: 1px solid rgba(168, 85, 247, .28);
            backdrop-filter: blur(14px);
            font-family: 'Outfit', system-ui, sans-serif;
        }

        #nexoraDock a {
            padding: 8px 14px;
            border-radius: 10px;
            color: #cfc8e6;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: .4px;
            text-decoration: none;
            transition: background .2s, color .2s;
        }

        #nexoraDock a:hover,
        #nexoraDock a:focus-visible {
            background: rgba(124, 58, 237, .28);
            color: #fff;
            outline: none;
        }

        @media (max-width: 600px) {
            #nexoraDock { left: 10px; bottom: 10px; }
        }
    `;

    const dock = document.createElement("nav");

    dock.id = "nexoraDock";
    dock.setAttribute("aria-label", "Nexora quick navigation");

    dock.innerHTML = `
        <a href="dashboard.html">Dashboard</a>
        <a href="courses.html">Courses</a>
        <a href="index.html">Home</a>
    `;

    document.head.appendChild(style);
    document.body.appendChild(dock);
}

requireAuth().then((user) => {
    clearTimeout(failsafe);

    if (!user) return;

    reveal();
    addDock();

    const moduleForPage = {
        "python-home.html": "python",
        "python.html": "python",
        "deeplearning.html": "dl",
        "computer-vision.html": "cv",
        "cyber.html": "cyber",
        "networking.html": "net"
    };

    if (moduleForPage[page]) {
        localStorage.setItem("nexoraLastModule", moduleForPage[page]);
    }

    window.dispatchEvent(
        new CustomEvent("nexora:ready", { detail: { user } })
    );
});
