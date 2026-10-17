// =========================================
// NEXORA DEEP LEARNING MODULE
// =========================================


// CURSOR GLOW

const glow =
    document.querySelector(".cursor-glow");


document.addEventListener("mousemove", (e) => {

    if(glow){

        glow.style.left =
            e.clientX + "px";

        glow.style.top =
            e.clientY + "px";

    }

});


// =========================================
// LESSONS
// =========================================

const lessons = [

    {
        id:1,
        title:"Introduction to Deep Learning",

        concept:
        "Deep Learning is a branch of Machine Learning that uses neural networks with multiple layers to learn complex patterns from large amounts of data.",

        example:
        "Image recognition, speech recognition and language models are common applications of Deep Learning."
    },

    {
        id:2,
        title:"Neural Networks",

        concept:
        "A neural network contains input, hidden and output layers. Neurons receive information, apply weights and biases, and pass the result to the next layer.",

        example:
        "A network can receive pixels as input and learn to identify whether an image contains a particular object."
    },

    {
        id:3,
        title:"Activation Functions",

        concept:
        "Activation functions introduce non-linearity into neural networks. Common functions include ReLU, Sigmoid and Softmax.",

        example:
        "ReLU is commonly used in hidden layers, while Softmax is often used for multi-class classification."
    },

    {
        id:4,
        title:"Forward Propagation",

        concept:
        "Forward propagation is the process where input data moves through the neural network layer by layer until the network produces an output.",

        example:
        "The network combines inputs with weights and biases and applies activation functions to produce a prediction."
    },

    {
        id:5,
        title:"Loss Functions",

        concept:
        "A loss function measures how different the model's prediction is from the correct answer. The model tries to minimize this loss.",

        example:
        "Mean Squared Error can be used for regression, while Cross-Entropy is commonly used for classification."
    },

    {
        id:6,
        title:"Backpropagation",

        concept:
        "Backpropagation calculates how much each parameter contributed to the error and uses gradients to help update the network.",

        example:
        "After making a prediction, the network calculates the error and propagates information backward to improve its weights."
    },

    {
        id:7,
        title:"Optimizers",

        concept:
        "Optimizers adjust the model's weights to reduce the loss. Gradient Descent and Adam are commonly used optimization methods.",

        example:
        "Adam adapts the learning process using information from previous gradients."
    },

    {
        id:8,
        title:"Convolutional Neural Networks",

        concept:
        "CNNs are neural networks especially useful for image data. Convolution filters can detect patterns such as edges and shapes.",

        example:
        "A CNN can be trained to classify images of cats and dogs."
    },

    {
        id:9,
        title:"RNNs & LSTMs",

        concept:
        "RNNs are designed to process sequential data. LSTMs are a type of recurrent network designed to handle longer-term dependencies.",

        example:
        "They can be used for time-series prediction and sequence processing."
    },

    {
        id:10,
        title:"Transformers",

        concept:
        "Transformers use attention mechanisms to process relationships between elements in a sequence. They form the foundation of many modern language models.",

        example:
        "Modern AI systems for language understanding and generation commonly use Transformer architectures."
    }

];


// =========================================
// PROGRESS
// =========================================

let completedLessons =
    JSON.parse(
        localStorage.getItem(
            "nexoraDLProgress"
        )
    ) || [];


function updateProgress(){

    const completed =
        completedLessons.length;

    const total =
        lessons.length;

    const percentage =
        Math.round(
            completed / total * 100
        );


    document.getElementById(
        "progressFill"
    ).style.width =
        percentage + "%";


    document.getElementById(
        "progressText"
    ).innerText =
        `${completed} / ${total} Lessons Completed`;


    document.getElementById(
        "progressPercent"
    ).innerText =
        percentage + "%";


    const message =
        document.getElementById(
            "progressMessage"
        );


    if(completed === 0){

        message.innerText =
            "Start your Deep Learning journey.";

    }

    else if(completed < total){

        message.innerText =
            "Great progress! Keep learning.";

    }

    else{

        message.innerText =
            "🎉 Deep Learning completed!";

    }


    updateLessons();

    updateQuiz();

}



// =========================================
// LESSON LOCK SYSTEM
// =========================================

