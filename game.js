// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store computer and user patterns
var gamePattern = [];
var userClickedPattern = [];

// Game state variables
var started = false;
var level = 0;

//Function to check for the screensize
function checkScreenSize() { 
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth > 481) {
        console.log("Desktop view");
        $("#level-title").text("Press A Key to Start");
        $(document).keypress(function () {
            if (!started) {
                startGame();
            }
        });
    } else {
        console.log("Mobile view");
        $("#level-title").text("Touch the screen to Start");
        $(document).on('touchstart', function () {
            if (!started) {
                startGame();
            }
        });
    }
};

window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize); 

// Start game Function
function startGame() {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}

// Event Listener for the button been clicked by the user.
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
});

// Function to compare the user click pattern with the computer click pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        // Add visual feedback for wrong answer
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        gameOver();
        startOver();
    }
}

// Function for game over message
function gameOver() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth > 481) {
        $("#level-title").text("Game Over, Press Any Key to Restart");
    } else {
        $("#level-title").text("Game Over, Touch the screen to Restart");
    }
};

// Function to generate the computer random sequence 
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Randomly choose a color and add to the game pattern
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash the chosen color to the user
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
}

// Function to play sound for a given color
function playSound(name) {
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to reset the game state
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    console.log(level + +gamePattern + started);
}





// $(document).ready(function () {
//     // Show the popup when the page is loaded
//     $("#popup").show();
  
//     // Start the game when the "Start" button is clicked
//     $("#startButton").click(function () {
//       $("#popup").hide();
//       startGame();
//     });
  
//     // Your existing game logic goes here
//     function startGame() {
//       // ...
//     }
//   });
  