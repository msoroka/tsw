/* jshint strict: global, esversion: 6, devel: true, node: true, browser:true */
'use strict';

document.addEventListener("DOMContentLoaded", function () {
    let newGameBtn = document.getElementById('new-game-btn');
    let statusGameBtn = document.getElementById('status-game-btn');

    newGameBtn.addEventListener('click', (event) => {
        event.preventDefault();

        newGame();
    });

    statusGameBtn.addEventListener('click', (_event) => {
        statusGame();
    });
});

let generateBoard = (size) => {
    let div = document.getElementById('move-games');

    for (let i = 0; i < size; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.name = "move";
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

    let size = document.getElementById('size').value;
    let colors = document.getElementById('colors').value;
    let steps = document.getElementById('steps').value;

    if(size == '' || colors == '') {
        console.log("Proszę uzupełnić dane nowej gry");
        return;
    }

    if (steps == '') steps = 'inf';

    let requestURL = 'http://localhost:3000/game/new';
    let request = new XMLHttpRequest();

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
            input.value = '';
        });

        request.open('POST', requestURL, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({
            'game': gameId,
            'move': moveValues,
        }));
        request.onload = function () {
            let response = JSON.parse(this.response);

            if (response) {
                console.log(response);
                if(response.result.black == moveValues.length) {
                    let div = document.getElementById('move-games');
                    div.remove();
                    console.log('Wygrana !');
                }
            } else {
                console.log('Błąd podczas pobierania statusu gry');
            }
        };
    } else {
        console.log('Brak gry');
    }
};