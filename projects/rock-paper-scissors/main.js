// Variables
let playerChoice, computerChoice, playerScore, computerScore, rounds;
const playerOptions = document.querySelectorAll('.player-choices a');
const paper  = playerOptions[0];
const rock = playerOptions[1];
const scissors = playerOptions[2];

// Display Elements
const displayHeaderh1 = document.querySelectorAll('.display-header h1');
const displayheader = displayHeaderh1[0];
const displayText = displayHeaderh1[1];
const displayPlayerScore = document.getElementById('player-score');
const displayComputerScore = document.getElementById('computer-score');

// Text
const initialText = 'Start a New Game!';
const defaultText = 'Select your choice...';
const resultText1 = 'It\'s a tie!';
const resultText2 = 'You Lose! Paper beats Rock!';
const resultText3 = 'You Win! Rock beats Scissors!';
const resultText4 = 'You Lose! Scissors beats Paper';


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
    setTimeout(() => {
        element.style.transform = 'scale(0)';
    }, 3500);
    setTimeout(() => {element.classList.remove(choice);}, 4080);
    // element.style.transform = 'scale(1)';
};

const getRandomInteger = function(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
};

const getComputerPlay = function() {
    const randomNumber = getRandomInteger(1,3);
    let play;

    if(randomNumber === 1)
        play = 'rock';
    else if (randomNumber === 2)
        play = 'paper';
    else
        play = 'scissors';
    
    return play;
};

const showWinner = function() {
    let resultStr; 
    if(computerScore === playerScore) {
        console.log('It\'s a draw!');
        resultStr = `It's a draw!`;
    }
    else if(computerScore > playerScore) {
        console.log('Computer wins! I\'m sorry Dave. I\'m afraid I can\'t do that.');
        resultStr = `You lose!`;
    }
    else {
        console.log('Human wins!');
        resultStr = `You win!`;
    }
    writeInScreen(displayheader, resultStr);
};

const getRoundResult = function(playerChoice, computerChoice) {
    let result = new Array(3);
    if(playerChoice === computerChoice) {
        result[0] = 'It\'s a tie!';
        result[1] = 'draw';
    }
    else if(playerChoice === 'rock') {
        if(computerChoice === 'paper') {
            result[0] = 'You Lose! Paper beats Rock!';
            // winner
            result[1] = 'computer';
        }
        else {
            result[0] = 'You Win! Rock beats Scissors!';
            // winner
            result[1] = 'human';
        }
    }
    else if(playerChoice === 'paper') {
        if(computerChoice === 'scissors') {
            result[0] = 'You Lose! Scissors beats Paper';
            // winner
            result[1] = 'computer';
        }
        else {
            result[0] = 'You win! Paper beats Rock!';
            // winner
            result[1] = 'human';
        }
    }
    else if(playerChoice === 'scissors') {
        if(computerChoice === 'rock') {
            result[0] = 'You Lose! Rock beats Scissors';
            // winner
            result[1] = 'computer';
        }
        else {
            result[0] = 'You win! Scissors beats Paper!';
            // winner
            result[1] = 'human';
        }
    }
    
    return result;
};

const gameRound = function(playerChoice) {
    computerChoice = getComputerPlay();
    
    let result = getRoundResult(playerChoice, computerChoice);
    
    console.log('Computer plays: ', computerChoice, ' | Human plays: ', playerChoice);
    console.log(result[0]);
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
    window.setTimeout(() => {writeInScreen(displayText, result[0]);}, 3000 );

    window.setTimeout(() => {
        if(rounds < 4) {
            writeInScreen(displayheader, `Round ${rounds+1}`);
            writeInScreen(displayText, defaultText);
        }
        else if(rounds === 4) {
            writeInScreen(displayheader, `Last Round!`);
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
        console.log('Computer Score: ', computerScore);
        console.log('Human Score: ', playerScore);
        writeInScreen(displayComputerScore, computerScore);
        writeInScreen(displayPlayerScore, playerScore);
    }

    let winner = gameRound(playerChoice);
    
    if(winner == 'computer') {
        computerScore++;
    }
    else if(winner == 'human') {
        playerScore++;
    }

    console.log('Computer Score: ', computerScore);
    console.log('Human Score: ', playerScore);
    writeInScreen(displayComputerScore, computerScore);
    writeInScreen(displayPlayerScore, playerScore);

    if(rounds === 4) {
        window.setTimeout(() => {
        finish();
        }, 6101);
        
    }
    rounds++;
};
// game();

// get buttons
const newGameBtn = document.querySelector('.reset #newgame-btn');
const finishGameBtn = document.querySelector('.reset #finishgame-btn');

// When click New Game
newGameBtn.addEventListener('click', () => {
    // Set counters to 0
    // Initialize variables
    initialize();

    writeInScreen(displayheader, `Round ${rounds+1}`);
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

const finish = function() {
    if(finishGameBtn.classList.contains('enabled')) {
        
        writeInScreen(displayheader, initialText);
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

// When click finish game
finishGameBtn.addEventListener('click', finish);

playerOptions.forEach(choice => {
    choice.addEventListener('click', () => {
        console.log(choice);
        console.log(choice.id);
        if(choice.classList.contains('enabled')) {
            playerChoice = choice.id;
            
            gameController(playerChoice);
        }
    });
});


