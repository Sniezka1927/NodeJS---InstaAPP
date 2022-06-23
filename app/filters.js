const filters = [

    {
        "id": 0,
        "name": "rotate",
        "description": "obrót w stopniach w prawo, ujemna wartość w lewo",
        "method": "patch",
        "args": "id obrazka, wartość x = 0-360"
    },
    {
        "id": 1,
        "name": "crop",
        "description": "obrót w stopniach w prawo, ujemna wartość w lewo",
        "method": "patch",
        "args": "id obrazka, w, h"
    },
    {
        "id": 2,
        "name": "flip",
        "description": "odwraca zdjecie w poziomie",
        "method": "patch",
        "args": "id obrazka"
    },
    {
        "id": 3,
        "name": "flop",
        "description": "odwraca zdjecie w pionie",
        "method": "patch",
        "args": "id obrazka"
    },
    {
        "id": 4,
        "name": "grayscale",
        "description": "czarno biale",
        "method": "patch",
        "args": "id obrazka"
    },
    {
        "id": 5,
        "name": "resize",
        "description": "zmienia rozmiar obrazka",
        "method": "patch",
        "args": "id obrazka, w ,h"
    },
    {
        "id": 6,
        "name": "negate",
        "description": "neguje kolory obrazka",
        "method": "patch",
        "args": "id obrazka"
    },
    {
        "id": 7,
        "name": "format",
        "description": "zmienia format zapisu",
        "method": "patch",
        "args": "id obrazka, format"
    }, {
        "id": 8,
        "name": "tint",
        "description": "zmienia kolory zdjecia",
        "method": "patch",
        "args": "id obrazka, r, g, b"
    },
]
module.exports = { filters }