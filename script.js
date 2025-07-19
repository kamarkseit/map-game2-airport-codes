'use strict'

//////////////////////////// FUNCTIONS //////////////////////////////
async function myData() {
    var d = await fetch("./dataImport.json")
        .then(data => data.json())
        .then(res => res);
    return d;
}
// Function to compare player's x and y location to the correct x and y
function myCompare(arg1, arg2) {
    if (arg1.airport === arg2.airport && arg1.imageCode === arg2.imageCode) {
        if (arg2.x <= arg1.x + 7 && arg2.x >= arg1.x - 7 && arg2.y <= arg1.y + 7 && arg2.y >= arg1.y - 7) {
            return true;
        }
        return false;
    }
    console.log('Attention: The compare function compares different airports!');
}

let gameCompleted = false;
// Function that starts the game and finishes it with the results displayed
function playGame(gameCompleted, i, numOfQuestions, gameOrder, player_data) {
    //start event listener to click dots on the map image
    // when the game starts make the airplane move.
    document.addEventListener("mousemove", moveAirplane)
    box.addEventListener('click', event => {
        // check if the game has been completed
        if (gameCompleted === true) {
            return
        }
        // if (i < numOfQuestions) {
        else {
            // get x and y coordinates for the clicks inside the map
            const rect = box.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top + 5;
            // update item array with players data
            let item = { "airport": gameOrder[i].airport, "imageCode": gameOrder[i].imageCode, "x": mouseX, "y": mouseY, "isCorrect": false };
            // test that item array for correctness
            item.isCorrect = myCompare(gameOrder[i], item);
            console.log(gameOrder[i], item)
            player_data.push(item);
            // this condition will check if need to continue iteration or the game is complete
            if (player_data.length !== numOfQuestions) {
                i++
                document.getElementById('airportID').src = `${gameOrder[i].imageCode}.png`;
            }
            else {
                // prepare and display the score string with necessary score variables
                const numberOfCorrect = player_data.filter((item) => item.isCorrect == true).length;
                const wrongAirports = player_data.filter((item) => item.isCorrect == false).map((airport) => airport.airport);
                if (numberOfCorrect === numOfQuestions) {
                    displayMessage(`You scored ${numberOfCorrect} out of ${numOfQuestions}. Great job!`);
                }
                else {
                    displayMessage(`You scored ${numberOfCorrect} out of ${numOfQuestions}. You need more practice with: ${wrongAirports.join(", ")}`);
                }
                // blank image is set instead of airport image
                document.getElementById('airportID').src = `blank.png`;
                gameCompleted = true;
                document.querySelector("#airplaneID").style.left = `10px`;
                document.querySelector("#airplaneID").style.top = `10px`;
                // stop the airplane from moving when the game ends.
                document.removeEventListener("mousemove", moveAirplane)
            }
        }
    })
}

//////////////////////////// VARIABLES /////////////////////////////////////
const box = document.querySelector('.mapClass');

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

const numberInput = document.getElementById("nquestionsID");
let numOfQuestions = numberInput.value;

let data;

let gameStarted = false;

let arrTemp = [];


/////////////////////////// MAIN EVENT LISTENER //////////////////////////////////
numberInput.addEventListener("change", async (event) => {
    numOfQuestions = parseInt(event.target.value)
    data = await myData()
    data.forEach((e) => { arrTemp.push([e.x, e.y]) })
    // When entering improper input
    if (!numOfQuestions || numOfQuestions > 20 || numOfQuestions < 1) {
        displayMessage("You've entered incorrect number of questions!");
    }
    else {
        displayMessage("")
        // shuffle the data for random order of questions
        const gameOrder = [];
        let temp = data;
        for (let j = 0; j < data.length; j++) {
            const randomValue = Math.floor(Math.random() * temp.length)
            gameOrder.push(temp[randomValue])
            temp = temp.filter(function (item) {
                return item !== temp[randomValue]
            })
        }
        // set few more variables
        let i = 0;
        let player_data = [];

        // set the image for the first question
        document.getElementById('airportID').src = `${gameOrder[i].imageCode}.png`;

        // set a timeout so that two eventlisteners are not triggered at the same time
        setTimeout(() => {
            gameStarted = true;
            playGame(gameCompleted, i, numOfQuestions, gameOrder, player_data);
        }, 500)
    }
})


/////////////////////////// SHOW AIRPLANE ICON ///////////////////////////////

//document.addEventListener("mousemove", moveAirplane)

function moveAirplane(event) {
    if (gameStarted === true) {
        console.log(gameCompleted)
        document.querySelector("#airplaneID").style.left = `10px`;
        document.querySelector("#airplaneID").style.top = `10px`;
        const rect = box.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top + 5;
        // console.log(`Current cursor position is: ${mouseX} and ${mouseY}`)
        arrTemp.forEach(v => {
            if (((mouseX >= v[0] - 5) && (mouseX <= v[0] + 5)) && ((mouseY >= v[1] - 5) && (mouseY <= v[1] + 5))) {
                document.querySelector("#airplaneID").style.left = `${mouseX}px`;
                document.querySelector("#airplaneID").style.top = `${mouseY}px`;
            }
        })
    }
}