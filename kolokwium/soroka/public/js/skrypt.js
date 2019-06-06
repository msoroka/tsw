const mapka = [
    { woj: 'pomorskie', left: 173, top: 1, width: 152, height: 125 },
    { woj: 'warmińsko-mazurskie', left: 327, top: 44, width: 168, height: 102 },
    { woj: 'zachodnio-pomorskie', left: 16, top: 54, width: 143, height: 124 },
    { woj: 'podlaskie', left: 501, top: 79, width: 115, height: 171 },
    { woj: 'lubuskie', left: 26, top: 193, width: 89, height: 141 },
    { woj: 'wielkopolskie', left: 123, top: 215, width: 130, height: 123 },
    { woj: 'mazowieckie', left: 387, top: 167, width: 106, height: 205 },
    { woj: 'kujawsko-pomorskie', left: 206, top: 147, width: 138, height: 64 },
    { woj: 'łódzkie', left: 277, top: 285, width: 104, height: 101 },
    { woj: 'dolnośląskie', left: 56, top: 345, width: 140, height: 70 },
    { woj: 'lubelskie', left: 499, top: 289, width: 121, height: 151 },
    { woj: 'opolskie', left: 203, top: 395, width: 59, height: 81 },
    { woj: 'śląskie', left: 268, top: 399, width: 62, height: 156 },
    { woj: 'świętokrzyskie', left: 354, top: 389, width: 133, height: 69 },
    { woj: 'małopolskie', left: 332, top: 462, width: 121, height: 111 },
    { woj: 'podkarpackie', left: 458, top: 459, width: 109, height: 113 }
];

let gminy = [];

document.addEventListener("DOMContentLoaded", function () {
    let socket = io.connect("http://localhost:3000");
    let mapkaImg = document.getElementById('mapka');

    socket.on('wojewodztwa', function (data){
        wynikiWoj(data);
    });

    mapkaImg.addEventListener('click', function(e){
        let x = e.clientX;
        let y = e.clientY;
        let clickedWoj = null;

        mapka.forEach(val => {
            if(x > val.left && x < val.left + val.width  && y > val.top && y < val.top + val.height) {
                clickedWoj = val.woj;
            }
        });

        wojewodztwa(socket, clickedWoj);
    });
});

let wojewodztwa = (socket, woj) => {
    socket.emit('wojewodztwa', {
        woj: woj
    });
};

let wynikiWoj = (data) => {
    let gminy = data.gminy;
    let div = document.getElementById('wyniki-woj');
    div.innerHTML = "";
    let wynikiDiv = document.createElement("div");
    let nazwa = document.createElement("P");
    nazwa.innerHTML = "Województwo: " + data.woj;
    let glosy = document.createElement("P");
    glosy.innerHTML = "Suma głosów: " + data.glosy;

    wynikiDiv.append(nazwa);
    wynikiDiv.append(glosy);

    data.wyniki.forEach(val => {
        let partia = document.createElement("P");
        partia.innerHTML = val.name + " wynik: " + val.wynik + " %";
        wynikiDiv.append(partia);
    });

    div.append(wynikiDiv);

    gminySelect(gminy);
};

let gminySelect = (data) => {
    console.log(data);
    let div = document.getElementById('wyniki-gminy');
    div.innerHTML = "";
    let select = document.createElement("select");

    let option = document.createElement("option");
    option.value = '';
    option.text = 'Proszę wybrać gminę';
    select.append(option);

    data.forEach(val => {
        let option = document.createElement("option");
        option.value = val.name;
        option.text = val.name;
        select.append(option);
    });


    let wynikiDiv = document.createElement("div");

    select.addEventListener('change', function(event) {
        let selectedName = this.value;
        data.forEach(val => {
            if(val.name == selectedName) {
                wynikiDiv.innerHTML = "";
                let nazwa = document.createElement("P");
                nazwa.innerHTML = "Gmina: " + val.name;
                let glosy = document.createElement("P");
                glosy.innerHTML = "Suma głosów: " + val.glosy;
                wynikiDiv.append(nazwa);
                wynikiDiv.append(glosy);

                val.wyniki.forEach(val => {
                    let partia = document.createElement("P");
                    partia.innerHTML = val.name + " wynik: " + val.wynik + " %";
                    wynikiDiv.append(partia);
                });
            }
        });
    });

    div.append(select);
    div.append(wynikiDiv);
};