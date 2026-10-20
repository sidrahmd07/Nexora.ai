/* =====================================================
   NEXORA 3D LOGIN
   THREE.JS + FIREBASE AUTHENTICATION
   DEMON VIOLET + ELECTRIC BLUE SYSTEM
===================================================== */

import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from
    "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
    initializeApp
} from
    "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";


/* =====================================================
   FIREBASE
===================================================== */

const firebaseConfig = {

    apiKey:
        "AIzaSyA3TEbBax-ynl5PNSrOo90jmVcVR2SHNrg",

    authDomain:
        "nexora-40249.firebaseapp.com",

    projectId:
        "nexora-40249",

    storageBucket:
        "nexora-40249.firebasestorage.app",

    messagingSenderId:
        "296414066166",

    appId:
        "1:296414066166:web:baa9a4806a220813ef03d7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


/* =====================================================
   GET CONTAINER
===================================================== */

const container =
    document.getElementById("three-container");

if (!container) {

    console.error(
        "NEXORA: #three-container not found."
    );

    throw new Error(
        "Three.js container missing."
    );
}


/* =====================================================
   THREE.JS SCENE
===================================================== */

const scene = new THREE.Scene();

scene.fog =
    new THREE.FogExp2(
        0x020006,
        0.035
    );


/* =====================================================
   CAMERA
===================================================== */

const camera =
    new THREE.PerspectiveCamera(
        45,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
    );

camera.position.set(
    0,
    0.2,
    8
);


/* =====================================================
   RENDERER
===================================================== */

const renderer =
    new THREE.WebGLRenderer({

        antialias: true,
        alpha: true

    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.15;

container.appendChild(
    renderer.domElement
);


/* =====================================================
   LIGHTING
===================================================== */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.32
    );

scene.add(
    ambientLight
);


/* MAIN VIOLET LIGHT */

const violetLight =
    new THREE.PointLight(
        0x7c3aed,
        18,
        12
    );

violetLight.position.set(
    2.8,
    1.5,
    3
);

scene.add(
    violetLight
);


/* ELECTRIC BLUE LIGHT */

const blueLight =
    new THREE.PointLight(
        0x2563eb,
        10,
        11
    );

blueLight.position.set(
    -2.8,
    -0.5,
    2
);

scene.add(
    blueLight
);


/* WHITE EDGE LIGHT */

const whiteLight =
    new THREE.PointLight(
        0xffffff,
        6,
        10
    );

whiteLight.position.set(
    -3,
    2,
    2
);

scene.add(
    whiteLight
);


/* =====================================================
   NEXORA AI CORE
===================================================== */

const coreGroup =
    new THREE.Group();

coreGroup.position.set(
    2.2,
    0.15,
    0
);

scene.add(
    coreGroup
);


/* =====================================================
   OUTER BLACK ENERGY SHELL
===================================================== */

const shellGeometry =
    new THREE.IcosahedronGeometry(
        1.55,
        4
    );

const shellMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x050008,
        metalness: 1,
        roughness: 0.18,

        emissive: 0x24004a,
        emissiveIntensity: 0.75

    });

const shell =
    new THREE.Mesh(
        shellGeometry,
        shellMaterial
    );

coreGroup.add(
    shell
);


/* =====================================================
   VIOLET / BLUE WIREFRAME
===================================================== */

const wireGeometry =
    new THREE.IcosahedronGeometry(
        1.62,
        3
    );

const wireMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.34

    });

const wire =
    new THREE.Mesh(
        wireGeometry,
        wireMaterial
    );

coreGroup.add(
    wire
);


/* =====================================================
   INNER ENERGY CORE
===================================================== */

const innerGeometry =
    new THREE.IcosahedronGeometry(
        0.68,
        4
    );

const innerMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xa855f7,
        metalness: 0.95,
        roughness: 0.12,

        emissive: 0x7c3aed,
        emissiveIntensity: 2.5

    });

const inner =
    new THREE.Mesh(
        innerGeometry,
        innerMaterial
    );

coreGroup.add(
    inner
);


/* =====================================================
   INNER BLUE CORE
===================================================== */

const blueCoreGeometry =
    new THREE.IcosahedronGeometry(
        0.38,
        3
    );

const blueCoreMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x22d3ee,
        transparent: true,
        opacity: 0.75

    });

const blueCore =
    new THREE.Mesh(
        blueCoreGeometry,
        blueCoreMaterial
    );

coreGroup.add(
    blueCore
);


/* =====================================================
   BLACK VOID
===================================================== */

const voidGeometry =
    new THREE.SphereGeometry(
        0.25,
        32,
        32
    );

const voidMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x000000
    });

const voidCore =
    new THREE.Mesh(
        voidGeometry,
        voidMaterial
    );

