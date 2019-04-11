/* jshint strict: global, esversion: 6, devel: true, node: true, browser:true */
'use strict';

document.addEventListener("DOMContentLoaded", function() {
    let newGameBtn = document.getElementById('new-game-btn');

    newGameBtn.addEventListener('click', (event) => {
        let size = document.getElementById('size').value;
        let colors = document.getElementById('colors').value;
        let steps = document.getElementById('steps').value;

        if(steps == '') steps = 'inf';

        var requestURL = 'http://localhost:3000/game/new';
        var request = new XMLHttpRequest();

        request.open('POST', requestURL, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({
            'size': size,
            'colors': colors,
            'steps': steps,
        }));

        request.onload = function() {
            localStorage.setItem('gameId', this.response.game);
        };
    });
 });
