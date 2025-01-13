let scoreStr = localStorage.getItem('Score');
let score;
resetScore(scoreStr);

// Event listeners for the buttons
document.getElementById('bat-button').addEventListener('click', function() {
  let computerChoice = generateComputerChoice();
  let resultMsg = getResult('Bat', computerChoice);
  showResult('Bat', computerChoice, resultMsg);
});

document.getElementById('ball-button').addEventListener('click', function() {
  let computerChoice = generateComputerChoice();
  let resultMsg = getResult('Ball', computerChoice);
  showResult('Ball', computerChoice, resultMsg);
});

document.getElementById('stump-button').addEventListener('click', function() {
  let computerChoice = generateComputerChoice();
  let resultMsg = getResult('Stump', computerChoice);
  showResult('Stump', computerChoice, resultMsg);
});

function resetScore(scoreStr) {
  score = scoreStr ? JSON.parse(scoreStr) : {
    win: 0,
    lost: 0,
    tie: 0,
  };

  score.displayScore = function() {
    return `Score: Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
  };

  showResult();
}

function generateComputerChoice() {
  //This will generate random number between 0 and 3
  let randomNumber = Math.random() * 3;
  if (randomNumber > 0 && randomNumber <= 1) {
    return 'Bat';
  } else if (randomNumber > 1 && randomNumber <= 2) {
    return 'Ball';
  } else {
    return 'Stump';
  }
}

function getResult(userMove, computerMove) {
  let resultMsg = '';
  if (userMove === 'Bat') {
    if (computerMove === 'Ball') {
      score.win++;
      resultMsg = 'User won.';
      triggerConfetti();  // Trigger confetti when user wins
    } else if (computerMove === 'Bat') {
      score.tie++;
      resultMsg = `It's a tie`;
    } else if (computerMove === 'Stump') {
      score.lost++;
      resultMsg = 'Computer has won';
    }
  } else if (userMove === 'Ball') {
    if (computerMove === 'Ball') {
      score.tie++;
      resultMsg = `It's a tie`;
    } else if (computerMove === 'Bat') {
      score.lost++;
      resultMsg = 'Computer has won';
    } else if (computerMove === 'Stump') {
      score.win++;
      resultMsg = 'User won.';
      triggerConfetti();  // Trigger confetti when user wins
    }
  } else {
    if (computerMove === 'Ball') {
      score.lost++;
      resultMsg = 'Computer has won';
    } else if (computerMove === 'Bat') {
      score.win++;
      resultMsg = 'User won.';
      triggerConfetti();  // Trigger confetti when user wins
    } else if (computerMove === 'Stump') {
      score.tie++;
      resultMsg = `It's a tie`;
    }
  }
  return resultMsg;
}

function showResult(userMove, computerMove, result) {
  localStorage.setItem('Score', JSON.stringify(score));
  
  document.querySelector('#user-move').innerText = 
    userMove ? `You have chosen ${userMove}` : '';
  
  document.querySelector('#computer-move').innerText =
    computerMove ? `Computer choice is ${computerMove}` : '';
  
  document.querySelector('#result').innerText = result || '';
  document.querySelector('#score').innerText = score.displayScore();
}

// Confetti animation function
function triggerConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti-container');
  document.body.appendChild(confettiContainer);

  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#FF9F33'];
  const numberOfConfetti = 150;  // Increase the number of confetti elements
  
  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * window.innerWidth}px`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random duration between 2 and 5 seconds
    confetti.style.animationDelay = `${Math.random() * 1}s`; // Random delay
    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => {
    confettiContainer.remove();  // Remove the confetti container after celebration
  }, 3000);  // Keep confetti for at least 3 seconds
}
