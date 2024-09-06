var interval;
var timerStarted = false;
var isPaused = false;  // Track the pause state
var counter = 0;
var pomodoroPhase = 'pomodoro';
var shortBreakAmount = 3;
$(document).ready(function () {
    // Automatically set the timer to Pomodoro when the page loads
    setTimer(pomodoroPhase);

    $("#start-button").click(function () {
        if (!timerStarted) {
            timerStarted = true;
            console.log("Start button clicked, timer started");
            startCountdown(); // Start the countdown
            $('#start-button').text("Pause");
            isPaused = false;
        } else {
            isPaused = !isPaused;
            if (isPaused) {
                clearInterval(interval); // Pause the timer
                $('#start-button').text("Resume");
            } else {
                startCountdown(); // Resume the timer
                $('#start-button').text("Pause");
            }
        }
    });

    // Function to update the timer every second
    function startCountdown() {
        interval = setInterval(function () {
            if (!isPaused) {
                timerDuration--; // Decrement the timer duration
                $('#timerDisplay').text(formatTime(timerDuration)); // Update the timer display

                // Stop the countdown when the timer reaches zero
                if (timerDuration <= 0) {
                    //clearInterval(interval);
                    //$('#timerDisplay').text("Time's up!");
                    //$('#start-button').hide();
                    //$('#pomo-counter').text("#" + ++counter);
                    // location.reload(); // Optional: reset after time's up

                    clearInterval(interval);
                    $('#timerDisplay').text("Time's up!");
                    $('#start-button').hide();

                    sleep(2000).then(() => {
                        $('#start-button').show();
                        console.log('pomodoroPhase = ' + pomodoroPhase);
                        if (pomodoroPhase == 'pomodoro') {
                            console.log("checking phase = pomodoro");
                            console.log("shortBreakAmount = " + shortBreakAmount);
                            if (shortBreakAmount > 0) {
                                pomodoroPhase = 'short';
                                shortBreakAmount--;
                            } else {
                                pomodoroPhase = 'long';
                                shortBreakAmount = 3;
                            }
                        } else {
                            pomodoroPhase = 'pomodoro';
                        }
                        setTimer(pomodoroPhase);
                    });

                }
            }
        }, 1000); // 1000 milliseconds = 1 second
    }

    // Function to format the time into mm:ss
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds % 60;
        return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
});

// Function to set the timer and update the UI
function setTimer(timerType) {
    console.log("Inside setTimer for timerType:", timerType);
    // Clear any ongoing countdown
    clearInterval(interval);
    timerStarted = false;
    isPaused = false;
    pomodoroPhase = timerType;

    $('#start-button').text("Start"); // Reset the start button

    $.ajax({
        url: '/Home/SetTimer',  // Controller Action to handle timer logic
        type: 'POST',
        data: { timerType: timerType },
        success: function (response) {
            if (response.success) {
                console.log("Timer set successfully");
                timerDuration = response.duration; // Set the timer duration
                $('#timerDisplay').text(formatTime(timerDuration)); // Update the timer display

                // Update button styles
                updateButtonStyles(timerType);
                if (timerType == 'pomodoro') {
                    $('#pomo-counter').text("#" + ++counter);
                }
            }
        },
        error: function (error) {
            console.log("Error setting timer:", error);
        }
    });
}

// Function to update the styles of the timer buttons
function updateButtonStyles(selectedType) {
    // Reset all buttons to unselected
    $('#pomodoroBtn').removeClass('button-selected').addClass('button-unselected');
    $('#shortBreakBtn').removeClass('button-selected').addClass('button-unselected');
    $('#longBreakBtn').removeClass('button-selected').addClass('button-unselected');

    // Set the selected button to selected style
    if (selectedType === 'pomodoro') {
        $('#pomodoroBtn').removeClass('button-unselected').addClass('button-selected');
    } else if (selectedType === 'short') {
        $('#shortBreakBtn').removeClass('button-unselected').addClass('button-selected');
    } else if (selectedType === 'long') {
        $('#longBreakBtn').removeClass('button-unselected').addClass('button-selected');
    }
}

// Utility function to format the time (used in both startCountdown and initial display)
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds % 60;
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}