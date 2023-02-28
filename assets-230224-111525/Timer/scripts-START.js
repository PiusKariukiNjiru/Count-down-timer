// Creating the universal variable 'countdown' that lives in the window. 
let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

// Getting all data-keys with built-in timer settings
const buttons = document.querySelectorAll('[data-time');


// This is our main function
function timer(seconds) {
    //If any timers are already going, clear them
    clearInterval(countdown);

    // Date.now is a new JS function, will give time in MS.
    const now = Date.now();

    // Find time in SECONDS by multiplying default MS by 1000
    const then = now + seconds * 1000;

    // Run another function, defined below, as soon as this function is invoked
    displayTimeLeft(seconds);

    // Show the end time, another function defined below. 
    displayEndTime(then);

    // Set this function to the variable that lives in the browser. Set interval is a function that runs every 1000 ms 
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
      
        // Check when timer is done. 
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
      
        //display it
        displayTimeLeft(secondsLeft);
      
      
// Run this function every 1000 ms
    }, 1000);
}


//Convert seconds to the formatted display value
function displayTimeLeft(seconds) {

    // Round seconds to whole numbers
    const minutes = Math.floor(seconds / 60);

    // Get the number of whole seconds remaining
    const remainderSeconds = seconds % 60;

    // Check if display needs a leading 0, if there is less than 10 seconds. so, '9' will display as '09'
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    //Change title of document to be the seconds left
    document.title = display;
    timerDisplay.textContent = display;

}

// Show the static, unchanging END time
function displayEndTime(timestamp) {
  
    // Pass in the timestamp, which has all of the info below built in. This is a default JS method
    const end = new Date(timestamp);

    // Extract hours and minutes from the timestamp
    const hour = end.getHours();
    const minutes = end.getMinutes();

    // Display the time.
    // Check if past 12 noon, subtract 12 hours 
    // Check if less than 10 minutes. '9' becomes '09'
    endTime.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Get data from the data attribute buttons, and set them as the timer
function startTimer(){

    // ParseInt to only get whole number
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

// Function to get data from pre-set button in data attributes
buttons.forEach(button => button.addEventListener('click', startTimer));


document.customForm.addEventListener('submit', function(e){

    //prevent default browser behavior of reloading the page on time form submit
    e.preventDefault();

    //Get the number of minutes from the input field
    const mins = this.minutes.value;

    // Convert the minutes to seconds, which is what our timer uses
    timer(mins * 60);
    this.reset();

})

