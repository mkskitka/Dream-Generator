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
        else if(txt.charAt(i) === '.' || txt.charAt(i) === '?') {
            addChar(i, id, txt, 2000, callback);
        }
        else if(txt.charAt(i) === '!') {
            addChar(i, id, txt, 1000, callback);
        }
        else if(txt.charAt(i) === ',') {
            addChar(i, id, txt, 200, callback);
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