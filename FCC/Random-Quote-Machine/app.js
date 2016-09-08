var arrColor = ['#E74C3C', '#342224', '#77B1A9', '#73A857', '#F39C12', '#2C3E50', '#472E32'];
var arrQuotes = [
    ["Everything negative-pressure,challenges-is all an opportunity for me to rise.", "Kobe Bryant"],
    ["All human wisdom is summed up in two words ?C wait and hope. ", "Alexandre Dumas Pére"],
    ["Other men live to eat, while I eat to live. ", "Socrates"],
    ["A man may lead a horse to the water, but he cannot make it drink. ", "Heywood"],
    ["Living without an aim is like sailing without a compass.", "J. Ruskin"],
    ["We soon believe what we desire.", "Chaucer"],
    ["Early to bed and early to rise, makes a man healthy, wealthy, and wise.", "Benjamin Franklin"]
];

var shiftBtn = document.querySelector('#shift-btn'),
    quoteAuthor = document.querySelector('#quote-author'),
    quoteTxt = document.querySelector('#quote-txt');

function changeTheme() {
    /* 1-len*/
    var index = Number.parseInt(Math.random() * arrColor.length + 1);
    var cur = arrQuotes[index];
/*    var txt = cur[0];
    var author = cur[1];*/
    quoteTxt.innerHTML = cur[0];
    quoteAuthor.innerHTML=cur[1];


    document.querySelector('.container').style.backgroundColor = arrColor[index];
    document.querySelector('.quote-box').style.color = arrColor[index];
    var nodelist = document.querySelector('.btn').querySelectorAll('a');
    for(let i = 0;i<nodelist.length;i++){
        (function (i) {
            var item = nodelist[i];
            item.style.backgroundColor = arrColor[index];
        })(i);
    }
    shiftBtn.querySelectorAll('a')[0].style.backgroundColor = arrColor[index];

}

// changeTheme();
shiftBtn.onclick = changeTheme;