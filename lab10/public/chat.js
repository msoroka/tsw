document.addEventListener("DOMContentLoaded", function () {
    let socket = io.connect("http://localhost:3000");

    socket.on('message', function (data){
        appendMessage(data);
    });

    setUsername();
    sendMessage(socket);
    hamburgerMenu();
});

let setUsername = () => {
    if (window.localStorage.getItem('username')) {
        document.getElementById('logged-user').innerText = window.localStorage.getItem('username');
    }

    document.getElementById('set-username').addEventListener('click', (event) => {
        if (document.querySelector('input[name="username"]').style.display === 'none') {
            document.querySelector('input[name="username"]').style.display = 'block';
            document.querySelector('input[name="username"]').value = document.getElementById('logged-user').innerText;
            document.getElementById('logged-user').style.display = 'none';
        } else {
            let username = document.querySelector('input[name="username"]');
            document.querySelector('input[name="username"]').style.display = 'none';
            document.getElementById('logged-user').innerText = username.value;
            document.getElementById('logged-user').style.display = 'block';
            window.localStorage.setItem('username', username.value);
        }
    });
};

let sendMessage = (socket) => {
    let button = document.getElementById('send-message');

    button.addEventListener('click', (event) => {
        let message = document.querySelector('input[name="message"]').value;
        document.querySelector('input[name="message"]').value = "";

        socket.emit('message', {
            room: "main",
            username: window.localStorage.getItem('username'),
            message: message,
        });
    });
};

let hamburgerMenu = () => {
    let burger = document.querySelector('.burger');
    let nav = document.querySelector('#' + burger.dataset.target);

    burger.addEventListener('click', () => {
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
    });
};

let appendMessage = (data) => {
    let messages = document.querySelector('.message-history');
    let message = document.createElement("P");
    message.innerHTML = "<strong>" + data.username + "</strong> - " + data.message;
    messages.append(message);
};
