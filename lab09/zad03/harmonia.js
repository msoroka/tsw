/* jshint strict: global, esversion: 6, devel: true, node: true, browser:true */
'use strict';

document.addEventListener("DOMContentLoaded", function () {
    let headers = document.querySelectorAll('.hd');

    Array.from(headers).forEach((header) => {
        header.nextSibling.nextSibling.style.display = 'none';

        header.addEventListener('mouseout', (event) => {
            event.preventDefault();

            header.nextSibling.nextSibling.style.display = 'none';
        });

        header.addEventListener('mouseover', (event) => {
            event.preventDefault();

            header.nextSibling.nextSibling.style.display = 'block';
        });
    });

});