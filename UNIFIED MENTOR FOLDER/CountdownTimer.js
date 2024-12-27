//declaring a Array to store all interval IDs
let activeTimers = [];
const Alarm = document.getElementById("audio"); //declare a audio element

// Function to create input fields for different timers
function createTimers() {
    const container = document.getElementById('timeInput');
    container.innerHTML = ''; // Clear existing inputs

    // Get the desired number of timers from the user else go by default value 1.
    const count = parseInt(document.getElementById('timerNum').value) || 1;

    // define the input fields for each timer
    for (let i = 1; i <= count; i++) {
        const timerInputs = document.createElement('div');
        timerInputs.innerHTML = `
            <label for="timer${i}"> Timer ${i}: </label>
            <input type="datetime-local" id="timer${i}">
        `;
        container.appendChild(timerInputs);
    }
}

// start all timers
function startTimers() {

    // Clear any running timers
    activeTimers.forEach(interval => clearInterval(interval));

    activeTimers = [];

    const displayContainer = document.getElementById('timerDisplay');
    displayContainer.innerHTML = ''; // Clear any previous displays

    const count = parseInt(document.getElementById('timerNum').value) || 1; //take user-defined number of timers else minimum 1 timer.

    for (let i = 1; i <= count; i++) {
        const timerInput = document.getElementById(`timer${i}`);
        const timerValue = timerInput ? timerInput.value : null;

        //input validations
        if (!timerValue) {
            alert(`Set a valid date for Timer ${i}!!!`);  //alert the user if no valid date is set
            continue; // Skip to the next timer
        }

        const targetTime = new Date(timerValue);
        if (isNaN(targetTime)) {
            alert(`Invalid date for Timer ${i}!!!`);    //alert the user if invalid date is set
            continue; // Skip to the next timer
        }

        // If everything is valid, start the timer
        startTimer1(i, targetTime);
    }

}

// start a single timer
function startTimer1(timerId, targetTime) {
    const displayContainer = document.getElementById('timerDisplay');

    const timerDiv = document.createElement('div');     //define time container to display different timers.
    timerDiv.className = 'timer';
    displayContainer.appendChild(timerDiv);

    function updateTimer() {
        const now = new Date();
        const timeLeft = targetTime - now; // Calculate the time left for the timer

        if (timeLeft <= 0) {
            timerDiv.style.color = 'red';
            timerDiv.textContent = `⏰⏰Timer ${timerId} completed⏰⏰!!`; // Display message when timer is completed.
            if (Alarm) {
                Alarm.play(); // Play alarm upon completion
            }
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, '0');

        timerDiv.textContent = `Timer ${timerId} :  ${days} days : ${hours} hours : ${minutes} minutes : ${seconds} seconds`;
    }

    //call/refresh Updatetimer function every second
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    activeTimers.push(timerInterval);
}

// FunctionCall of default timer input
createTimers();