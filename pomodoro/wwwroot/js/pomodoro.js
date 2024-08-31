$(document).ready(function () {
    var timerStarted = false;
    var isPaused = false;  // Track the pause state

    $("#start-button").click(function () {
        if (timerStarted == false) {
            timerStarted = true;
            console.log("timerStarted = false");
            console.log("start button clicked first time");
            // Set the initial timer duration (25 minutes in seconds)
            var timerDuration = 25 * 60;
            var interval;  // Declare the interval globally
            
            

            // Function to format the time into mm:ss
            function formatTime(seconds) {
                var minutes = Math.floor(seconds / 60);
                var seconds = seconds % 60;
                return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
            }


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
                        }

                        $('#start-button').click(function () {
                            isPaused = true;
                        });

                    } else {
                        console.log("isPause = true");
                        $('#start-button').text("Resume");

                        $('#start-button').click(function () {
                            isPaused = false;
                        });

                    }
                    
                }, 1000); // 1000 milliseconds = 1 second
            }

            // Start the countdown when the page loads
            startCountdown();
            $('#start-button').text("Pause");
        } 
        
    });
});

