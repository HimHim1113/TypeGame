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

    //timerEnd();
    document.querySelector('.timer').textContent = '0.000';
    document.querySelector('.japanese').textContent = JAPANESE[counter];
}
init();

var timer = null;
var startTime = 0;
var time_memorizer = 0.0;
function timerStart() {
    startTime = new Date().getTime();
    timer = setInterval(function() {
        var time = (new Date().getTime() - startTime) / 1000;
	 time_memorizer = time;
        document.querySelector('.timer').textContent = time.toFixed(2);
    }, 10);
}
function timerEnd() {
    clearInterval(timer);
    timer = null;
}

var time_all = 0.0;
document.addEventListener('keydown', function(event) {
    var keyCode = event.keyCode;
    if (keyCode === 13 && types.length === 0) { // enter key
        if(!endFlag) time_all += time_memorizer;
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
        if (timer === null && types.length && counter === 0) {
            timerStart();
         }

        var next = types[0];
        if (next.textContent === key) {
            next.classList.add('ok');
            types.shift();
            /*if (types.length === 0) {
                timerEnd();
              }*/
        } else {
            next.classList.add('ng');
        }
    }
});

function end(){
    timerEnd();
    endFlag = true;
    var endTime = (new Date().getTime() - startTime) / 1000;
    document.querySelector('.timer').textContent = endTime.toFixed(2);
    document.querySelector('.container').textContent = '';
    document.querySelector('.japanese').textContent = 'END';
}
