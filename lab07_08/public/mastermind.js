/* jshint strict: global, esversion: 6, devel: true, node: true, browser:true */
'use strict';

let globalSteps;
let colorMap;
let colorGlob = 0;

document.addEventListener("DOMContentLoaded", function () {
    let newGameBtn = document.getElementById('new-game-btn');
    // let statusGameBtn = document.getElementById('status-game-btn');

    generateColorMap();

    // let gameId = window.localStorage.getItem('gameId');
    // if (!gameId) {
    //     statusGameBtn.style.display = 'none';
    // }

    newGameBtn.addEventListener('click', (event) => {
        event.preventDefault();
        newGame();
    });

    // statusGameBtn.addEventListener('click', (_event) => {
    //     statusGame();
    // });
});

let generateBoard = (size) => {
    let div = document.getElementById('move-game');

    for (let i = 0; i < size; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.name = "move";
        input.value = "0";
        input.setAttribute('class', 'input-hide');
        input.setAttribute("required", "required");
        div.appendChild(input);
    }

    let button = document.createElement("button");
    button.id = "move-game-btn";
    button.type = "submit";
    button.textContent = "Wykonaj ruch";
    div.appendChild(button);

    let moveGameBtn = document.getElementById('move-game-btn');

    moveGameBtn.addEventListener('click', (_event) => {
        moveGame();
    });
};

let newGame = () => {
    window.localStorage.removeItem('gameId');

    document.body.style.backgroundColor = "lightgrey";
    document.body.style.color = "black";

    document.getElementById('steps-game').innerHTML = '';
    document.getElementById('history-game').innerHTML = '';
    document.getElementById('color-picker').innerHTML = '';
    document.getElementById('move-game').innerHTML = '';

    let size = document.getElementById('size').value;
    let colors = document.getElementById('colors').value;
    let steps = document.getElementById('steps').value;

    if (size == '' || colors == '') {
        console.log("Proszę uzupełnić dane nowej gry");
        return;
    }

    if (steps == '') steps = 'inf';

    let requestURL = 'http://localhost:3000/game/new';
    let request = new XMLHttpRequest();

    globalSteps = steps;

    let div = document.getElementById('steps-game');
    let move = document.createElement("P");
    move.id = "steps-left";
    move.innerText = "Pozostałe ruchy: " + globalSteps;
    div.appendChild(move);

    request.open('POST', requestURL, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
        'size': size,
        'colors': colors,
        'steps': steps,
    }));

    request.onload = function () {
        let response = JSON.parse(this.response);
        window.localStorage.setItem('gameId', response.game);
        window.localStorage.setItem('size', size);
        window.localStorage.setItem('colors', colors);
        window.localStorage.setItem('steps', steps);

        createColorPicker(colors);
        createColorInputs(size);

        if (response) {
            generateBoard(response.size);
            console.log(response);
        } else {
            console.log('Błąd podczas tworzenia gry');
        }
    };
};

let statusGame = () => {
    let gameId = window.localStorage.getItem('gameId');

    if (gameId) {
        let requestURL = 'http://localhost:3000/game/status';
        let request = new XMLHttpRequest();

        request.open('POST', requestURL, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({
            'game': gameId,
        }));
        request.onload = function () {
            let response = JSON.parse(this.response);

            if (response) {
                console.log(response);
            } else {
                console.log('Błąd podczas pobierania statusu gry');
            }
        };
    } else {
        console.log('Brak gry');
    }
};

