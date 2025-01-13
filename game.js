let scoreStr = localStorage.getItem('Score');
let score;
resetScore(scoreStr);

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
      triggerFireworks();  // Trigger fireworks
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
      triggerFireworks();  // Trigger fireworks
    }
  } else {
    if (computerMove === 'Ball') {
      score.lost++;
      resultMsg = 'Computer has won';
    } else if (computerMove === 'Bat') {
      score.win++;
      resultMsg = 'User won.';
      triggerFireworks();  // Trigger fireworks
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

function triggerFireworks() {
  const fireworkContainer = document.createElement('div');
  fireworkContainer.classList.add('firework-container');
  document.body.appendChild(fireworkContainer);

  for (let i = 0; i < 50; i++) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = `${Math.random() * window.innerWidth}px`;
    firework.style.top = `${Math.random() * window.innerHeight}px`;
    fireworkContainer.appendChild(firework);

    setTimeout(() => {
      firework.remove();
    }, 1000); // Remove firework after animation completes
  }

  setTimeout(() => {
    fireworkContainer.remove();  // Remove container after all fireworks are done
  }, 1500);
}
