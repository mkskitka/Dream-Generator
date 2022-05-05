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
    ' ': randomInt(30, 120),
    '.': 1500,
    '?': 1500,
    '!': 1200,
    ',': 500
}

function type(i, id, txt, speed, callback) {

    if (i < txt.length) {
        if(txt.charAt(i) === '$') {
            clearTxt(i, id, txt, speedd, callback)
        }
        else if(txt.charAt(i) === '[') {
            var subString = txt.substring(
                txt.indexOf("["),
                txt.indexOf("]")+1
            );
            var arr = subString.split(",");
            var value = arr[randomInt(0, arr.length-1)];
            value = value.replace("[", '');
            value = value.replace("]", '');
            txt = txt.replace(subString, '');
            console.log("value", value);
            console.log("txt", txt);
            addWord(id, value, "black", i, txt, speed, callback)
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
function addChar(i, id, txt, s, callback, color="#fff") {
    document.getElementById(id).innerHTML += "<font color="+color+">"+txt.charAt(i)+"</font>";
    i++;
    setTimeout(() => type(i, id, txt, s, callback), s);
}

function addWord(id, word, color="#fff", i, txt, speed, callback) {
    let char = word.charAt(0);
    word = word.substring(1);
    document.getElementById(id).innerHTML += "<font color="+color+">"+char+"</font>";
    if(word === "") {
        type(i, id, txt, speed, callback);
    }
    else {
        setTimeout(function () {
            addWord(id, word, color, i, txt, speed, callback)
        }, 100);
    }
}