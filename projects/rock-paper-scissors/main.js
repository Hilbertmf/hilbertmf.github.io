// Variables
let playerChoice, computerChoice, playerScore, computerScore, rounds;
const playerOptions = document.querySelectorAll('.player-choices a');

// Display Elements
const displayHeaderh1 = document.querySelectorAll('.display-header h1');
const displayHeader = displayHeaderh1[0];
const displayText = displayHeaderh1[1];
const displayPlayerScore = document.getElementById('player-score');
const displayComputerScore = document.getElementById('computer-score');

// Text
const initialText = 'Start a New Game!';
const defaultText = 'Select your choice...';

const writeInScreen = function(element, string) {
    element.innerHTML = string;
};

const initialize = function() {
    playerScore = 0;
    computerScore = 0;
    playerChoice = '';
    computerChoice = '';
    rounds = 0;
    writeInScreen(displayComputerScore, computerScore);
    writeInScreen(displayPlayerScore, playerScore);
};

const animation = function(element, choice) {
    element.classList.add(choice);
    element.classList.toggle('hidden');
    
    setTimeout(() => {
        element.style.transition = 'transform 1s';
        element.style.transform = 'scale(.8)';
    }, 250);
    setTimeout(() => element.style.transform = 'scale(0)', 3500);
    setTimeout(() => element.classList.remove(choice), 4080);
};

// Generates random Integer between 0 and num - 1
const getRandomInteger = function(num) {
     return Math.floor(Math.random() * num);
};

const getComputerPlay = function() {
    const randomNumber = getRandomInteger(3);
    let play;

    if(randomNumber === 0)
        play = 'rock';
    else if (randomNumber === 1)
        play = 'paper';
    else 
        play = 'scissors';
    return play;
};

const showWinner = function() {
    let resultStr; 
    if(computerScore === playerScore)
        resultStr = `It's a draw!`;
    else if(computerScore > playerScore)
        resultStr = `You lose!`;
    else
        resultStr = `You win!`;
    writeInScreen(displayHeader, resultStr);
};

const finishGame = function() {
    if(finishGameBtn.classList.contains('enabled')) {
        
        writeInScreen(displayHeader, initialText);
        writeInScreen(displayText, '');

        // disable player options
        playerOptions.forEach(choice => {
            choice.classList.remove('enabled');
            choice.classList.add('disabled');
        });

        // enable newgame game
        // disable endgame itself
        newGameBtn.classList.remove('disabled');
        newGameBtn.classList.add('enabled');
        finishGameBtn.classList.remove('enabled');
        finishGameBtn.classList.add('disabled');

        showWinner();
    }
};

const getRoundResult = function(playerChoice, computerChoice) {
    let result = new Array(2);
    if(playerChoice === computerChoice) {
        result[0] = 'It\'s a tie!';
        result[1] = 'draw';
    }
    else if(playerChoice === 'rock') {
        if(computerChoice === 'paper') {
            result[0] = 'You Lose! Paper beats Rock!';
            result[1] = 'computer'; // winner
        }
        else {
            result[0] = 'You Win! Rock beats Scissors!';
            result[1] = 'human'; // winner
        }
    }
    else if(playerChoice === 'paper') {
        if(computerChoice === 'scissors') {
            result[0] = 'You Lose! Scissors beats Paper';
            result[1] = 'computer'; // winner
        }
        else {
            result[0] = 'You win! Paper beats Rock!';
            result[1] = 'human'; // winner
        }
    }
    else if(playerChoice === 'scissors') {
        if(computerChoice === 'rock') {
            result[0] = 'You Lose! Rock beats Scissors';
            result[1] = 'computer'; // winner
        }
        else {
            result[0] = 'You win! Scissors beats Paper!';
            result[1] = 'human'; // winner
        }
    }
    return result;
};

const gameRound = function(playerChoice) {
    computerChoice = getComputerPlay();
    
    let result = getRoundResult(playerChoice, computerChoice);
    
    // loading
    writeInScreen(displayText, '. . . . . . .');
    
    // disable player options
    playerOptions.forEach(choice => {
        choice.classList.remove('enabled');
        choice.classList.add('disabled');
    });

    // run animation
    const humanTurnChoice = document.querySelector('.human-choice');
    const computerTurnChoice = document.querySelector('.computer-choice');
    animation(humanTurnChoice, playerChoice);
    setTimeout(() => {animation(computerTurnChoice, computerChoice);}, 1000);
    
    // show results
    window.setTimeout(() => {
        writeInScreen(displayText, result[0]);
        writeInScreen(displayComputerScore, computerScore);
        writeInScreen(displayPlayerScore, playerScore);
    }, 3000);

    window.setTimeout(() => {
        if(rounds < 4) {
            writeInScreen(displayHeader, `Round ${rounds+1}`);
            writeInScreen(displayText, defaultText);
        }
        else if(rounds === 4) {
            writeInScreen(displayHeader, `Last Round!`);
            writeInScreen(displayText, defaultText);
        }
        // enable player options
        playerOptions.forEach(choice => {
            choice.classList.remove('disabled');
            choice.classList.add('enabled');
        });
    }, 6100);
    
    return result[1]; // winner
};

const gameController = function(playerChoice) {
    if(rounds === 0) {
        writeInScreen(displayComputerScore, computerScore);
        writeInScreen(displayPlayerScore, playerScore);
    }

    let winner = gameRound(playerChoice);
    
    if(winner === 'computer') 
        computerScore++;
    else if(winner === 'human')
        playerScore++;
    if(rounds === 4) 
        window.setTimeout(() => finishGame(), 6100);
    rounds++;
};

// get buttons
const newGameBtn = document.querySelector('.reset #newgame-btn');
const finishGameBtn = document.querySelector('.reset #finishgame-btn');

// When click New Game
newGameBtn.addEventListener('click', () => {
    // Set counters to 0
    // Initialize variables
    initialize();

    writeInScreen(displayHeader, `Round ${rounds+1}`);
    writeInScreen(displayText, defaultText);
    
    // change classes from disabled to enabled
    playerOptions.forEach(choice => {
        choice.classList.remove('disabled');
        choice.classList.add('enabled');
    });
    // enable finish game
    // disable newgame itself
    finishGameBtn.classList.remove('disabled');
    finishGameBtn.classList.add('enabled');
    newGameBtn.classList.remove('enabled');
    newGameBtn.classList.add('disabled');
});

// When click finish game
finishGameBtn.addEventListener('click', finishGame);

playerOptions.forEach(choice => {
    choice.addEventListener('click', () => {
        if(choice.classList.contains('enabled')) {
            playerChoice = choice.id;
            gameController(playerChoice);
        }
    });
});