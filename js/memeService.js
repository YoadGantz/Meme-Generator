const gKeywordsConterMap = { 'happy': 12, 'funny puk': 1 }
const gImgs = [];
let gSavedMemes;
let gNextId = 1;
let gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,
    txts: [
        {
            line: 'Insert Start Here',
            size: 40,
            font: 'Impact',
            align: 'center',
            fontColor: 'white',
            strokeColor: 'black',
            pos: {
                x: 30,
                y: null
            }
        },
        {
            line: 'Insert End Here',
            size: 40,
            font: 'Impact',
            align: 'center',
            fontColor: 'white',
            strokeColor: 'black',
            pos: {
                x: 30,
                y: null
            }
        }
    ]
}

function createImages() {
    gImgs.push(createImage('./meme-imgs (square)/5.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/9.jpg', ['mean', 'evil']))
    gImgs.push(createImage('./meme-imgs (square)/005.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/006.jpg', ['mean', 'evil']))
    gImgs.push(createImage('./meme-imgs (square)/003.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/004.jpg', ['mean', 'evil']))
    gImgs.push(createImage('./meme-imgs (square)/8.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/12.jpg', ['mean', 'evil']))
    gImgs.push(createImage('./meme-imgs (square)/Ancient-Aliens.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/img5.jpg', ['mean', 'evil']))
    gImgs.push(createImage('./meme-imgs (square)/img11.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/img12.jpg', ['mean', 'evil']))
    gImgs.push(createImage('./meme-imgs (square)/leo.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/meme1.jpg', ['mean', 'evil']))
    gImgs.push(createImage('./meme-imgs (square)/One-Does-Not-Simply.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/patrick.jpg', ['mean', 'evil']))
    gImgs.push(createImage('./meme-imgs (square)/putin.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/X-everywhere.jpg', ['mean', 'evil']))
}

function createImage(url, keywords) {
    return {
        id: gNextId++,
        url,
        keywords
    };
}

function getImages() {
    return gImgs;
}

function getCurrImg() {
    let img = gImgs.find(function (img) {
        return img.id === gMeme.selectedImgId;
    })
    return img.url;
}

function setMeme(id) {
    gMeme.selectedImgId = id;
}

function getMeme() {
    return gMeme;
}

function setTextLine(text) {
    let currTxtLine = gMeme.selectedTxtIdx
    gMeme.txts[currTxtLine].line = text;
}

function changeFontSize(diff) {
    let currTxtLine = gMeme.selectedTxtIdx
    gMeme.txts[currTxtLine].size += diff
}

function changeLinePos(diff) {
    let currTxtLine = gMeme.selectedTxtIdx
    gMeme.txts[currTxtLine].pos.y += diff;
}

function changeTextLine() {
    gMeme.selectedTxtIdx++
    if (gMeme.selectedTxtIdx >= gMeme.txts.length) gMeme.selectedTxtIdx = 0;

}

function changeFontType(fontType) {
    let currTxtLine = gMeme.selectedTxtIdx
    gMeme.txts[currTxtLine].font = fontType
}

function deleteTextLine() {
    let currTxtLine = gMeme.selectedTxtIdx
    gMeme.txts.splice(currTxtLine, 1);
    gMeme.selectedTxtIdx= (gMeme.selectedTxtIdx-1 + gMeme.txts.length)%gMeme.txts.length;
}

function addTextLine(posY, posX, input) {
    let pos = {x: posX, y: posY}
    let text = {line: input, size: 40, font: 'Impact', align:'center', color:'white', pos}
    gMeme.txts.push(text)
    gMeme.selectedTxtIdx = gMeme.txts.length-1;
}

function changeStrokeColor(color) {
    let currTxtLine = gMeme.selectedTxtIdx
    gMeme.txts[currTxtLine].strokeColor = color;
}

function changeFontColor(color) {
    let currTxtLine = gMeme.selectedTxtIdx
    gMeme.txts[currTxtLine].fontColor = color;
}

function changeAlignText(value) {
    let currTxtLine = gMeme.selectedTxtIdx
    gMeme.txts[currTxtLine].align = value;
}

function setTextLinePosY(idx, posY) {
    gMeme.txts[idx].pos.y = posY;    
}

function getNumOfLines() {
    return gMeme.txts.length
}

function saveMeme(data) {
    gSavedMemes.push(data);
    saveData();
}

function saveData() {
    saveToStorage('gSavedMemes', gSavedMemes);
}

function getSavedMemes() {
    return gSavedMemes;
}

function loadData() {
    gSavedMemes = loadFromStorage('gSavedMemes', [])
}