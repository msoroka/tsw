/* jshint strict: global, esversion: 6, devel: true, node: true, browser:true */
'use strict';

document.addEventListener("DOMContentLoaded", function () {
    let headers = document.querySelectorAll('.hd');

    Array.from(headers).forEach((header) => {
        header.addEventListener('click', (event) => {
            event.preventDefault();

            if (header.nextSibling.nextSibling.style.display == 'none') {
                header.nextSibling.nextSibling.style.display = 'block';
            } else {
                header.nextSibling.nextSibling.style.display = 'none';
            }
        });
    });

});