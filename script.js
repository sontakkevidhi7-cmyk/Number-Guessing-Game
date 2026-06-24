/*==================================================
        NUMBER GUESSING GAME
        SCRIPT.JS - PART 1
==================================================*/


//============================
// Variables
//============================

let randomNumber;
let maxNumber;
let totalChances;
let remainingChances;
let totalGuesses = 0;
let selectedLevel = "";


//============================
// Elements
//============================

const levelButtons = document.querySelectorAll(".level-btn");

const selectionMessage = document.getElementById("selectionMessage");

const gameSection = document.querySelector(".game-section");

const rangeText = document.getElementById("rangeText");

const chanceText = document.getElementById("chanceText");

const guessCount = document.getElementById("guessCount");

const historyList = document.getElementById("historyList");

const hint = document.getElementById("hint");

const progressFill = document.querySelector(".progress-fill");

const guessInput = document.getElementById("guessInput");

const resultText = document.getElementById("resultText");






// ==========================
// SOUND EFFECTS
// ==========================

const levelSound = new Audio("sounds/select.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");

levelSound.volume = 0.6;
winSound.volume = 0.8;
loseSound.volume = 0.8;

//============================
// Difficulty Buttons
//============================

levelButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        // Remove old active button

        levelButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        // Highlight selected button

        button.classList.add("active");

        levelSound.currentTime = 0;
levelSound.play().catch(err => console.log(err));

        selectedLevel = button.dataset.level;


        //---------------------------------
        // Easy
        //---------------------------------

        if(selectedLevel==="easy"){

            maxNumber = 50;

            totalChances = 4;

        }

        //---------------------------------
        // Medium
        //---------------------------------

        else if(selectedLevel==="medium"){

            maxNumber = 100;

            totalChances = 6;

        }

        //---------------------------------
        // Hard
        //---------------------------------

        else{

            maxNumber = 500;

            totalChances = 8;

        }


        //---------------------------------
        // Create Random Number
        //---------------------------------

        randomNumber = Math.floor(Math.random()*maxNumber)+1;


        //---------------------------------
        // Reset Values
        //---------------------------------

        remainingChances = totalChances;

        totalGuesses = 0;


        //---------------------------------
        // Update Screen
        //---------------------------------

        rangeText.innerHTML =
        "1 - " + maxNumber;

        chanceText.innerHTML =
        remainingChances;

        guessCount.innerHTML =
        totalGuesses;

        historyList.innerHTML =
        "No guesses yet...";

        hint.innerHTML =
        "Game Started! Enter your first guess.";

        resultText.innerHTML =
        "Good Luck! 🍀";

        guessInput.value = "";


        //---------------------------------
        // Progress Bar
        //---------------------------------

        progressFill.style.width = "100%";


        //---------------------------------
        // Show Success Message
        //---------------------------------

        selectionMessage.style.display = "block";

        selectionMessage.innerHTML =
        "✔ " +
        selectedLevel.toUpperCase() +
        " Level Selected Successfully!";


        //---------------------------------
        // Show Game Area
        //---------------------------------

        gameSection.style.display = "block";


        //---------------------------------
        // Scroll Down Smoothly
        //---------------------------------

        gameSection.scrollIntoView({

            behavior:"smooth"

        });


        //---------------------------------
        // Hide Success Message
        //---------------------------------

        setTimeout(()=>{

            selectionMessage.style.display="none";

        },2500);


        //---------------------------------
        // Console
        //---------------------------------

        console.log("Random Number : ",randomNumber);

    });

});
/*==================================================
        SCRIPT.JS - PART 2
        GAME PLAY
==================================================*/


//=============================
// Guess Button
//=============================

const guessBtn = document.getElementById("guessBtn");


