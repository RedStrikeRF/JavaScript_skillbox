let openCardCount = 0;
let openCardValues = [];

function createNumbersArray(count) {
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push(i, i);
  }
  return result;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

(function gameOfPairs() {
  const startButton = document.querySelector('.begin-game');
  const input = document.querySelector('.card-count');

  startButton.addEventListener('click', () => {
    if (input.value) {
      createCardsField(input.value)
    } else {
      alert('Вы вводите что-то не то! Попробуйте еще раз.');
    }
  });
})();

function createCardsField(count) {
  const playCardsValues = shuffle(createNumbersArray(count));
  const gameField = document.querySelector('.game-field');
  
  for (const value of playCardsValues) {
    gameField.append(createCard(value));
  }
}

function createCard(value) {
  const button = document.createElement('button');

  button.classList.add('card');
  button.textContent = value;
  button.disabled = true;

  setTimeout(() => {
    button.classList.add('close-card');
    button.disabled = false;
  }, 3000);

  button.addEventListener('click', () => {
    openCardCount++;
    openCardValues.push(button.textContent);

    button.classList.add('open-card');
    button.classList.remove('close-card');

    if (openCardCount === 2) {
      document.querySelectorAll('.card').forEach(card => {card.disabled = true;});
      checkOpenCards();
      document.querySelectorAll('.card').filter(card => card.classList.contains('well-card')).forEach(card => {card.disabled = false;});
    }
    
  });

  return button;
}

function checkOpenCards() {
  const openCard = document.querySelectorAll('.open-card');

  if (openCardValues[0] === openCardValues[1]) {
    openCard.forEach(card => {
      card.classList.add('well-card');
      card.classList.remove('open-card');
    })
  } else {
    openCard.forEach(card => {
      setTimeout(() => {
        card.classList.remove('open-card');
        card.classList.add('close-card');
      }, 1200);
    });
  }
  openCardValues = [];
  openCardCount = 0;
}