let moveGame = () => {
    let gameId = window.localStorage.getItem('gameId');

    if (gameId) {
        let requestURL = 'http://localhost:3000/game/move';
        let request = new XMLHttpRequest();

        let moveValues = [];
        let move = document.querySelectorAll("input[name='move']");

        move.forEach((input) => {
            moveValues.push(parseInt(input.value));
        });

        request.open('POST', requestURL, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({
            'game': gameId,
            'move': moveValues,
        }));
        request.onload = function () {
            let response = JSON.parse(this.response);
            if (response && this.status !== 202) {

                let outDiv = document.getElementById('history-game');
                let stepDiv = document.createElement("div");
                stepDiv.setAttribute('class', 'step');

                let div = document.createElement("div");
                div.setAttribute('class', 'history-move');
                moveValues.forEach((val, key) => {
                    let move = document.createElement("div");
                    move.style.backgroundColor = colorMap.get(val);
                    move.setAttribute('class', 'result-color');
                    div.appendChild(move);
                });
                stepDiv.appendChild(div);

                div = document.createElement("div");
                div.setAttribute('class', 'history-result');
                for (let index = 0; index < response.result.black; index++) {
                    let move = document.createElement("div");
                    move.style.backgroundColor = 'black';
                    move.setAttribute('class', 'result-bw');
                    div.appendChild(move);
                }

                for (let index = 0; index < response.result.white; index++) {
                    let move = document.createElement("div");
                    move.style.backgroundColor = 'white';
                    move.setAttribute('class', 'result-bw');
                    div.appendChild(move);
                }
                stepDiv.appendChild(div);

                outDiv.appendChild(stepDiv);

                let stepsLeft = document.getElementById('steps-left');
                if (globalSteps !== 'inf') {
                    globalSteps = parseInt(globalSteps) - 1;
                    stepsLeft.innerText = "Pozostałe ruchy: " + globalSteps;
                }

                if (response.result.black == moveValues.length) {
                    document.getElementById('move-game').innerHTML = '';
                    let message = document.getElementById('steps-left');
                    message.innerText = "Wygrana!";
                    document.body.style.backgroundColor = "#00cd00";
                    document.body.style.color = "white";
                }
            } else {

            }
            if (globalSteps == 0 && response.result.black != moveValues.length) {
                document.getElementById('move-game').innerHTML = '';
                let message = document.getElementById('steps-left');
                message.innerText = "Przegrana!";
                document.body.style.backgroundColor = "#C83200";
                document.body.style.color = "white";
            }
        };
    } else {
        console.log('Brak gry');
    }
};

let generateColorMap = () => {
    colorMap = new Map();

    colorMap.set(0, 'SILVER');
    colorMap.set(1, 'RED');
    colorMap.set(2, 'MAROON');
    colorMap.set(3, 'YELLOW');
    colorMap.set(4, 'OLIVE');
    colorMap.set(5, 'LIME');
    colorMap.set(6, 'BLUE');
    colorMap.set(7, 'FUCHSIA');
    colorMap.set(8, 'TEAL');
    colorMap.set(9, 'AQUA');
    colorMap.set(10, 'PURPLE');
};

let createColorPicker = (colors) => {
    let div = document.getElementById('color-picker');
    for (let index = 1; index <= colors; index++) {
        let picker = document.createElement("div");
        picker.setAttribute('class', 'picker');
        picker.style.background = colorMap.get(index);
        div.appendChild(picker);
    }

    let pickers = document.getElementsByClassName('picker');

    Array.from(pickers).forEach(picker => {
        picker.addEventListener('click', (event) => {
            let stringColor = event.target.style.backgroundColor;
            colorGlob = getKeyByValue(colorMap, stringColor);

            console.log(stringColor, colorGlob);
        });
    });
};

let createColorInputs = (size) => {
    let div = document.getElementById('move-game');
    console.log(div);
    for (let index = 1; index <= size; index++) {
        let picker = document.createElement("div");
        picker.setAttribute('class', 'picker-input');
        picker.style.background = colorMap.get(0);
        div.appendChild(picker);
    }
    let inputsColor = document.getElementsByClassName('picker-input');

    Array.from(inputsColor).forEach((picker, key) => {
        picker.addEventListener('click', (event) => {
            event.target.style.backgroundColor = colorMap.get(colorGlob);
            let move = document.querySelectorAll("input[name='move']");
            move[key].value = colorGlob;
        });
    });
};

let getKeyByValue = (object, value) => {
    let result = 0;

    object.forEach((val, key) => {
        if (val.toUpperCase() === value.toUpperCase()) {
            result = key;
        }
    });

    return result;
};