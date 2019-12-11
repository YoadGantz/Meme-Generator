'use strict'

let gCanvas
let gCtx, gImg

function onImgClicked(elImg) {
    let imgId = +elImg.id;
    setMeme(imgId);
    gImg = elImg;
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    drawImg();
    drawTextLine();
}

function drawTextLine() {
    let txts = getMemeLineTxt();
    let text = txts[0];
    let line = text.line;
    gCtx.fillStyle = text.color
    gCtx.font = `${text.size}px Impact ${text.color}`
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
    drawText(line, 30, 50)
}

function drawText(txt, x, y) { 
    gCtx.save()
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    gCtx.restore()
}

function drawImg() {
    if (gImg)
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    else {
        gImg = new Image()
        gImg.onload = () => {
            gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        };
    }
}

function writeLineToCanvas(){
    let elTextInput = document.querySelector('#text-input');
    setTextLine(elTextInput.value);
    drawImg();
    drawTextLine();
    
}