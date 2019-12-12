'use strict'

function renderSavedMemes() {
    let elSavedMemes = document.querySelector('.saved-memes');
    let savedMemes = getSavedMemes();
    let imgsUrls = savedMemes.map(function (savedMeme) {
        let imgHTML = `<div class="saved-meme-img"><img class="meme-img" src="${savedMeme}"/></div>`        
        return imgHTML;
    });
    elSavedMemes.innerHTML = imgsUrls.join('');
    
}

function onMemesTab(elOpt) {
    toggleActive(elOpt);
    document.querySelector('.saved-memes-container').style.display = 'block';
    document.querySelector('.about-container').style.display = 'none';
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.editor-container').classList.remove('flex');
    renderSavedMemes();
}