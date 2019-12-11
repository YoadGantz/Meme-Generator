const gKeywordsConterMap = { 'happy': 12, 'funny puk': 1 }
const gImgs = [];
let gMeme = {
    selectedImgId: 1,
    selectedTxtIdx: 0,
    txts: [
        {line: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'red' }
    ]
}

function createImages() {
    gImgs.push(createImage({id: 1,url: './meme-imgs (square)/5.jpg', keywords: ['success']}))
    gImgs.push(createImage({id: 2,url: './meme-imgs (square)/9.jpg', keywords: ['mean', 'evil']}))
}

function createImage(image) {
    return {
        id: image.id,
        url: image.url,
        keywords: image.keywords
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

function getMemeLineTxt() {
    return gMeme.txts;
}

function setTextLine(text) {
    gMeme.txts[0].line = text;
}