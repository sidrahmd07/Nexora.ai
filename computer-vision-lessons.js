/* =========================================================
   NEXORA — COMPUTER VISION LESSONS
   The five stages of the Computer Vision mission:
   notes, visual lessons, quiz, practice and challenge.

   computer-vision.js owns XP and progress. When a stage is
   finished, this file calls window.nexoraCompleteStage(stage).
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       STYLES
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `
        .cvm-overlay {
            position: fixed;
            inset: 0;
            z-index: 5000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(0, 0, 0, .78);
            backdrop-filter: blur(12px);
        }

        .cvm-panel {
            position: relative;
            width: min(680px, 100%);
            max-height: 88vh;
            overflow-y: auto;
            padding: 38px;
            border-radius: 24px;
            background: linear-gradient(145deg, #090712, #05050b);
            border: 1px solid rgba(168, 85, 247, .35);
            box-shadow: 0 0 60px rgba(124, 58, 237, .2);
            font-family: 'Outfit', sans-serif;
            color: #fff;
        }

        .cvm-close {
            position: absolute;
            top: 16px;
            right: 18px;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 1px solid rgba(168, 85, 247, .25);
            background: rgba(255, 255, 255, .04);
            color: #fff;
            font-size: 22px;
            cursor: pointer;
        }

        .cvm-close:hover { background: #7C3AED; }

        .cvm-label {
            color: #A855F7;
            font-size: 12px;
            letter-spacing: 1.5px;
        }

        .cvm-panel h2 {
            margin: 8px 0 18px;
            font-size: 28px;
        }

        .cvm-panel h3 {
            margin: 22px 0 8px;
            color: #A855F7;
            font-size: 18px;
        }

        .cvm-panel p,
        .cvm-panel li {
            color: #bdbdc8;
            line-height: 1.75;
        }

        .cvm-panel ul { padding-left: 20px; }

        .cvm-done-tag {
            display: inline-block;
            margin-left: 10px;
            padding: 3px 10px;
            border-radius: 999px;
            font-size: 11px;
            color: #22c55e;
            border: 1px solid rgba(34, 197, 94, .4);
        }

        .cvm-steps {
            margin-top: 6px;
            font-size: 13px;
            color: #888;
        }

        .cvm-actions {
            margin-top: 28px;
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: space-between;
        }

        .cvm-btn {
            padding: 12px 24px;
            border-radius: 12px;
            border: 1px solid rgba(168, 85, 247, .3);
            background: rgba(255, 255, 255, .04);
            color: #fff;
            font: inherit;
            font-weight: 600;
            cursor: pointer;
            transition: transform .2s, background .2s;
        }

        .cvm-btn:hover:not(:disabled) { transform: translateY(-2px); }

        .cvm-btn.primary {
            border: none;
            background: linear-gradient(135deg, #7C3AED, #2563EB);
        }

        .cvm-btn:disabled { opacity: .4; cursor: not-allowed; }

        .cvm-grid {
            display: grid;
            gap: 3px;
            width: fit-content;
            margin: 16px 0;
        }

        .cvm-cell {
            width: 34px;
            height: 34px;
            border: none;
            border-radius: 4px;
            padding: 0;
        }

        button.cvm-cell { cursor: pointer; }

        .cvm-readout {
            min-height: 26px;
            color: #A855F7;
            font-weight: 600;
        }

        .cvm-swatch {
            width: 100%;
            height: 90px;
            margin: 14px 0;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, .12);
        }

        .cvm-slider {
            display: grid;
            grid-template-columns: 26px 1fr 40px;
            gap: 12px;
            align-items: center;
            margin: 8px 0;
            color: #bdbdc8;
        }

        .cvm-slider input { width: 100%; accent-color: #A855F7; }

        .cvm-strip { display: flex; gap: 4px; margin: 14px 0; }

        .cvm-strip .cvm-cell {
            width: 100%;
            height: 54px;
            display: grid;
            place-items: center;
            font-size: 12px;
            font-weight: 700;
        }

        .cvm-option {
            display: block;
            width: 100%;
            margin: 8px 0;
            padding: 14px 18px;
            border-radius: 12px;
            text-align: left;
            font: inherit;
            color: #fff;
            cursor: pointer;
            background: rgba(255, 255, 255, .035);
            border: 1px solid rgba(168, 85, 247, .2);
        }

        .cvm-option:hover:not(:disabled) { border-color: #7C3AED; }

        .cvm-option.right {
            background: rgba(34, 197, 94, .14);
            border-color: #22c55e;
        }

        .cvm-option.wrong {
            background: rgba(239, 68, 68, .14);
            border-color: #ef4444;
        }

        .cvm-feedback { min-height: 24px; margin-top: 10px; font-weight: 600; }
        .cvm-feedback.good { color: #22c55e; }
        .cvm-feedback.bad { color: #ef4444; }

        .cvm-timer {
            height: 6px;
            margin: 14px 0 4px;
            border-radius: 6px;
            background: rgba(255, 255, 255, .07);
            overflow: hidden;
        }

        .cvm-timer div {
            height: 100%;
            width: 100%;
            background: linear-gradient(90deg, #7C3AED, #2563EB);
        }

        @media (max-width: 600px) {
            .cvm-panel { padding: 28px 20px; }
            .cvm-cell { width: 28px; height: 28px; }
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       HELPERS
    ===================================================== */

    function el(tag, className, html) {
        const node = document.createElement(tag);

        if (className) node.className = className;
        if (html !== undefined) node.innerHTML = html;

        return node;
    }

    function isDone(stage) {
        try {
            return (JSON.parse(
                localStorage.getItem("nexoraComputerVisionStages")
            ) || []).includes(stage);
        } catch (error) {
            return false;
        }
    }

    function complete(stage) {
        if (window.nexoraCompleteStage) window.nexoraCompleteStage(stage);
    }

    let overlay = null;
    let lastFocus = null;

    function closeModal() {
        if (!overlay) return;

        overlay.remove();
        overlay = null;

        document.body.style.overflow = "";

        if (lastFocus) lastFocus.focus();
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
    });

    function openModal(label, title, stage) {
        closeModal();

        lastFocus = document.activeElement;

        overlay = el("div", "cvm-overlay");

        const panel = el("div", "cvm-panel");

        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-modal", "true");
        panel.setAttribute("aria-labelledby", "cvmTitle");

        const close = el("button", "cvm-close", "×");

        close.setAttribute("aria-label", "Close");
        close.addEventListener("click", closeModal);

        const done = isDone(stage)
            ? '<span class="cvm-done-tag">Completed</span>'
            : "";

        panel.appendChild(close);
        panel.appendChild(el("div", "cvm-label", label));
        panel.appendChild(el("h2", "", title + done)).id = "cvmTitle";

        const body = el("div");

        panel.appendChild(body);
        overlay.appendChild(panel);

        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) closeModal();
        });

        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";

        close.focus();

        return body;
    }

    /* A step-by-step reader used by notes and visual lessons. */
    function pager(body, pages, finishLabel, onFinish) {
        let index = 0;

        function show() {
            body.innerHTML = "";

            const page = pages[index];

            body.appendChild(el("div", "cvm-steps", `Step ${index + 1} of ${pages.length}`));

            const content = el("div");

            page(content);

            body.appendChild(content);

            const actions = el("div", "cvm-actions");

            const back = el("button", "cvm-btn", "Back");

            back.disabled = index === 0;

            back.addEventListener("click", () => {
                index -= 1;
                show();
            });

            const last = index === pages.length - 1;

            const next = el("button", "cvm-btn primary", last ? finishLabel : "Next");

            next.addEventListener("click", () => {
                if (last) {
                    onFinish();
                    closeModal();
                } else {
                    index += 1;
                    show();
                }
            });

            actions.appendChild(back);
            actions.appendChild(next);

            body.appendChild(actions);
        }

        show();
    }

    function shuffle(list) {
        const copy = list.slice();

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;
    }

    function gray(value) {
        return `rgb(${value},${value},${value})`;
    }


    /* =====================================================
       STAGE 1 — NOTES
    ===================================================== */

    window.openNotes = function () {

        const body = openModal("STAGE 01", "Computer Vision notes", "notes");

        const pages = [

            (c) => c.innerHTML = `
                <h3>What is computer vision?</h3>
                <p>Computer vision is the part of AI that lets computers get useful information from images and video. Your phone unlocking with your face, a car reading a road sign and a doctor's scan being checked for problems all use it.</p>
                <p>A computer does not "see" a picture the way you do. It only receives numbers, and vision models learn which patterns of numbers mean which things.</p>
            `,

            (c) => c.innerHTML = `
                <h3>An image is a grid of pixels</h3>
                <p>A digital image is a grid of tiny squares called pixels. In a grayscale image each pixel is one number from 0 (black) to 255 (white). A 100 × 100 image is simply 10,000 numbers.</p>
                <p>Zooming in far enough on any photo shows these squares. The next stage lets you try it yourself.</p>
            `,

            (c) => c.innerHTML = `
                <h3>Colour comes from three channels</h3>
                <p>A colour pixel stores three numbers: red, green and blue, each from 0 to 255. Mixing them gives every colour on your screen.</p>
                <ul>
                    <li>(255, 0, 0) is pure red</li>
                    <li>(255, 255, 0) is yellow, because red and green light add up</li>
                    <li>(0, 0, 0) is black and (255, 255, 255) is white</li>
                </ul>
            `,

            (c) => c.innerHTML = `
                <h3>What computer vision can do</h3>
                <ul>
                    <li><strong>Classification:</strong> what is in this image? (cat or dog)</li>
                    <li><strong>Object detection:</strong> what is where? It draws boxes around each object.</li>
                    <li><strong>Segmentation:</strong> which pixels belong to which object?</li>
                    <li><strong>Face and text recognition:</strong> who is this, and what does the sign say?</li>
                </ul>
            `,

            (c) => c.innerHTML = `
                <h3>How models learn to see</h3>
                <p>Early vision systems used hand-written rules, such as "look for a sharp change in brightness to find an edge". Modern systems use <strong>convolutional neural networks (CNNs)</strong>. A CNN slides small filters across the image. Early filters pick up edges, later ones pick up shapes, and the last layers recognise whole objects.</p>
                <p>The network learns its filters from thousands of labelled examples, so nobody has to write the rules by hand.</p>
            `
        ];

        pager(body, pages, "Finish notes", () => complete("notes"));
    };


    /* =====================================================
       STAGE 2 — VISUAL LESSONS
    ===================================================== */

    const SMILEY = [
        "..........",
        "..##..##..",
        "..##..##..",
        "..........",
        "#........#",
        ".#......#.",
        "..######..",
        "..........",
        "..........",
        ".........."
    ];

    window.openVideos = function () {

        const body = openModal("STAGE 02", "Visual lessons", "videos");

        const pages = [

            /* ---- pixels ---- */
            (c) => {
                c.innerHTML = `
                    <h3>Zoom into a picture</h3>
                    <p>This 10 × 10 image is a smiley face. Hover over or tap any square to read its value.</p>
                `;

                const grid = el("div", "cvm-grid");

                grid.style.gridTemplateColumns = "repeat(10, auto)";

                const readout = el("div", "cvm-readout", "Pick a pixel");

                SMILEY.forEach((row, y) => {
                    [...row].forEach((char, x) => {
                        const value = char === "#" ? 235 : 25;

                        const cell = el("button", "cvm-cell");

                        cell.style.background = gray(value);

                        cell.setAttribute("aria-label", `Pixel row ${y + 1}, column ${x + 1}, value ${value}`);

                        const show = () => {
                            readout.textContent = `Row ${y + 1}, column ${x + 1} has value ${value}`;
                        };

                        cell.addEventListener("mouseenter", show);
                        cell.addEventListener("focus", show);
                        cell.addEventListener("click", show);

                        grid.appendChild(cell);
                    });
                });

                c.appendChild(grid);
                c.appendChild(readout);
                c.appendChild(el("p", "", "Dark pixels are close to 0 and bright pixels are close to 255. The whole picture is just these 100 numbers."));
            },

            /* ---- colour ---- */
            (c) => {
                c.innerHTML = `
                    <h3>Mix a colour</h3>
                    <p>Move the sliders. Every colour is a mix of red, green and blue.</p>
                `;

                const swatch = el("div", "cvm-swatch");
                const readout = el("div", "cvm-readout");

                const values = { R: 120, G: 60, B: 200 };

                function paint() {
                    swatch.style.background = `rgb(${values.R},${values.G},${values.B})`;
                    readout.textContent = `(${values.R}, ${values.G}, ${values.B})`;
                }

                c.appendChild(swatch);

                Object.keys(values).forEach((channel) => {
                    const row = el("label", "cvm-slider");

                    row.innerHTML = `<span>${channel}</span>`;

                    const input = document.createElement("input");

                    input.type = "range";
                    input.min = 0;
                    input.max = 255;
                    input.value = values[channel];

                    const number = el("span", "", String(values[channel]));

                    input.addEventListener("input", () => {
                        values[channel] = Number(input.value);
                        number.textContent = input.value;
                        paint();
                    });

                    row.appendChild(input);
                    row.appendChild(number);
                    c.appendChild(row);
                });

                c.appendChild(readout);
                paint();
            },

            /* ---- threshold ---- */
            (c) => {
                c.innerHTML = `
                    <h3>Turn gray into black and white</h3>
                    <p>Thresholding is one of the simplest vision tricks. Every pixel brighter than the threshold becomes white and the rest become black. It is often the first step in finding an object in a photo.</p>
                `;

                const levels = [10, 35, 70, 105, 140, 175, 210, 245];

                const strip = el("div", "cvm-strip");

                const input = document.createElement("input");

                input.type = "range";
                input.min = 0;
                input.max = 255;
                input.value = 128;
                input.style.cssText = "width:100%;accent-color:#A855F7;";
                input.setAttribute("aria-label", "Threshold");

                const readout = el("div", "cvm-readout");

                function paint() {
                    const t = Number(input.value);

                    strip.innerHTML = "";

                    levels.forEach((value) => {
                        const cell = el("div", "cvm-cell", String(value));

                        const white = value > t;

                        cell.style.background = white ? "#fff" : "#000";
                        cell.style.color = white ? "#000" : "#fff";

                        strip.appendChild(cell);
                    });

                    readout.textContent = `Threshold ${t}: ${levels.filter((v) => v > t).length} of ${levels.length} pixels are white`;
                }

                input.addEventListener("input", paint);

                c.appendChild(strip);
                c.appendChild(input);
                c.appendChild(readout);

                paint();
            }
        ];

        pager(body, pages, "Finish lessons", () => complete("videos"));
    };


    /* =====================================================
       QUESTION BANKS
    ===================================================== */

    const QUIZ = [
        {
            q: "What does a computer actually receive when it looks at an image?",
            a: ["A description in words", "A grid of numbers", "A video stream only", "A set of colours' names"],
            c: 1
        },
        {
            q: "In a grayscale image, what does a pixel value of 255 mean?",
            a: ["Black", "Gray", "White", "Transparent"],
            c: 2
        },
        {
            q: "How many numbers does one colour (RGB) pixel store?",
            a: ["One", "Two", "Three", "Four hundred"],
            c: 2
        },
        {
            q: "Which task draws boxes around each object in a photo?",
            a: ["Classification", "Object detection", "Thresholding", "Compression"],
            c: 1
        },
        {
            q: "What do the first filters in a CNN usually pick up?",
            a: ["Whole faces", "Edges", "Captions", "File names"],
            c: 1
        },
        {
            q: "What is a pixel?",
            a: ["A type of camera", "One tiny square of an image", "A neural network layer", "A colour name"],
            c: 1
        }
    ];

    const CHALLENGE = [
        {
            q: "Which RGB value is pure red?",
            a: ["(0, 255, 0)", "(255, 0, 0)", "(0, 0, 255)", "(255, 255, 255)"],
            c: 1
        },
        {
            q: "A 50 × 50 grayscale image has how many pixel values?",
            a: ["50", "100", "2,500", "250"],
            c: 2
        },
        {
            q: "Thresholding at 100 makes a pixel of value 180 turn...",
            a: ["Black", "White", "Red", "It disappears"],
            c: 1
        },
        {
            q: "Which one is a computer vision task?",
            a: ["Translating a sentence", "Finding the cat in a photo", "Sorting a spreadsheet", "Sending an email"],
            c: 1
        },
        {
            q: "What does a CNN learn from?",
            a: ["Hand-written rules only", "Labelled example images", "The screen size", "The file format"],
            c: 1
        }
    ];


    /* A question runner shared by the quiz and the challenge. */
    function runQuestions(body, bank, options) {

        const questions = options.shuffle ? shuffle(bank) : bank;

        let index = 0;
        let score = 0;
        let timer = null;

        function finish() {
            clearInterval(timer);

            const passed = score >= options.pass;

            body.innerHTML = "";

            body.appendChild(el("h3", "", `${score} of ${questions.length} correct`));

            body.appendChild(el(
                "p",
                "",
                passed
                    ? options.winText
                    : `You need ${options.pass} correct to pass. Review the notes and try again.`
            ));

            const actions = el("div", "cvm-actions");

            const again = el("button", "cvm-btn", "Try again");

            again.addEventListener("click", () => runQuestions(body, bank, options));

            const done = el("button", "cvm-btn primary", passed ? "Finish" : "Close");

            done.addEventListener("click", () => {
                if (passed) options.onPass();
                closeModal();
            });

            if (!passed) actions.appendChild(again);

            actions.appendChild(done);
            body.appendChild(actions);
        }

        function show() {
            clearInterval(timer);

            if (index >= questions.length) {
                finish();
                return;
            }

            const item = questions[index];

            body.innerHTML = "";

            body.appendChild(el("div", "cvm-steps", `Question ${index + 1} of ${questions.length}`));
            body.appendChild(el("h3", "", item.q));

            let locked = false;

            const feedback = el("div", "cvm-feedback");

            function answer(choice, button) {
                if (locked) return;

                locked = true;
                clearInterval(timer);

                const buttons = body.querySelectorAll(".cvm-option");

                buttons.forEach((b) => {
                    b.disabled = true;
                });

                if (choice === item.c) {
                    score += 1;
                    button.classList.add("right");
                    feedback.className = "cvm-feedback good";
                    feedback.textContent = "Correct";
                } else {
                    if (button) button.classList.add("wrong");
                    buttons[item.c].classList.add("right");
                    feedback.className = "cvm-feedback bad";
                    feedback.textContent = choice === -1
                        ? "Time's up"
                        : `Not quite. The answer is: ${item.a[item.c]}`;
                }

                setTimeout(() => {
                    index += 1;
                    show();
                }, options.delay);
            }

            item.a.forEach((text, i) => {
                const button = el("button", "cvm-option");

                button.textContent = text;

                button.addEventListener("click", () => answer(i, button));

                body.appendChild(button);
            });

            body.appendChild(feedback);

            if (options.seconds) {
                const bar = el("div", "cvm-timer", "<div></div>");

                body.appendChild(bar);

                const started = Date.now();

                timer = setInterval(() => {
                    const left = 1 - (Date.now() - started) / (options.seconds * 1000);

                    bar.firstChild.style.width = Math.max(0, left * 100) + "%";

                    if (left <= 0) answer(-1, null);
                }, 100);
            }
        }

        show();
    }


    /* =====================================================
       STAGE 3 — QUIZ
    ===================================================== */

    window.openQuiz = function () {

        const body = openModal("STAGE 03", "Computer vision quiz", "quiz");

        runQuestions(body, QUIZ, {
            shuffle: false,
            pass: 4,
            delay: 1200,
            winText: "You passed. Nice work, you understand how computers handle images.",
            onPass: () => complete("quiz")
        });
    };


    /* =====================================================
       STAGE 5 — CHALLENGE
    ===================================================== */

    window.openChallenge = function () {

        const body = openModal("STAGE 05", "NOVA's challenge", "challenge");

        body.appendChild(el(
            "p",
            "",
            "Five quick questions, 15 seconds each. Get at least 4 right to beat the challenge."
        ));

        const start = el("button", "cvm-btn primary", "Start the challenge");

        start.addEventListener("click", () => {
            runQuestions(body, CHALLENGE, {
                shuffle: true,
                pass: 4,
                delay: 1000,
                seconds: 15,
                winText: "Challenge beaten. You really know your pixels.",
                onPass: () => complete("challenge")
            });
        });

        const actions = el("div", "cvm-actions");

        actions.appendChild(start);
        body.appendChild(actions);
    };


    /* =====================================================
       STAGE 4 — PRACTICE
    ===================================================== */

    window.openPractice = function () {

        const body = openModal("STAGE 04", "Practice: work with pixels", "practice");

        const solved = [false, false, false];

        const tasks = [

            /* ---- task 1: draw a plus ---- */
            (c, markSolved) => {
                c.innerHTML = `
                    <h3>Task 1: draw a plus sign</h3>
                    <p>Click squares to make them white. Light up the middle row and the middle column, and leave the rest black.</p>
                `;

                const size = 7;
                const mid = 3;

                const state = Array.from({ length: size }, () => Array(size).fill(false));

                const grid = el("div", "cvm-grid");

                grid.style.gridTemplateColumns = `repeat(${size}, auto)`;

                for (let y = 0; y < size; y++) {
                    for (let x = 0; x < size; x++) {
                        const cell = el("button", "cvm-cell");

                        cell.style.background = "#000";
                        cell.setAttribute("aria-pressed", "false");
                        cell.setAttribute("aria-label", `Row ${y + 1}, column ${x + 1}`);

                        cell.addEventListener("click", () => {
                            state[y][x] = !state[y][x];

                            cell.style.background = state[y][x] ? "#fff" : "#000";
                            cell.setAttribute("aria-pressed", String(state[y][x]));
                        });

                        grid.appendChild(cell);
                    }
                }

                const feedback = el("div", "cvm-feedback");

                const check = el("button", "cvm-btn primary", "Check my image");

                check.addEventListener("click", () => {
                    let wrong = 0;

                    for (let y = 0; y < size; y++) {
                        for (let x = 0; x < size; x++) {
                            const shouldBeOn = x === mid || y === mid;

                            if (state[y][x] !== shouldBeOn) wrong += 1;
                        }
                    }

                    if (wrong === 0) {
                        feedback.className = "cvm-feedback good";
                        feedback.textContent = "That's a plus sign. Task complete.";
                        markSolved();
                    } else {
                        feedback.className = "cvm-feedback bad";
                        feedback.textContent = `${wrong} square${wrong === 1 ? " is" : "s are"} wrong. Check the middle row and column.`;
                    }
                });

                c.appendChild(grid);
                c.appendChild(check);
                c.appendChild(feedback);
            },

            /* ---- task 2: make yellow ---- */
            (c, markSolved) => {
                c.innerHTML = `
                    <h3>Task 2: make yellow</h3>
                    <p>Set the red, green and blue sliders so the colour is bright yellow.</p>
                `;

                const values = { R: 0, G: 0, B: 128 };

                const swatch = el("div", "cvm-swatch");
                const feedback = el("div", "cvm-feedback");

                function paint() {
                    swatch.style.background = `rgb(${values.R},${values.G},${values.B})`;
                }

                c.appendChild(swatch);

                Object.keys(values).forEach((channel) => {
                    const row = el("label", "cvm-slider");

                    row.innerHTML = `<span>${channel}</span>`;

                    const input = document.createElement("input");

                    input.type = "range";
                    input.min = 0;
                    input.max = 255;
                    input.value = values[channel];

                    const number = el("span", "", String(values[channel]));

                    input.addEventListener("input", () => {
                        values[channel] = Number(input.value);
                        number.textContent = input.value;
                        paint();
                    });

                    row.appendChild(input);
                    row.appendChild(number);
                    c.appendChild(row);
                });

                const check = el("button", "cvm-btn primary", "Check my colour");

                check.addEventListener("click", () => {
                    if (values.R >= 220 && values.G >= 220 && values.B <= 60) {
                        feedback.className = "cvm-feedback good";
                        feedback.textContent = "Yellow. Red and green light together make yellow.";
                        markSolved();
                    } else {
                        feedback.className = "cvm-feedback bad";
                        feedback.textContent = `That is (${values.R}, ${values.G}, ${values.B}). Yellow needs high red, high green and low blue.`;
                    }
                });

                c.appendChild(check);
                c.appendChild(feedback);

                paint();
            },

            /* ---- task 3: threshold ---- */
            (c, markSolved) => {
                c.innerHTML = `
                    <h3>Task 3: pick a threshold</h3>
                    <p>Choose a threshold so exactly <strong>3</strong> pixels turn white. A pixel turns white when its value is higher than the threshold.</p>
                `;

                const levels = [12, 40, 75, 110, 150, 185, 220, 250];

                const strip = el("div", "cvm-strip");
                const readout = el("div", "cvm-readout");
                const feedback = el("div", "cvm-feedback");

                const input = document.createElement("input");

                input.type = "range";
                input.min = 0;
                input.max = 255;
                input.value = 60;
                input.style.cssText = "width:100%;accent-color:#A855F7;";
                input.setAttribute("aria-label", "Threshold");

                function paint() {
                    const t = Number(input.value);

                    strip.innerHTML = "";

                    levels.forEach((value) => {
                        const cell = el("div", "cvm-cell", String(value));
                        const white = value > t;

                        cell.style.background = white ? "#fff" : "#000";
                        cell.style.color = white ? "#000" : "#fff";

                        strip.appendChild(cell);
                    });

                    readout.textContent = `Threshold ${t}: ${levels.filter((v) => v > t).length} white`;
                }

                input.addEventListener("input", paint);

                const check = el("button", "cvm-btn primary", "Check my threshold");

                check.addEventListener("click", () => {
                    const whites = levels.filter((v) => v > Number(input.value)).length;

                    if (whites === 3) {
                        feedback.className = "cvm-feedback good";
                        feedback.textContent = "Exactly 3 white pixels. Task complete.";
                        markSolved();
                    } else {
                        feedback.className = "cvm-feedback bad";
                        feedback.textContent = `${whites} pixel${whites === 1 ? " is" : "s are"} white. ${whites > 3 ? "Raise" : "Lower"} the threshold.`;
                    }
                });

                c.appendChild(strip);
                c.appendChild(input);
                c.appendChild(readout);
                c.appendChild(check);
                c.appendChild(feedback);

                paint();
            }
        ];

        let current = 0;

        function show() {
            body.innerHTML = "";

            body.appendChild(el("div", "cvm-steps", `Task ${current + 1} of ${tasks.length}`));

            const content = el("div");

            body.appendChild(content);

            const actions = el("div", "cvm-actions");

            const back = el("button", "cvm-btn", "Back");

            back.disabled = current === 0;

            back.addEventListener("click", () => {
                current -= 1;
                show();
            });

            const last = current === tasks.length - 1;

            const next = el("button", "cvm-btn primary", last ? "Finish practice" : "Next task");

            next.disabled = !solved[current];

            next.addEventListener("click", () => {
                if (last) {
                    complete("practice");
                    closeModal();
                } else {
                    current += 1;
                    show();
                }
            });

            actions.appendChild(back);
            actions.appendChild(next);

            tasks[current](content, () => {
                solved[current] = true;
                next.disabled = false;
            });

            body.appendChild(actions);
        }

        show();
    };

})();
