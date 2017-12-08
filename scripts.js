var newGameBtn = document.getElementById('js-newGameButton'),
    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),

    gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0,
    },
    computer = {
        score: 0,
    },

    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function () {
    playerPick('rock')
});
pickPaper.addEventListener('click', function () {
    playerPick('paper')
});
pickScissors.addEventListener('click', function () {
    playerPick('scissors')
});

function setGameElements () {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz?';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

function getComputerPick () {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

function checkRoundWinner (playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick === computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick === 'rock' && playerPick === 'scissors') ||
        (computerPick === 'scissors' && playerPick === 'paper') ||
        (computerPick === 'paper' && playerPick === 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs === 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    }else if (winnerIs === 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }else if (winnerIs === 'noone') {
        playerResultElem.innerHTML = "Remis";
        computerResultElem.innerHTML = "Remis";
    }
}

function playerPick (playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    winnerCheck();
    setGameElements();
}

function setGamePoints() {
    console.log('palyer: '+player.score);
    playerPointsElem.innerHTML = player.score;
    console.log('palyer: '+player.score);
    console.log('computer: '+computer.score);
    computerPointsElem.innerHTML = computer.score;
    console.log('computer: '+computer.score);
}

function winnerCheck(){
    if (player.score == 10){
        console.log('palyer: '+player.score)
        alert("The winner is "+player.name);
        gameState = 'ended';
    }else if (computer.score == 10){
        console.log('computer: '+computer.score)
        alert("Unfortunatelly your PC had more luck! Good luck next time! :)");
        gameState = 'ended';
    }

}

function newGame () {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;

    }

}

setGameElements(gameState);