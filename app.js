var QUESTION = ['kikai', 'denki', 'seigyo', 'kagaku'];
var JAPANESE = ['機械', '電気', '制御', '化学']
var counter = 0;
var endFlag = false;

var types = [];
function init() {
    document.querySelector('.container').innerHTML = '';

    types = QUESTION[counter].split('').map(function(str) {
        var type = document.createElement('span');
        type.className = 'type';
        type.textContent = str;
        document.querySelector('.container').appendChild(type);
        return type;
    });

    timerEnd();
    document.querySelector('.timer').textContent = '0.000';
    document.querySelector('.japanese').textContent = JAPANESE[counter];
}
init();

var timer = null;
var startTime = 0;
function timerStart() {
    startTime = new Date().getTime();
    timer = setInterval(function() {
        var time = (new Date().getTime() - startTime) / 1000;
        document.querySelector('.timer').textContent = time.toFixed(3);
    }, 10);
}
function timerEnd() {
    clearInterval(timer);
    timer = null;
}

var time_all = 0.0;
document.addEventListener('keydown', function(event) {
    var keyCode = event.keyCode;
    if (keyCode === 13) { // enter key
        if(!endFlag) time_all += (new Date().getTime() - startTime) / 1000;
        counter++;
        if(counter < QUESTION.length) init();
        else end();
        return;
    }

    var key = '';
    if (keyCode === 32) { // space key
        key = ' ';
    } else if (keyCode >= 65 && keyCode <= 90) {  // a to z
        key = String.fromCharCode(keyCode);
        if (event.shiftKey) {
            key = key.toUpperCase();
        } else {
            key = key.toLowerCase();
        }
    }

    if (key) {
        if (timer === null && types.length) {
            timerStart();
        }

        var next = types[0];
        if (next.textContent === key) {
            next.classList.add('ok');
            types.shift();
            if (types.length === 0) {
                timerEnd();
            }
        } else {
            next.classList.add('ng');
        }
    }
});

function end(){
    endFlag = true;
    document.querySelector('.timer').textContent = time_all.toFixed(3);
}

/*
or('.container').addEventListener('click', function(event) {
    var text = prompt('問題文を入力してください');
    if (text) {
        localStorage.QUESTION = QUESTION = text;
        init();
    }
});
*/