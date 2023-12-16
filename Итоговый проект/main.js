const menu = [
  { name: 'Борщ', category: 'супы', price: 150 },
  { name: 'Чай', category: 'напитки', price: 50 },
  { name: 'Стейк', category: 'мясо', price: 250 },
];

const cart = [];

function renderMenu() {
  const menuContainer = document.getElementById('menu');
  menuContainer.innerHTML = '';
  
  menu.forEach(dish => {
    const dishElem = document.createElement('div');
    dishElem.classList.add('dish');
    dishElem.innerHTML = `<h3>${dish.name}</h3><p>${dish.category}</p><p>${dish.price} руб.</p>`;
    dishElem.addEventListener('click', () => addToCart(dish));
    menuContainer.appendChild(dishElem);
  });
}

function addToCart(dish) {
  cart.push(dish);
  updateCart();
}

function updateCart() {
  const cartModal = document.getElementById('modal');
  cartModal.innerHTML = '<h2>Корзина</h2>';
  
  if (cart.length === 0) {
    cartModal.innerHTML += '<p>Корзина пуста</p>';
  } else {
    const total = cart.reduce((acc, dish) => acc + dish.price, 0);
    cart.forEach(dish => {
      cartModal.innerHTML += <p>${dish.name} - ${dish.price} руб.</p>;
    });
    cartModal.innerHTML += <p>Итого: ${total} руб.</p>;
  }
  
  cartModal.classList.remove('hidden');
}

document.getElementById('cart').addEventListener('click', () => updateCart());

renderMenu();