coreGroup.add(
    voidCore
);


/* =====================================================
   ENERGY RINGS
===================================================== */

function createEnergyRing(
    radius,
    thickness,
    opacity,
    color
) {

    const geometry =
        new THREE.TorusGeometry(
            radius,
            thickness,
            12,
            160
        );

    const material =
        new THREE.MeshBasicMaterial({

            color,
            transparent: true,
            opacity

        });

    return new THREE.Mesh(
        geometry,
        material
    );
}


/* VIOLET RING */

const ring1 =
    createEnergyRing(
        2.0,
        0.018,
        0.55,
        0xa855f7
    );

ring1.rotation.x =
    Math.PI / 2.4;

coreGroup.add(
    ring1
);


/* BLUE RING */

const ring2 =
    createEnergyRing(
        1.75,
        0.012,
        0.42,
        0x22d3ee
    );

ring2.rotation.y =
    Math.PI / 2.7;

ring2.rotation.z =
    Math.PI / 5;

coreGroup.add(
    ring2
);


/* OUTER BLUE/VIOLET RING */

const ring3 =
    createEnergyRing(
        2.35,
        0.01,
        0.22,
        0x7c3aed
    );

ring3.rotation.x =
    Math.PI / 3;

coreGroup.add(
    ring3
);


/* =====================================================
   ORBITING ORBS
===================================================== */

const orbGroup =
    new THREE.Group();

coreGroup.add(
    orbGroup
);


for (
    let i = 0;
    i < 10;
    i++
) {

    const angle =
        (Math.PI * 2 / 10) * i;

    const orbGeometry =
        new THREE.SphereGeometry(
            0.045,
            12,
            12
        );

    const orbMaterial =
        new THREE.MeshBasicMaterial({

            color:
                i % 2 === 0
                    ? 0xa855f7
                    : 0x22d3ee

        });

    const orb =
        new THREE.Mesh(
            orbGeometry,
            orbMaterial
        );

    orb.position.set(

        Math.cos(angle) * 1.9,
        Math.sin(angle) * 1.9,
        0

    );

    orbGroup.add(
        orb
    );
}


/* =====================================================
   PARTICLES
===================================================== */

const particleCount =
    1200;

const particleGeometry =
    new THREE.BufferGeometry();

const particlePositions =
    new Float32Array(
        particleCount * 3
    );


for (
    let i = 0;
    i < particleCount;
    i++
) {

    const radius =
        2.5 +
        Math.random() * 5.5;

    const angle =
        Math.random() *
        Math.PI *
        2;

    particlePositions[i * 3] =
        Math.cos(angle) * radius;

    particlePositions[i * 3 + 1] =
        (Math.random() - 0.5) * 7;

    particlePositions[i * 3 + 2] =
        Math.sin(angle) * radius;
}


particleGeometry.setAttribute(
    "position",

    new THREE.BufferAttribute(
        particlePositions,
        3
    )
);


const particleMaterial =
    new THREE.PointsMaterial({

        color: 0xa855f7,
        size: 0.022,
        transparent: true,
        opacity: 0.68,
        depthWrite: false

    });


const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(
    particles
);


/* =====================================================
   FLOOR GRID
===================================================== */

const grid =
    new THREE.GridHelper(
        30,
        40,
        0x7c3aed,
        0x151020
    );

grid.position.y =
    -2.35;

grid.material.transparent =
    true;

grid.material.opacity =
    0.09;

scene.add(
    grid
);


/* =====================================================
   BACKGROUND RINGS
===================================================== */

const backgroundRings = [];


for (
    let i = 0;
    i < 4;
    i++
) {

    const geometry =
        new THREE.RingGeometry(
            2.8 + i * 0.9,
            2.81 + i * 0.9,
            96
        );

    const material =
        new THREE.MeshBasicMaterial({

            color:
                i % 2 === 0
                    ? 0x7c3aed
                    : 0x2563eb,

            transparent: true,
            opacity: 0.055,
            side: THREE.DoubleSide

        });

    const circle =
        new THREE.Mesh(
            geometry,
            material
        );

    circle.position.set(
        2.2,
        0,
        -2.5
    );

    circle.rotation.x =
        Math.PI / 2;

    scene.add(
        circle
    );

    backgroundRings.push(
        circle
    );
}


/* =====================================================
   MOUSE
===================================================== */

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;


window.addEventListener(
    "mousemove",
    (event) => {

        targetMouseX =
            (event.clientX /
                window.innerWidth) * 2 - 1;

        targetMouseY =
            (event.clientY /
                window.innerHeight) * 2 - 1;

    }
);


/* =====================================================
   CLOCK
===================================================== */

const clock =
    new THREE.Clock();


