let input = document.getElementById('inputValue');
let addButton = document.getElementById('addButton');
let deleteButton = document.getElementById('deleteButton');
let sortByNameBtn = document.getElementById('sortByName');
let sortByValueBtn = document.getElementById('sortByValue');
let list = document.getElementById('lister');
let hint = document.getElementsByClassName('hintText')[0];

//Функція затримки на видалення повідомлення в hint
function timeOut() {
    setTimeout(() => hint.innerText = '', 3000);
}

//Функція додавання элементів на сторінку
function addItem() {
    // перевірка на порожність вводу
    if (input.value.trim() === '') {
        hint.innerText = "Поле вводу не може бути порожнім.";
        timeOut();
        input.value = ''; // Чистимо input
        return;
    }
    // перевірка на кількість символів. Якщо користувач вводить одну букву, число, або просто '=' то відпрацює умова
    if (input.value.length <= 1) {
        hint.innerText = "Потрібно ввести значення до та після знаку '=' ";
        timeOut();
        input.value = ''; // Чистимо input
        return;
    }

    if (/^[а-яА-Яa-zA-Z0-9ёіїЁІЇ= ]+$/.test(input.value)) { // Перевірка на заборонені символи. Доступні усі букви, цифри, та пробіл.
        let split = input.value.split('='); // розділення введеного в input через знак "="

        if (split.length === 1) {
            hint.innerText = "Відсутній знак '='.";
            timeOut();
            input.value = ''; // Очистка input
            return;
        }

        if (split.length !== 2) { // Перевірка, якщо після спліту слів більше ніж 2, то виводить помилку. Це захищає від вводу більше ніж 2-ух знаків "="
            hint.innerText = "Поле вводу має містити тільки 1 знак '='";
            input.value = ''; // Чистимо input
            return;
        }

        if (split[0].trim() === '' || split[1].trim() === '') {
            hint.innerText = "Необхідно ввести значення до та після '='.";
            timeOut();
            input.value = ''; // Очистка input
            return;
        }


        //прибираємо усі пробіли

        let split1 = split[0].replace(/\s+/g, '');
        let split2 = split[1].replace(/\s+/g, '');

        // На випадок якщо один пробіл між словами потрібно зберегти. Наприклад " Павло       Андрійович  =  Петренко" вивід буде "Павло Андрійвич=Петренко"
        // строки 57-58 коментуємо, строки нижче розкоментовуємо

        // let split1 = split[0].trim();
        // let split2 = split[1].trim();


        // створюємо <option>, заповнюємо його словами які сплітанули, апендимо <option> в <select>
        const option = document.createElement('option');
        option.innerText = `${split1}=${split2}`; // заповнюємо його словами які сплітанули
        list.append(option);
        input.value = '';

        // Якщо перевірка в першому if на символи не пройдена, виконується цей блок коду
    } else {
        hint.innerText = "Недопустимі символи */+%;№...";
        timeOut();
        input.value = '';
    }
}

//Функція сортування елементів, де indexA, indexB це індекси елементів масиву після .split()
function sortItems(indexA, indexB) {
    // Отримуємо елементи <option> у списку
    let options = Array.from(list.getElementsByTagName('option'));

    // Сортуємо елементи списку за індексом
    options.sort((a, b) => {
        let valueA = a.innerText.split('=')[indexA];
        let valueB = b.innerText.split('=')[indexB];
        return valueA.localeCompare(valueB);
    });

    // Чистимо список, та додаємо в нього відсортовані елементи
    list.innerHTML = '';
    options.forEach(option => list.append(option)); // Додаємо відсортовані елементи
}

// Обробник кнопки додати
addButton.addEventListener('click', () => {
    addItem();  // Викликаємо функцію додавання елементів
});

// Додаємо можливість додавати вміст, при натисканні клавіші enter
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

// //Обробник кнопки видалити
deleteButton.addEventListener('click', () => {

    let selectedOptions = Array.from(list.selectedOptions);
    selectedOptions.forEach(option => {
        option.remove();
    });
});

//обробник кнопки SortByName
sortByNameBtn.addEventListener('click', () => {
    //сортуємо по значенню до =. Передаємо індекси у функцію сортування
    sortItems(0, 0);
});


//обробник кнопки SortByValue
sortByValueBtn.addEventListener('click', () => {
    //сортуємо по значенню після =. Передаємо індекси у функцію сортування
    sortItems(1, 1);
});