guessBtn.addEventListener("click", function () {

    // No level selected
    if (!selectedLevel) {

        alert("Please select a difficulty level first!");

        return;
    }

    // Get user input
    const guess = Number(guessInput.value);


    //=============================
    // Validation
    //=============================

    if (guessInput.value === "") {

        hint.innerHTML = "⚠ Please enter a number.";

        guessInput.focus();

        return;
    }

    if (guess < 1 || guess > maxNumber) {

        hint.innerHTML =
            `⚠ Please enter a number between 1 and ${maxNumber}`;

        guessInput.value = "";

        guessInput.focus();

        return;
    }


    //=============================
    // Update Counts
    //=============================

    totalGuesses++;

    remainingChances--;

    guessCount.innerHTML = totalGuesses;

    chanceText.innerHTML = remainingChances;


    //=============================
    // Guess History
    //=============================

    if (historyList.innerHTML === "No guesses yet...") {

        historyList.innerHTML = "";
    }

    historyList.innerHTML += `
        <div>
            Guess ${totalGuesses} :
            <strong>${guess}</strong>
        </div>
    `;


    //=============================
    // Progress Bar
    //=============================

    const progress =
        (remainingChances / totalChances) * 100;

    progressFill.style.width = progress + "%";


    //=============================
    // Correct Guess
    //=============================

    if (guess === randomNumber) {

    winSound.currentTime = 0;
    winSound.play().catch(err => console.log(err));

    resultText.innerHTML =
        "🎉 Congratulations! You Won!";
        resultText.innerHTML =
            "🎉 Congratulations! You Won!";

        resultText.classList.remove("lose");

        resultText.classList.add("win");

        hint.innerHTML =
            `🥳 Correct! The number was ${randomNumber}`;

        guessBtn.disabled = true;

        guessInput.disabled = true;

        return;
    }


    //=============================
    // Too Low
    //=============================

    if (guess < randomNumber) {

        hint.innerHTML =
            "📉 Too Low! Try a Bigger Number.";

    }

    //=============================
    // Too High
    //=============================

    else {

        hint.innerHTML =
            "📈 Too High! Try a Smaller Number.";

    }


    //=============================
    // Out of Chances
    //=============================
if (remainingChances === 0) {

    loseSound.currentTime = 0;
    loseSound.play().catch(err => console.log(err));

    resultText.innerHTML =
        "💀 Game Over!";
    


        resultText.innerHTML =
            "💀 Game Over!";

        resultText.classList.remove("win");

        resultText.classList.add("lose");

        hint.innerHTML =
            `😢 You Lost! The correct number was ${randomNumber}`;

        guessBtn.disabled = true;

        guessInput.disabled = true;

    }


    //=============================
    // Clear Input
    //=============================

    guessInput.value = "";

    guessInput.focus();

});



//=============================
// Press Enter to Guess
//=============================

guessInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        guessBtn.click();

    }

});
/*==================================================
        SCRIPT.JS - PART 3
        RESTART + EFFECTS
==================================================*/


//=====================================
// Restart Button
//=====================================

const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", restartGame);


//=====================================
// Restart Function
//=====================================

function restartGame(){

    // Remove selected difficulty

    levelButtons.forEach(button=>{

        button.classList.remove("active");

    });

    selectedLevel="";

    randomNumber=0;

    maxNumber=0;

    totalChances=0;

    remainingChances=0;

    totalGuesses=0;


    // Reset Text

    rangeText.innerHTML="--";

    chanceText.innerHTML="--";

    guessCount.innerHTML="0";

    hint.innerHTML="Select a difficulty level to start playing.";

    resultText.innerHTML="Good Luck! 🍀";

    resultText.classList.remove("win");

    resultText.classList.remove("lose");


    // Reset History

    historyList.innerHTML="No guesses yet...";


    // Reset Progress

    progressFill.style.width="0%";


    // Reset Input

    guessInput.value="";

    guessInput.disabled=false;

    guessBtn.disabled=false;


    // Hide Game Area

    gameSection.style.display="none";

    selectionMessage.style.display="none";


    // Scroll to Difficulty Section

    document.querySelector(".difficulty-section").scrollIntoView({

        behavior:"smooth"

    });

}



//=====================================
// Small Confetti Effect
//=====================================

function createConfetti(){

    for(let i=0;i<80;i++){

        const confetti=document.createElement("span");

        confetti.classList.add("confetti");

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.animationDuration=
        (Math.random()*3+2)+"s";

        confetti.style.background=
        randomColor();

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.remove();

        },5000);

    }

}



//=====================================
// Random Color
//=====================================

function randomColor(){

    const colors=[

        "#FFD700",

        "#FF4081",

        "#00E676",

        "#00B0FF",

        "#FF5722",

        "#FFFFFF",

        "#7C4DFF"

    ];

    return colors[Math.floor(Math.random()*colors.length)];

}



//=====================================
// Trigger Confetti When User Wins
//=====================================

const oldText=resultText;

const observer=new MutationObserver(function(){

    if(resultText.classList.contains("win")){

        createConfetti();

    }

});

observer.observe(resultText,{

    childList:true,

    subtree:true,

    attributes:true

});



//=====================================
// Disable Guess Button Style
//=====================================

guessBtn.addEventListener("click",()=>{

    if(guessBtn.disabled){

        guessBtn.style.opacity=".5";

        guessBtn.style.cursor="not-allowed";

    }

});



//=====================================
// Restart Button Hover
//=====================================

restartBtn.addEventListener("mouseenter",()=>{

    restartBtn.style.transform="scale(1.05)";

});

restartBtn.addEventListener("mouseleave",()=>{

    restartBtn.style.transform="scale(1)";

});



//=====================================
// Confetti CSS Created Automatically
//=====================================

const style=document.createElement("style");

style.innerHTML=`

.confetti{

position:fixed;

top:-20px;

width:12px;

height:18px;

border-radius:3px;

animation:fall linear forwards;

z-index:9999;

}

@keyframes fall{

0%{

transform:translateY(0) rotate(0deg);

opacity:1;

}

100%{

transform:translateY(110vh) rotate(720deg);

opacity:0;

}

}

`;

document.head.appendChild(style);



//=====================================
// Console Message
//=====================================

console.log("🎮 Number Guessing Game Loaded Successfully!");