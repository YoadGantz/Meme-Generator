'use strict'

let gCanvas
let gCtx, gImg

function onImgClicked(elImg) {
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.saved-memes-container').style.display = 'none';
    document.querySelector('.about-container').style.display = 'none';
    document.querySelector('.editor-container').classList.add('flex');
    let elMemeFormCont = document.querySelector('.meme-form-container')
    let elCanvasCont = document.querySelector('.canvas-container');
    let imgId = +elImg.id;
    setMeme(imgId);
    renderForm();
    gImg = elImg;
    gCanvas = document.querySelector('#my-canvas');
    if (window.innerWidth < 800) {
        let size = window.innerWidth
        elMemeFormCont.style.height = size - 30;
        elMemeFormCont.style.width = size - 30;
        elCanvasCont.style.width = gCanvas.width;
        elCanvasCont.style.height = gCanvas.height;
        gCanvas.width = size - 30;
        gCanvas.height = size - 30;
    } else if (window.innerWidth / 2 > window.innerHeight - 100) {
        gCanvas.width = window.innerHeight - 160;
        gCanvas.height = window.innerHeight - 160;
        elCanvasCont.style.width = gCanvas.width;
        elCanvasCont.style.height = gCanvas.height;
        elMemeFormCont.style.height = window.innerHeight - 160;
        elMemeFormCont.style.width = window.innerHeight - 160;
    } else {
        gCanvas.width = window.innerWidth / 2 - 100;
        gCanvas.height = window.innerWidth / 2 - 100;
        elCanvasCont.style.width = gCanvas.width;
        elCanvasCont.style.height = gCanvas.height;
        elMemeFormCont.style.height = window.innerWidth / 2 - 100;
        elMemeFormCont.style.width = window.innerWidth / 2 - 100;

    }
    setTextLinePosY(0, 50)
    setTextLinePosY(1, gCanvas.height - 30)
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
            posX = gCanvas.width - 20;
            gCtx.textAlign = 'right'
        } else {
            posX = gCanvas.width / 2;
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
    let numOfLines = getNumOfLines();
    if (!numOfLines) onAddTextLine(elTextInput.value);
    setTextLine(elTextInput.value);
    renderCanvas();
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
    highlightCurrTxtLine();
}

function renderCanvas() {
    drawImg();
    drawTextLine();
    highlightCurrTxtLine();
}

function onSubmitForm(event) {
    event.preventDefault();
}

function onChangeFontType(fontType) {
    changeFontType(fontType);
    renderCanvas();
}

function onAddTextLine(input = '') {
    let canvasHeightCenter = gCanvas.height / 2
    let canvasWidthCenter = gCanvas.width / 2
    addTextLine(canvasHeightCenter, canvasWidthCenter, input);
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
    let value = (meme.txts[textIdx]) ? meme.txts[textIdx].line : ''
    let elTextInputCont = document.querySelector('.text-input-container');
    let strHTML = `<input class="text-input" type="text" value="${value}" id="text-input"
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

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL('image/jpeg')
    elLink.href = data
}

function onSaveMeme() {
    const data = gCanvas.toDataURL('image/jpeg')
    saveMeme(data)
}

function highlightCurrTxtLine() {
    let meme = getMeme();
    let elMarkersCont = document.querySelector('.markers-container');
    if (meme.txts.length) {
        let txtIdx = meme.selectedTxtIdx;
        let text = meme.txts[txtIdx];
        let fontSize = text.size;
        let posY = text.pos.y;
        elMarkersCont.innerHTML = `<div class="marker" style="top: ${posY - fontSize}px; height:${fontSize + 10}px"></div>`
    } else {
        elMarkersCont.innerHTML = ``
    }
}