const gKeywordsConterMap = { 'happy': 12, 'funny puk': 1 }
const gImgs = [];
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
                y: 50
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
                y: 450
            }
        }
    ]
}

function createImages() {
    gImgs.push(createImage('./meme-imgs (square)/5.jpg', ['success']))
    gImgs.push(createImage('./meme-imgs (square)/9.jpg', ['mean', 'evil']))
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
    gMeme.selectedTxtIdx--;
}

function addTextLine() {
    let pos = {x: 30, y:200}
    let text = {line: '', size: 40, font: 'Impact', align:'left', color:'white', pos}
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