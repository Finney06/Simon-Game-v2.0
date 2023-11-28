// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store computer and user patterns
var gamePattern = [];
var userClickedPattern = [];

// Game state variables
var started = false;
var level = 0;

// Load the high score from local storage
function loadHighScore() {
    const storedScore = localStorage.getItem('highScore');
    return storedScore ? parseInt(storedScore) : 0;
}

// Save the high score to local storage
function saveHighScore(score) {
    localStorage.setItem('highScore', score.toString());
}

function displayHighScore(){
    const currentScore = level;
let highScore = loadHighScore();

if (currentScore > highScore) {
    highScore = currentScore;
    saveHighScore(highScore);
    console.log(highScore);
}

$("#highScore").text("High Score: " + highScore)

}


$(document).ready(function () {
    //Array of messages to display
    var messages = [{
        heading: "Welcome to Simon Memory Challenge!",
        content: "Congratulations on loading the Simon Memory Challenge game! Get ready to test your memory and have some fun. Here's a quick guide to get you started:"
    },
    {
        heading: "How to Play: ",
        content: "<ul>\
        <li class=\"list\"> Press the Start button </li>\
        <li class=\"list\"> Watch and listen carefully as Simon plays a sequence of colored lights and sounds. </li>\
        <li class=\"list\"> Repeat the sequence by clicking the buttons in the same order. </li>\
        <li class=\"list\"> Keep up as the game gets more challenging with longer sequences. </li>\
        <li class=\"list\"> Make a mistake, and it's game over! </li>\
      </ul>"
    },
    {
        heading: "Tips: ",
        content: "<ul>\
        <li class=\"list\"> Challenge Yourself to beat your high Score!</li>\
        <li class=\"list\"> Share the game with friends and see who has the best memory. </li>\
        <li class=\"list\"> Have a great time and enjoy the challenge</li>\
        </ul>"
    }
    ];

    var currentMessageIndex = 0;

    //Function to update the popup content
    function updatePopupContent() {
        $(".popupHeading").text(messages[currentMessageIndex].heading);
        $(".popupContent").html(messages[currentMessageIndex].content);
    };

    // Initial hiding of the popup
    $("#popup1").hide();

    //Show the popup when the page is loaded

    $("#popup1").fadeIn(1000);
    displayHighScore();

    //Check if it's the last message
    // else {
    // Use the default button text
    $("#nextButton").text("Next");
    // Show the next message when the "Next" button is clicked
    $("#nextButton").click(function () {
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
        console.log(currentMessageIndex);
        updatePopupContent();

        if (currentMessageIndex === messages.length - 1) {
            // Change the button text to 'Start"
            $("#nextButton").text("Start");

            // Perform actions forthe "Start" button
            $("#nextButton").on("click", function () {
                $("#popup1").fadeOut(1000, function () {
                    setTimeout(() => {
                        if (!started) {
                            startGame();
                        }
                    }, 500);
                });
            })
        }
    });
});

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
                displayHighScore();
                setTimeout(() => {
                    nextSequence();
                }, 500);
            }, 500);
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
        $(window).on('resize', gameOver);
        startOver();
    }
}

// var lastLevel = level;
// console.log("your Last Level " + lastLevel);


// Function for game over message
function gameOver() {
    var screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (screenWidth > 481) {
        console.log("Desktop view");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(document).on("keypress", function () {
            if (!started) {
                startGame();
            }
        });
    } else {
        console.log("Mobile view");
        $("#level-title").text("Game Over, Touch the screen to Restart");

        $(document).on("touchstart", function () {
            if (!started) {
                startGame();
            }
        });
    }
}

// $(window).on('load', gameOver);
   



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
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);

    playSound(randomChosenColour);
}

// Function to play sound for a given color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
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
    console.log(level + gamePattern + started);
}

// Clear the high score from local storage
function clearHighScore() {
    localStorage.removeItem('highScore');
    // You may also want to update the displayed high score on the page if needed
    $("#highScore").text("High Score: 0");
}

// ...

// Example usage to clear high score, you can call this function when needed
// clearHighScore();

