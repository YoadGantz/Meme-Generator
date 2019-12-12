'use strict'

let gCanvas
let gCtx, gImg

function onImgClicked(elImg) {
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.editor-container').classList.add('flex');
    let elMemeFormCont = document.querySelector('.meme-form-container')
    let imgId = +elImg.id;
    setMeme(imgId);
    renderForm();
    gImg = elImg;
    gCanvas = document.querySelector('#my-canvas');
    if (window.innerWidth/2 > window.innerHeight-100){
        gCanvas.width = window.innerHeight-160;
        gCanvas.height = window.innerHeight-160;
        elMemeFormCont.style.height = window.innerHeight-160
        elMemeFormCont.style.width = window.innerHeight-160
    } else {
        gCanvas.width = window.innerWidth/2-100;
        gCanvas.height = window.innerWidth/2-100;
        elMemeFormCont.style.height = window.innerWidth/2-100
        elMemeFormCont.style.width = window.innerWidth/2-100
    }  
    setTextLinePosY(0, 30)
    setTextLinePosY(1, gCanvas.height-30)
    gCtx = gCanvas.getContext('2d')
    renderCanvas()
}

function drawTextLine() {
    let meme = getMeme();
    let txts = meme.txts;
    txts.forEach(function (text) {
        let line = text.line;
        let posX
        if (text.align === 'left') {
            posX = 20;
            gCtx.textAlign = 'left'
        } else if (text.align === "right") {
            posX = gCanvas.width-20;
            console.log(posX);
            
            gCtx.textAlign = 'right'
        } else {
            posX = gCanvas.width/2;
            gCtx.textAlign = 'center'
        }
        let posY = text.pos.y;
        gCtx.fillStyle = text.fontColor
        gCtx.font = `${text.size}px ${text.font}`
        gCtx.strokeStyle = text.strokeColor
        gCtx.lineWidth = 3
        drawText(line, posX, posY)
    })
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

function writeLineToCanvas() {
    let elTextInput = document.querySelector('#text-input');
    setTextLine(elTextInput.value);
    renderCanvas()
}

function onChangeLinePos(diff) {
    changeLinePos(diff)
    renderCanvas();
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderCanvas();
}

function onChangeTextLine() {
    changeTextLine()
    renderForm();
}

function renderCanvas() {
    drawImg();
    drawTextLine();
}

function onSubmitForm(event) {
    event.preventDefault();
    // let fontColor = document.querySelector('#font-color').value
    // console.log(fontColor);
}

function onChangeFontType(fontType) {
    changeFontType(fontType);
    renderCanvas();
}

function onAddTextLine() {
    addTextLine();
    renderCanvas();
    renderForm();
}

function onDeleteTextLine() {
    deleteTextLine();
    renderCanvas();
    renderForm();
}

function renderForm() {
    let meme = getMeme();
    let textIdx = meme.selectedTxtIdx;
    let elTextInputCont = document.querySelector('.text-input-container');
    let strHTML = `<input class="text-input" type="text" value="${meme.txts[textIdx].line}" id="text-input"
    oninput="writeLineToCanvas()">`
    elTextInputCont.innerHTML = strHTML
}

function onChangeFontColor() {
    let fontColor = document.querySelector('#font-color').value
    changeFontColor(fontColor);
    renderCanvas()
}

function onChangeStrokeColor() {
    let strokeColor = document.querySelector('#stroke-color').value
    changeStrokeColor(strokeColor);
    renderCanvas()
}

function onChangeAlignText(value) {
    changeAlignText(value)
    renderCanvas();
}