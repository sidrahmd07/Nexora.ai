// =========================================
// NEXORA SIGNUP — FIREBASE AUTH
// =========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";


// =========================================
// FIREBASE CONFIG
// =========================================

const firebaseConfig = {
    apiKey: "AIzaSyA3TEbBax-ynl5PNSrOo90jmVcVR2SHNrg",
    authDomain: "nexora-40249.firebaseapp.com",
    projectId: "nexora-40249",
    storageBucket: "nexora-40249.firebasestorage.app",
    messagingSenderId: "296414066166",
    appId: "1:296414066166:web:baa9a4806a220813ef03d7"
};


// =========================================
// INITIALIZE FIREBASE
// =========================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// =========================================
// ELEMENTS
// =========================================

const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const togglePassword =
    document.getElementById("togglePassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

const signupMessage =
    document.getElementById("signupMessage");


// =========================================
// MESSAGE FUNCTION
// =========================================

function showMessage(message, type = "") {

    signupMessage.textContent = message;

    signupMessage.className = "signup-message";

    if (type) {
        signupMessage.classList.add(type);
    }
}


// =========================================
// PASSWORD TOGGLE
// =========================================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "◎";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "◉";
    }

});


toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPasswordInput.type === "password") {

        confirmPasswordInput.type = "text";
        toggleConfirmPassword.textContent = "◎";

    } else {

        confirmPasswordInput.type = "password";
        toggleConfirmPassword.textContent = "◉";
    }

});


// =========================================
// SIGNUP
// =========================================

signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    // =====================================
    // BASIC VALIDATION
    // =====================================

    if (!name) {

        showMessage(
            "Please enter your full name.",
            "error"
        );

        return;
    }


    if (!email) {

        showMessage(
            "Please enter your email.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    if (password !== confirmPassword) {

        showMessage(
            "Passwords do not match.",
            "error"
        );

        return;
    }


    // =====================================
    // LOADING STATE
    // =====================================

    const signupButton =
        signupForm.querySelector(".signup-button");

    const originalButtonHTML =
        signupButton.innerHTML;

    signupButton.disabled = true;

    signupButton.innerHTML = `
        <span>CREATING ACCOUNT...</span>
        <span class="button-arrow">◌</span>
    `;

    showMessage("Initializing Nexora account...");


    try {

        // =================================
        // CREATE FIREBASE ACCOUNT
        // =================================

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;


        // =================================
        // SAVE USER DISPLAY NAME
        // =================================

        await updateProfile(user, {
            displayName: name
        });


        // =================================
        // SUCCESS
        // =================================

        showMessage(
            "Account created successfully. Welcome, Nexorian.",
            "success"
        );


        signupButton.innerHTML = `
            <span>ACCOUNT CREATED ✓</span>
            <span class="button-arrow">→</span>
        `;


        // =================================
        // GO TO LOGIN
        // =================================

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1800);


    } catch (error) {

        console.error("Signup error:", error);


        // =================================
        // FIREBASE ERRORS
        // =================================

        let message =
            "Unable to create your account.";


        switch (error.code) {

            case "auth/email-already-in-use":

                message =
                    "This email is already registered.";

                break;


            case "auth/invalid-email":

                message =
                    "Please enter a valid email address.";

                break;


            case "auth/weak-password":

                message =
                    "Your password is too weak.";

                break;


            case "auth/network-request-failed":

                message =
                    "Network error. Check your internet connection.";

                break;


            case "auth/operation-not-allowed":

                message =
                    "Email/password signup is not enabled in Firebase.";

                break;


            case "auth/too-many-requests":

                message =
                    "Too many attempts. Please try again later.";

                break;
        }


        showMessage(message, "error");


        // Restore button

        signupButton.disabled = false;

        signupButton.innerHTML =
            originalButtonHTML;
    }

});

/* =====================================================
   NEXORA GALAXY — CINEMATIC SPACE BACKGROUND
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const space = document.createElement("div");
    space.className = "nexora-space";

    /* -----------------------------
       STAR FIELD
    ----------------------------- */

    const stars = document.createElement("div");
    stars.className = "galaxy-stars";

    for (let i = 0; i < 150; i++) {

        const star = document.createElement("span");

        star.className = "galaxy-star";

        star.style.left =
            (50 + Math.random() * 50) + "%";

        star.style.top =
            Math.random() * 100 + "%";

        const size =
            Math.random() > 0.9
                ? 3
                : Math.random() > 0.7
                    ? 2
                    : 1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.setProperty(
            "--duration",
            (2 + Math.random() * 5) + "s"
        );

        star.style.animationDelay =
            (-Math.random() * 5) + "s";

        stars.appendChild(star);
    }

    space.appendChild(stars);


    /* -----------------------------
       GALAXY DUST
    ----------------------------- */

    const dust =
        document.createElement("div");

    dust.className =
        "galaxy-dust";

    space.appendChild(dust);


    /* -----------------------------
       ORBITS
    ----------------------------- */

    const orbitSizes = [
        "orbit-1",
        "orbit-2",
        "orbit-3",
        "orbit-4"
    ];

    orbitSizes.forEach((size, index) => {

        const orbit =
            document.createElement("div");

        orbit.className =
            `galaxy-orbit ${size}`;

        orbit.style.setProperty(
            "--orbit-speed",
            `${18 + index * 8}s`
        );

        orbit.style.animationDirection =
            index % 2 === 0
                ? "normal"
                : "reverse";

        space.appendChild(orbit);
    });


    /* -----------------------------
       MAIN PLANET
    ----------------------------- */

    const mainPlanet =
        document.createElement("div");

    mainPlanet.className =
        "galaxy-planet planet-main";

    space.appendChild(mainPlanet);


    /* -----------------------------
       BLUE PLANET
    ----------------------------- */

    const bluePlanet =
        document.createElement("div");

    bluePlanet.className =
        "galaxy-planet planet-blue";

    space.appendChild(bluePlanet);


    /* -----------------------------
       RED/PURPLE PLANET
    ----------------------------- */

    const redPlanet =
        document.createElement("div");

    redPlanet.className =
        "galaxy-planet planet-red";

    space.appendChild(redPlanet);


    /* -----------------------------
       TINY PLANET
    ----------------------------- */

    const tinyPlanet =
        document.createElement("div");

    tinyPlanet.className =
        "galaxy-planet planet-tiny";

    space.appendChild(tinyPlanet);


    /* -----------------------------
       MOON
    ----------------------------- */

    const moon =
        document.createElement("div");

    moon.className =
        "planet-moon moon-main";

    space.appendChild(moon);


    /* -----------------------------
       ENERGY CORE
    ----------------------------- */

    const core =
        document.createElement("div");

    core.className =
        "galaxy-core";

    space.appendChild(core);


    /* -----------------------------
       SHOOTING STARS
    ----------------------------- */

    for (let i = 0; i < 3; i++) {

        const shooting =
            document.createElement("div");

        shooting.className =
            "shooting-star";

        space.appendChild(shooting);
    }


    /* -----------------------------
       INSERT INTO PAGE
    ----------------------------- */

    document.body.appendChild(space);

    console.log(
        "NEXORA GALAXY SYSTEM ONLINE"
    );

});