/* =====================================================
   ANIMATION
===================================================== */

function animate() {

    requestAnimationFrame(
        animate
    );

    const elapsed =
        clock.getElapsedTime();


    mouseX +=
        (targetMouseX - mouseX) *
        0.035;

    mouseY +=
        (targetMouseY - mouseY) *
        0.035;


    /* OUTER SHELL */

    shell.rotation.x =
        elapsed * 0.08;

    shell.rotation.y =
        elapsed * 0.16;


    /* WIREFRAME */

    wire.rotation.x =
        elapsed * -0.12;

    wire.rotation.y =
        elapsed * -0.2;


    /* INNER CORE */

    inner.rotation.x =
        elapsed * 0.35;

    inner.rotation.y =
        elapsed * -0.45;


    /* BLUE CORE */

    blueCore.rotation.x =
        elapsed * -0.5;

    blueCore.rotation.y =
        elapsed * 0.65;

    blueCore.scale.setScalar(
        1 +
        Math.sin(elapsed * 2.4) * 0.08
    );


    /* VOID */

    voidCore.scale.setScalar(
        1 +
        Math.sin(elapsed * 2) * 0.08
    );


    /* FLOATING */

    coreGroup.position.y =
        0.15 +
        Math.sin(elapsed * 1.15) * 0.12;


    /* RINGS */

    ring1.rotation.z =
        elapsed * 0.25;

    ring2.rotation.x =
        elapsed * 0.18;

    ring2.rotation.z =
        elapsed * -0.3;

    ring3.rotation.y =
        elapsed * 0.14;


    /* ORBS */

    orbGroup.rotation.z =
        elapsed * 0.7;

    orbGroup.rotation.y =
        Math.sin(elapsed * 0.5) * 0.15;


    /* MOUSE PARALLAX */

    coreGroup.rotation.y +=
        (
            mouseX * 0.35 -
            coreGroup.rotation.y
        ) * 0.025;

    coreGroup.rotation.x +=
        (
            -mouseY * 0.18 -
            coreGroup.rotation.x
        ) * 0.025;


    /* CAMERA */

    camera.position.x +=
        (
            mouseX * 0.25 -
            camera.position.x
        ) * 0.02;

    camera.position.y +=
        (
            -mouseY * 0.15 +
            0.2 -
            camera.position.y
        ) * 0.02;

    camera.lookAt(
        1.1,
        0,
        0
    );


    /* PARTICLES */

    particles.rotation.y =
        elapsed * 0.012;

    particles.rotation.x =
        Math.sin(elapsed * 0.08) *
        0.025;


    /* GRID */

    grid.position.z =
        (elapsed * 0.08) % 1;


    /* BACKGROUND RINGS */

    backgroundRings.forEach(
        (circle, index) => {

            circle.rotation.z =
                elapsed *
                (0.01 + index * 0.004);

        }
    );


    /* VIOLET LIGHT */

    violetLight.position.x =
        2.8 +
        Math.sin(elapsed * 0.7) * 1.2;

    violetLight.position.y =
        1.5 +
        Math.cos(elapsed * 0.8) * 0.7;


    /* BLUE LIGHT */

    blueLight.position.x =
        -2.8 +
        Math.cos(elapsed * 0.6) * 1.1;

    blueLight.position.y =
        -0.5 +
        Math.sin(elapsed * 0.9) * 0.8;


    renderer.render(
        scene,
        camera
    );
}


animate();


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);


/* =====================================================
   PASSWORD TOGGLE
===================================================== */

const password =
    document.getElementById(
        "password"
    );

const togglePassword =
    document.getElementById(
        "togglePassword"
    );


if (
    password &&
    togglePassword
) {

    togglePassword.addEventListener(
        "click",
        () => {

            if (
                password.type ===
                "password"
            ) {

                password.type =
                    "text";

                togglePassword.textContent =
                    "◉";

            } else {

                password.type =
                    "password";

                togglePassword.textContent =
                    "◉";

            }

        }
    );

}


/* =====================================================
   LOGIN FORM
===================================================== */

const loginForm =
    document.getElementById(
        "loginForm"
    );


/* =====================================================
   LOGIN MESSAGE
===================================================== */

function showLoginMessage(
    message,
    type = "error"
) {

    let messageBox =
        document.getElementById(
            "loginMessage"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );

        messageBox.id =
            "loginMessage";

        loginForm?.appendChild(
            messageBox
        );

    }


    messageBox.textContent =
        message;

    messageBox.style.marginTop =
        "12px";

    messageBox.style.fontSize =
        "12px";

    messageBox.style.letterSpacing =
        "0.5px";

    messageBox.style.textAlign =
        "center";

    messageBox.style.fontFamily =
        "'Rajdhani', sans-serif";

    messageBox.style.color =
        type === "success"
            ? "#22d3ee"
            : "#f87171";

    messageBox.style.textShadow =
        type === "success"
            ? "0 0 12px rgba(34,211,238,.45)"
            : "0 0 12px rgba(248,113,113,.35)";
}


