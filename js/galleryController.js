'use strict'

function init() {
    createImages();
    renderGallery();
}

function renderGallery() {
    let elGalleryImg = document.querySelector('.gallery-images');
    let images = getImages();
    let imgHTMLs = images.map(function (image) {
        let imgHTML = `<div class="gallery-img" id="${image.id}" style="height: 250px; width: 250px;"><img class="meme-img" src="${image.url}" id="${image.id}" onclick="onImgClicked(this)"/></div>`
        return imgHTML;
    })    
    elGalleryImg.innerHTML = imgHTMLs.join('')
}