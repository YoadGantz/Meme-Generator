'use strict'

let gCanvas
let gCtx, gImg

function onImgClicked(elImg) {
    let imgId = +elImg.id;
    setMeme(imgId);
    renderForm();
    gImg = elImg;
    gCanvas = document.querySelector('#my-canvas');
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
            posX = 30;
            gCtx.textAlign = 'left'
        } else if (text.align === "right") {
            posX = 470;
            gCtx.textAlign = 'right'
        } else {
            posX = 250;
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
    let elForm = document.querySelector('.meme-form');
    let strHTML = `<input class="text-input" type="text" value="${meme.txts[textIdx].line}" id="text-input" oninput="writeLineToCanvas()">
            <button class="upSizeFont"><img src="./icons/increaseFont.png" onclick="onChangeFontSize(+2)"></button>
            <button class="downSizeFont"><img src="./icons/decreaseFont.png" onclick="onChangeFontSize(-2)"></button>
            <button class="upTextPos"><img src="./icons/upTextArrow.png" onclick="onChangeLinePos(-2)"></button>
            <button class="downTextPos"><img src="./icons/downTextArrow.png" onclick="onChangeLinePos(+2)"></button>
            <button class="changeTextLine"><img src="./icons/up-and-down-opposite-double-arrows-side-by-side.png" onclick="onChangeTextLine()"></button>
            <button class="addTextLine"><img src="./icons/add.png" onclick="onAddTextLine()"></button>
            <button class="deleteTextLine"><img src="./icons/trash.png" onclick="onDeleteTextLine()"></button>
            
            <button class="align-left"><img src="./icons/align-to-left.png" onclick="onChangeAlignText('left')"></button>
            <button class="align-center"><img src="./icons/align-to-center.png" onclick="onChangeAlignText('center')"></button>
            <button class="align-right"><img src="./icons/align-to-right.png" onclick="onChangeAlignText('right')"></button>
            
            <select class="font-types" onchange="onChangeFontType(this.value)">
                <option value="Impact">Impact</option>
                <option value="Helvetica">Helvetica</option>
                <option value="David">David</option>
            </select>
            <label for="font-color" class="font-color"><img src="./icons/paint-board-and-brush.png"/></label>
            <input type="color" id="font-color" onchange="onChangeFontColor()">
            <label for="stroke-color" class="stroke-color"><img src="./icons/text-stroke.png"/></label>
            <input type="color" id="stroke-color" onchange="onChangeStrokeColor()">`
    elForm.innerHTML = strHTML
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