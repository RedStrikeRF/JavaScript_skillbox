function createNumbersArray(count) {
    let pairs = [];
    for (let counter = 1; counter <= count; counter++) {
        pairs.push(counter, counter);
    }
    return pairs
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initialize_description () {

    const main_title = document.createElement('h1');
    const main_description = document.createElement('ol');
    const description = document.createElement('p');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');

    main_title.textContent = 'Добро пожаловать в игру';
    li1.textContent = 'Правила'
    li2.textContent = '1) Введите кол-во пар в поле для ввода(число), но не больше 16 пар'
    li3.textContent = '2) Постарайтесь найти пару для каждого числа'
    main_description.append(li1, li2, li3);

    main_title.classList.add('main-title');
    main_description.classList.add('main-descr');
    li1.classList.add('li-header');
    description.classList.add('descr');

    return {
        main_title,
        main_description,
        description
    }
}

function initialize_input() {
    const dispay = document.createElement('div');
    const field = document.createElement('input');
    const button = document.createElement('button');

    dispay.append(field);
    dispay.append(button);

    field.placeholder = 'Введите число пар';
    button.textContent = 'Начать игру';
    button.disabled = true;

    dispay.classList.add('input');
    button.classList.add('input-btn');
    field.classList.add('input_field');

    return {
        dispay,
        field,
        button
    };
}

function create_play_card(number) {
    const card = document.createElement('button');
    card.textContent = number;

    card.classList.add('open-card');

    return card;
}

function card_field() {
    const dispay = document.createElement('div')

    dispay.classList.add('game-field')
    return dispay;
}

function startGame(count) {
    const game_field = card_field();
    const body = document.body;
    const cards = shuffle(createNumbersArray(count));

    for (let i of cards) {
        game_field.append(create_play_card(i));
    }

    let open_count = 0
    let counter = 0;
    let open_card = []
    body.append(game_field);
    
    setTimeout(() => {
        for (let item of game_field.children) {
            item.classList.add('closed-card');
            item.classList.remove('open-card');
        }
    }, 5000)

    for (const item of game_field.children) {
        item.addEventListener('click', () => {
            if (item.classList.contains('open-card')) {
                return;
            }

            item.classList.add('open-card');
            item.classList.remove('closed-card');

            open_card.push(item.textContent);
            counter ++;
            
            if (counter == 2) {
                for (const disable of game_field.children) {
                    disable.disabled = true;
                }
                if (open_card[0] == open_card[1]) {
                    open_count += 2;
                    console.log(open_count)
                } else {
                    setTimeout(() => {
                        for(let card of game_field.children) {
                            
                            console.log(card.textContent, open_card[0], open_card[1])
                            if (card.textContent === open_card[0] || card.textContent === open_card[1]) {
                                card.classList.add('closed-card');
                                card.classList.remove('open-card');
                            }
                        }
                    }, 2000);
                }
                setTimeout(()=> {
                    open_card = [];
                    counter = 0
                }, 2000)
                setTimeout(() => {
                    for (const disable of game_field.children) {
                        disable.disabled = false;
                    }
                }, 2000)
            }
        })
    }
}

function game_started() {
    const body = document.body;
    const input = initialize_input();
    const description_item = initialize_description();

    body.append(description_item.main_title, description_item.main_description);
    body.append(input.dispay);
    body.append(description_item.description);

    input.field.addEventListener('input', () => {
        if (input.field.value) {
            input.button.disabled = false;
        } else {
            input.button.disabled = true;
        }

    });

    input.button.addEventListener('click', () => {
        if (!isNaN(input.field.value) && (input.field.value > 0 && input.field.value < 17)) {
            const pairs_count = parseInt(input.field.value);
            
            input.field.disabled = true;
            input.button.disabled = true;

            description_item.description.textContent = `Спасибо, что играете в мою игру. Мы играем на ${pairs_count} пар карт.`

            startGame(pairs_count);
        } else {
            input.field.value = '';
            input.button.disabled = true
            description_item.description.textContent = `Неправильный формат ввода, попробуйте еще раз!`
        }
    })
}

document.addEventListener("DOMContentLoaded", game_started());
