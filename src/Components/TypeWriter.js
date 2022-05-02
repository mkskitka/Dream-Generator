const speedd = 50;
let cancel = false;
export const typeWriter = (id, txt, callback) => {
    cancel = false;
    var i =0;
    type(i, id, txt, speedd, callback)
}

export function cancelType() {
    cancel = true;
}

function randomInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const charSpeeds = {
    'a': 50,
    'b': 70,
    'c': 80,
    'd': 40,
    'e': 50,
    'f': 60,
    'g': 70,
    'h': 70,
    'i': 60,
    'j': 90,
    'k': 60,
    'l': 40,
    'm': 50,
    'n': 100,
    'o': 60,
    'p': 70,
    'q': 150,
    'r': 60,
    's': 40,
    't': 50,
    'u': 50,
    'v': 130,
    'w': 110,
    'x': 110,
    'y': 60,
    'z': 100,
    ' ': randomInt(30, 150),
    '.': 1500,
    '?': 1500,
    '!': 1000,
    ',': 500
}

function type(i, id, txt, speed, callback) {

    if (i < txt.length) {
        if(txt.charAt(i) === '$') {
            clearTxt(i, id, txt, speedd, callback)
        }
        else if(cancel) {
            addChar(i, id, txt, 10, callback);
        }
        else if(txt.charAt(i) === '*') {
            i++;
            let seconds = parseInt(txt.charAt(i));
            let ms = seconds * 1000;
            i++;
            addChar(i, id, txt, ms, callback);
        }
        else if(Object.keys(charSpeeds).includes(txt.charAt(i))) {
            addChar(i, id, txt, charSpeeds[txt.charAt(i)], callback);
        }
        else {
            addChar(i, id, txt, speedd, callback);
        }
    }
    else {
        callback();
    }
}

function clearTxt(i, id, txt, speed, callback) {
    document.getElementById(id).innerHTML = "";
    i++;
    setTimeout(() => type(i, id, txt, speed, callback), speed);
}
function addChar(i, id, txt, s, callback) {
    document.getElementById(id).innerHTML += txt.charAt(i);
    i++;
    setTimeout(() => type(i, id, txt, s, callback), s);
}