function updateLessons(){

    const cards =
        document.querySelectorAll(
            ".lesson-card"
        );


    cards.forEach(card => {

        const id =
            Number(
                card.dataset.lesson
            );


        const button =
            card.querySelector(
                ".lesson-btn"
            );


        if(
            completedLessons.includes(id)
        ){

            card.classList.remove(
                "locked"
            );

            if(button){

                button.innerText =
                    "✓ Completed";

            }

        }

        else if(
            id === 1 ||
            completedLessons.includes(id - 1)
        ){

            card.classList.remove(
                "locked"
            );

            if(button){

                button.innerText =
                    "Start";

            }

        }

        else{

            card.classList.add(
                "locked"
            );

            if(button){

                button.innerText =
                    "🔒 Locked";

            }

        }

    });

}



// =========================================
// OPEN LESSON
// =========================================

function openLesson(id){

    const card =
        document.querySelector(
            `[data-lesson="${id}"]`
        );


    if(
        card.classList.contains("locked")
    ){

        alert(
            "🔒 Lesson Locked\n\n" +
            "Complete the previous lesson first."
        );

        return;

    }


    const lesson =
        lessons.find(
            item => item.id === id
        );


    if(!lesson) return;


    const modal =
        document.createElement("div");


    modal.className =
        "lesson-modal";


    modal.innerHTML = `

        <div class="lesson-modal-content">

            <button
                class="close-modal"
                onclick="closeLesson()">

                ×

            </button>

            <span>
                LESSON ${id}
            </span>

            <h2>
                ${lesson.title}
            </h2>

            <h3>
                📚 Concept
            </h3>

            <p>
                ${lesson.concept}
            </p>

            <h3>
                💡 Example
            </h3>

            <p>
                ${lesson.example}
            </p>

            <div class="lesson-complete-box">

                <p>
                    Finished this lesson?
                </p>

                <button
                    class="gold-btn"
                    onclick="completeLesson(${id})">

                    ✓ Mark Lesson Complete

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);

}



// =========================================
// CLOSE LESSON
// =========================================

function closeLesson(){

    const modal =
        document.querySelector(
            ".lesson-modal"
        );


    if(modal){

        modal.remove();

    }

}



// =========================================
// COMPLETE LESSON
// =========================================

function completeLesson(id){

    if(
        !completedLessons.includes(id)
    ){

        completedLessons.push(id);

        completedLessons.sort(
            (a,b) => a-b
        );


        localStorage.setItem(

            "nexoraDLProgress",

            JSON.stringify(
                completedLessons
            )

        );

    }


    closeLesson();

    updateProgress();


    alert(
        "🎉 Lesson Completed!\n\n" +
        "Your progress has been saved."
    );

}



// =========================================
// QUIZ
// =========================================

const quizQuestions = [

    {
        question:
        "Which part of a neural network receives the original input?",

        options:[
            "Output layer",
            "Input layer",
            "Hidden layer",
            "Loss layer"
        ],

        answer:1
    },

    {
        question:
        "Which activation function is commonly used in hidden layers?",

        options:[
            "ReLU",
            "MSE",
            "Adam",
            "K-Means"
        ],

        answer:0
    },

    {
        question:
        "What does a loss function measure?",

        options:[
            "Number of layers",
            "Model size",
            "Prediction error",
            "Learning time"
        ],

        answer:2
    },

    {
        question:
        "Which process sends error information backward through a neural network?",

        options:[
            "Forward propagation",
            "Backpropagation",
            "Clustering",
            "Classification"
        ],

        answer:1
    },

    {
        question:
        "Which optimizer is commonly used in Deep Learning?",

        options:[
            "Adam",
            "K-Means",
            "Random Forest",
            "Naive Bayes"
        ],

        answer:0
    },

    {
        question:
        "Which architecture is especially useful for image processing?",

        options:[
            "RNN",
            "CNN",
            "KNN",
            "SVM"
        ],

        answer:1
    },

    {
        question:
        "What type of data are RNNs designed to handle well?",

        options:[
            "Sequential data",
            "Only images",
            "Only tables",
            "Static HTML"
        ],

        answer:0
    },

    {
        question:
        "What mechanism is central to Transformers?",

        options:[
            "Pooling",
            "Attention",
            "Clustering",
            "Decision trees"
        ],

        answer:1
    },

    {
        question:
        "What is the purpose of an optimizer?",

        options:[
            "Store images",
            "Increase dataset size",
            "Update model parameters",
            "Create HTML"
        ],

        answer:2
    },

    {
        question:
        "Deep Learning mainly uses what to learn complex patterns?",

        options:[
            "Neural networks",
            "HTML tags",
            "SQL tables",
            "CSS selectors"
        ],

        answer:0
    }

];


let currentQuestion = 0;

let quizScore = 0;



function updateQuiz(){

    const button =
        document.getElementById(
            "quizButton"
        );


    if(
        completedLessons.length ===
        lessons.length
    ){

        button.innerText =
            "🧠 Start Final Quiz";

    }

    else{

        button.innerText =
            "🔒 Complete Lessons First";

    }

}



// =========================================
// START QUIZ
// =========================================

function startQuiz(){

    if(
        completedLessons.length <
        lessons.length
    ){

        alert(
            "🔒 Quiz Locked\n\n" +
            "Complete all 10 lessons first."
        );

        return;

    }


    currentQuestion = 0;

    quizScore = 0;

    showQuestion();

}



// =========================================
// SHOW QUESTION
// =========================================

function showQuestion(){

    const question =
        quizQuestions[currentQuestion];


    const modal =
        document.createElement("div");


    modal.className =
        "lesson-modal";


    let optionsHTML = "";


    question.options.forEach(
        (option,index) => {

            optionsHTML += `

                <button
                    class="quiz-option"
                    onclick="answerQuestion(${index})">

                    ${option}

                </button>

            `;

        }
    );


    modal.innerHTML = `

        <div class="lesson-modal-content">

            <span>
                QUESTION ${currentQuestion + 1}
                / ${quizQuestions.length}
            </span>

            <h2>
                ${question.question}
            </h2>

            <div class="quiz-options">

                ${optionsHTML}

            </div>

        </div>

    `;


    document.body.appendChild(modal);

}



// =========================================
// ANSWER QUESTION
// =========================================

function answerQuestion(selected){

    const question =
        quizQuestions[currentQuestion];


    if(
        selected === question.answer
    ){

        quizScore++;

    }


    const modal =
        document.querySelector(
            ".lesson-modal"
        );


    if(modal){

        modal.remove();

    }


    currentQuestion++;


    if(
        currentQuestion <
        quizQuestions.length
    ){

        setTimeout(
            showQuestion,
            150
        );

    }

    else{

        showQuizResult();

    }

}



// =========================================
// QUIZ RESULT
// =========================================

function showQuizResult(){

    const percentage =
        quizScore * 10;


    const passed =
        percentage >= 60;


    const modal =
        document.createElement("div");


    modal.className =
        "lesson-modal";


    modal.innerHTML = `

        <div class="lesson-modal-content"
             style="text-align:center">

            <div class="quiz-icon">

                <i class="fa-solid fa-trophy"></i>

            </div>

            <h2>
                ${passed
                    ? "🎉 Quiz Passed!"
                    : "📚 Keep Practicing!"}
            </h2>

            <p>

                Your score:

                <strong>
                    ${quizScore}/10
                </strong>

                <br><br>

                ${percentage}%

            </p>

            <br>

            <button
                class="gold-btn"
                onclick="finishQuiz()">

                Continue

            </button>

        </div>

    `;


    document.body.appendChild(modal);

}



// =========================================
// FINISH QUIZ
// =========================================

function finishQuiz(){

    const modal =
        document.querySelector(
            ".lesson-modal"
        );


    if(modal){

        modal.remove();

    }


    if(quizScore >= 6){

        localStorage.setItem(
            "nexoraDLQuizPassed",
            "true"
        );


        updateNextModule();


        alert(
            "🎉 Congratulations!\n\n" +
            "Deep Learning module completed!"
        );

    }

}



// =========================================
// NEXT MODULE
// =========================================

function updateNextModule(){

    const button =
        document.getElementById(
            "nextButton"
        );


    const passed =
        localStorage.getItem(
            "nexoraDLQuizPassed"
        );


    if(passed === "true"){

        button.innerText =
            "🚀 Enter Computer Vision";

    }

}



function unlockComputerVision(){

    const passed =
        localStorage.getItem(
            "nexoraDLQuizPassed"
        );


    if(passed !== "true"){

        alert(
            "🔒 Computer Vision Locked\n\n" +
            "Complete the Deep Learning lessons " +
            "and pass the final quiz."
        );

        return;

    }


    window.location.href =
        "computer-vision.html";

}



// =========================================
// NAVIGATION
// =========================================

function startLearning(){

    scrollToLessons();

}


function scrollToLessons(){

    document
        .getElementById("lessons")
        .scrollIntoView({
            behavior:"smooth"
        });

}


function goToAcademy(){

    window.location.href =
        "aiml.html";

}



// =========================================
// INITIALIZE
// =========================================

updateProgress();

updateNextModule();