$(document).ready(function () {
    var timerStarted = false;
    var isPaused = false;  // Track the pause state
    var counter = 1;

    // Automatically set the timer to Pomodoro when the page loads
    setTimer('pomodoro');
    

    $("#start-button").click(function () {
        if (timerStarted == false) {
            timerStarted = true;
            console.log("timerStarted = false");
            console.log("start button clicked first time");
            // Set the initial timer duration (25 minutes in seconds)
            var interval;  // Declare the interval globally
            
            

            


            // Function to update the timer every second
            function startCountdown() {
                interval = setInterval(function () {
                    if (isPaused == false) {
                        console.log("isPause = false");
                        $('#start-button').text("Pause");

                        // Decrement the timer duration
                        timerDuration--;

                        // Update the timer display
                        $('#timerDisplay').text(formatTime(timerDuration));

                        // Stop the countdown when the timer reaches zero
                        if (timerDuration <= 0) {
                            clearInterval(interval);
                            $('#timerDisplay').text("Time's up!");
                            $('#start-button').hide();
                            $('#pomo-counter').text("#" + ++counter);

                            // pomoStage = 1;
                            $('#short').removeClass("button-selected").addClass("button-unselected");
                            $('#pomo').removeClass("button-unselected").addClass("button-selected");
                            location.reload();
                        }

                        $('#start-button').click(function () {
                            isPaused = true;
                        });

                    } else {
                        console.log("isPause = true");
                        $('#start-button').click(function () {
                            isPaused = false;
                        });

                        $('#start-button').text("Resume");

                    }
                    
                }, 1000); // 1000 milliseconds = 1 second
            }

            // Start the countdown when the page loads
            startCountdown();
            $('#start-button').text("Pause");
        } 
        
    });
});


function setTimer(timerType) {
    if (typeof $ === 'undefined') {
        console.error("jQuery is not loaded!");
    }
    console.log("Inside setTimer in JS");
    $.ajax({
        url: '/Home/SetTimer',  // Controller Action to handle timer logic
        type: 'POST',
        data: { timerType: timerType },
        success: function (response) {
            if (response.success) {
                // Handle success (e.g., update the timer on the page)
                console.log("Success");
                timerDuration = response.duration;
                // Update the timer display
                $('#timerDisplay').text(formatTime(timerDuration));
                $('#start-button').text("Start");
                var timerStarted = false;
                var isPaused = true;


                //console.log(timerDuration);
            }
            
        },
        error: function (error) {
            // Handle error
            console.log("error");
        }
    });
}


// Function to format the time into mm:ss
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds % 60;
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}