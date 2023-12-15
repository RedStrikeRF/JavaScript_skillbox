const FIELD_SIZE = 10;
const field = document.createElement('div');
field.classList.add('field');
document.body.appendChild(field);

function getElementByCoordinates(x, y) {
  return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
}

function getRandomCoordinates() {
  const x = Math.round(Math.random() * (FIELD_SIZE-3) + 3);
  const y = Math.round(Math.random() * (FIELD_SIZE-1) + 1);
  return [x,y];
}

for(let i = 0; i < FIELD_SIZE * FIELD_SIZE; i++) {
  const excel = document.createElement('div');
  excel.classList.add('excel');
  excel.dataset.x = (i % 10) + 1;
  excel.dataset.y = Math.floor(i/10) + 1;
  field.appendChild(excel);
}

function generateSnake() {
  const [x,y] = getRandomCoordinates();
  return [[x,y], [x-1,y], [x-2,y]];
}

const snake = [];
const coordinates = generateSnake();
coordinates.forEach((el, index) => {
  const elem = getElementByCoordinates(...el);
  elem.classList.add(index ? 'snake-body' : 'snake-head');
  snake.push(elem);
})

let mouse;

function createMouse() {
  const generateMouse = () => {
    const [x, y] = getRandomCoordinates();
    mouse = getElementByCoordinates(x, y);
  }
  
  while (!mouse || mouse.className.includes('snake')) {
    generateMouse();
  }
  mouse.classList.add('mouse');
}

createMouse();