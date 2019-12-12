'use strict'

function init() {
    loadData();
    createImages();
    renderGallery();
}

function renderGallery() {
    let elGalleryImg = document.querySelector('.gallery-images');
    let images = getImages();
    let imgHTMLs = images.map(function (image) {
        let imgHTML = `<div class="gallery-img" id="${image.id}"><img class="meme-img" src="${image.url}" id="${image.id}" onclick="onImgClicked(this)"/></div>`
        return imgHTML;
    })
    elGalleryImg.innerHTML = imgHTMLs.join('')
}

function onGalleryTab(elOpt) {
    toggleActive(elOpt);
    document.querySelector('.gallery-container').style.display = 'block';
    document.querySelector('.about-container').style.display = 'none';
    document.querySelector('.saved-memes-container').style.display = 'none';
    document.querySelector('.editor-container').classList.remove('flex');
}

function toggleActive(elOpt) {
    let elMenuOptions = document.querySelectorAll('.menu-option');
    elMenuOptions.forEach(elMenuOption => {
        elMenuOption.classList.remove('active');
    });
    elOpt.classList.add('active')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onAboutTab(elOpt) {
    toggleActive(elOpt)
    document.querySelector('.about-container').style.display = 'block';
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.saved-memes-container').style.display = 'none';
    document.querySelector('.editor-container').classList.remove('flex');
}