/* =====================================================
   LOGIN FORM
===================================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const passwordValue =
                document
                    .getElementById("password")
                    .value;

            const remember =
                document
                    .getElementById("remember")
                    ?.checked;


            if (!email || !passwordValue) {

                showLoginMessage(
                    "Enter your email and password."
                );

                return;
            }


            const loginButton =
                loginForm.querySelector(
                    ".login-button"
                );


            if (loginButton) {

                loginButton.disabled =
                    true;

                loginButton
                    .querySelector("span")
                    .textContent =
                    "AUTHENTICATING...";

            }


            try {

                /* REMEMBER ME */

                await setPersistence(

                    auth,

                    remember
                        ? browserLocalPersistence
                        : browserSessionPersistence

                );


                /* FIREBASE LOGIN */

                const result =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        passwordValue
                    );


                console.log(
                    "NEXORA LOGIN SUCCESS:",
                    result.user.email
                );


                showLoginMessage(
                    "ACCESS GRANTED — ENTERING NEXORA...",
                    "success"
                );


                setTimeout(() => {

                    window.location.href = nexoraNextPage();

                }, 700);


            } catch (error) {

                console.error(
                    "NEXORA LOGIN ERROR:",
                    error
                );


                let message =
                    "Login failed. Please try again.";


                switch (error.code) {

                    case "auth/invalid-credential":

                    case "auth/wrong-password":

                    case "auth/user-not-found":

                        message =
                            "Invalid email or password.";

                        break;


                    case "auth/invalid-email":

                        message =
                            "Enter a valid email address.";

                        break;


                    case "auth/too-many-requests":

                        message =
                            "Too many attempts. Try again later.";

                        break;


                    case "auth/network-request-failed":

                        message =
                            "Network error. Check your internet.";

                        break;

                }


                showLoginMessage(
                    message
                );


                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton
                        .querySelector("span")
                        .textContent =
                        "ENTER NEXORA";

                }

            }

        }
    );

}


/* =====================================================
   GOOGLE LOGIN
===================================================== */

const googleButton =
    document.querySelector(
        ".social-login"
    );


if (googleButton) {

    googleButton.addEventListener(
        "click",
        async () => {

            try {

                googleButton.disabled =
                    true;

                googleButton.textContent =
                    "CONNECTING...";


                await signInWithPopup(
                    auth,
                    googleProvider
                );


                showLoginMessage(
                    "GOOGLE ACCESS GRANTED — ENTERING NEXORA...",
                    "success"
                );


                setTimeout(() => {

                    window.location.href = nexoraNextPage();

                }, 700);


            } catch (error) {

                console.error(
                    "GOOGLE LOGIN ERROR:",
                    error
                );


                if (
                    error.code ===
                    "auth/popup-closed-by-user"
                ) {

                    showLoginMessage(
                        "Google login cancelled."
                    );

                } else {

                    showLoginMessage(
                        "Google login failed. Try again."
                    );

                }


                googleButton.disabled =
                    false;

                googleButton.textContent =
                    "CONTINUE WITH GOOGLE";

            }

        }
    );

}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "email"
                );


            const email =
                emailInput
                    ?.value
                    .trim();


            if (!email) {

                showLoginMessage(
                    "Enter your email first."
                );

                emailInput?.focus();

                return;

            }


            try {

                await sendPasswordResetEmail(
                    auth,
                    email
                );


                showLoginMessage(
                    "Password reset email sent.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "PASSWORD RESET ERROR:",
                    error
                );


                if (
                    error.code ===
                    "auth/invalid-email"
                ) {

                    showLoginMessage(
                        "Enter a valid email address."
                    );

                } else {

                    showLoginMessage(
                        "Could not send reset email."
                    );

                }

            }

        }
    );

}


/* =====================================================
   SYSTEM READY
===================================================== */

console.log(
    "%c NEXORA 3D SYSTEM ONLINE ",
    "background:#7c3aed;color:#fff;padding:6px 12px;font-weight:bold;"
);

/* =====================================================
   WHERE TO GO AFTER LOGIN
   Back to the page that asked for login, else dashboard.
===================================================== */
function nexoraNextPage() {
    const next = new URLSearchParams(window.location.search).get("next") || "";

    const safe =
        /^[a-z0-9-]+\.html$/i.test(next) &&
        next !== "login.html" &&
        next !== "signup.html";

    return safe ? next : "dashboard.html";
}
