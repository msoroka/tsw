let express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    axios = require('axios');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

io.sockets.on('connection', function (socket) {
    socket.on('wojewodztwa', function (data) {
        let woj = data.woj;
        let id = null;
        axios.get('http://10.10.44.6:3000/wojewodztwa')
            .then(function (response) {
                response.data.forEach(val => {
                    if (val.województwo == woj) {
                        id = val.id;
                    }
                });
            }).then(function () {
                axios.get('http://10.10.44.6:3000/wyniki?id_gte=' + id + '&id_lte=' + (id + 19999))
                    .then(function (response) {
                        let glosy = 0;
                        let koalicja = 0;
                        let lewica = 0;
                        let polexit = 0;
                        let jednosc = 0;
                        let pis = 0;
                        let europa = 0;
                        let wiosna = 0;
                        let konfederacja = 0
                        let kukiz = 0;
                        let fairplay = 0;

                        let gminy = [];

                        response.data.forEach(val => {
                            gminy.push({
                                name: val.gmina,
                                glosy: val['Liczba kart ważnych'],
                                wyniki: [{
                                    name: 'KOALICJA EUROPEJSKA',
                                    wynik: (val['KOALICJA EUROPEJSKA'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: 'LEWICA RAZEM',
                                    wynik: (val['LEWICA RAZEM'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: 'POLEXIT',
                                    wynik: (val['POLEXIT'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: 'JEDNOŚĆ NARODU',
                                    wynik: (val['JEDNOŚĆ NARODU'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: 'PRAWO I SPRAWIEDLIWOŚĆ',
                                    wynik: (val['PRAWO I SPRAWIEDLIWOŚĆ'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: 'EUROPA CHRISTI',
                                    wynik: (val['EUROPA CHRISTI'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: 'WIOSNA',
                                    wynik: (val['WIOSNA'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: 'KONFEDERACJA',
                                    wynik: (val['KONFEDERACJA'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: "KUKIZ'15",
                                    wynik: (val["KUKIZ'15"] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                },
                                {
                                    name: 'POLSKA FAIR PLAY',
                                    wynik: (val['POLSKA FAIR PLAY'] * 100 / val['Liczba kart ważnych']).toFixed(2),
                                }
                            ],
                            });
                            glosy += val['Liczba kart ważnych'];
                            koalicja += val['KOALICJA EUROPEJSKA'];
                            lewica += val['LEWICA RAZEM'];
                            polexit += val['POLEXIT'];
                            jednosc += val['JEDNOŚĆ NARODU'];
                            pis += val['PRAWO I SPRAWIEDLIWOŚĆ'];
                            europa += val['EUROPA CHRISTI'];
                            wiosna += val['WIOSNA'];
                            konfederacja += val['KONFEDERACJA'];
                            kukiz += val["KUKIZ'15"];
                            fairplay += val['POLSKA FAIR PLAY'];
                        });
                        io.emit('wojewodztwa', {
                            woj: woj,
                            glosy: glosy,
                            wyniki: [{
                                    name: 'KOALICJA EUROPEJSKA',
                                    wynik: (koalicja * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: 'LEWICA RAZEM',
                                    wynik: (lewica * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: 'POLEXIT',
                                    wynik: (polexit * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: 'JEDNOŚĆ NARODU',
                                    wynik: (jednosc * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: 'PRAWO I SPRAWIEDLIWOŚĆ',
                                    wynik: (pis * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: 'EUROPA CHRISTI',
                                    wynik: (europa * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: 'WIOSNA',
                                    wynik: (wiosna * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: 'KONFEDERACJA',
                                    wynik: (konfederacja * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: "KUKIZ'15",
                                    wynik: (kukiz * 100 / glosy).toFixed(2),
                                },
                                {
                                    name: 'POLSKA FAIR PLAY',
                                    wynik: (fairplay * 100 / glosy).toFixed(2),
                                }
                            ],
                            gminy: gminy
                        });
                    });
            }).catch(function (error) {
                io.emit('wojewodztwa', null);
            });
    });
});