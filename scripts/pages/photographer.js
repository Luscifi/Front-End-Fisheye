async function getPhotographers() {
    // Load data from JSON using Fetch
    const response = await fetch('./data/photographers.json');
    const data = await response.json();

    const photographersArray = data.photographers;
    const mediaArray = data.media;

    return {
        photographers: photographersArray,
        media: mediaArray,
    };
}

async function displayPhotographerInfo(photographer) {
    const photographerHeader = document.querySelector(".photographer-head");
    const photographerModel = photographerHeaderTemplate(photographer);
    const userHeaderDOM = photographerModel.getUserHeaderDOM();
}

async function displayPhotographerGallery(photographerId, media, photographer) {
    const photographerGallery = document.querySelector('.photographer_gallery');
    const filteredMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);

    filteredMedia.forEach((mediaItem) => {
        const galleryModel = galleryTemplate(mediaItem, photographer.name);
        const galleryDOM = galleryModel.getGalleryDOM();
        photographerGallery.appendChild(galleryDOM);

    });
}

async function displayPreviousNext(photographerId, media, photographer) {
    const filteredMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);
    filteredMedia.forEach((mediaItem) => {
        const galleryModel = galleryTemplate(mediaItem, photographer.name);
        const galleryDOM = galleryModel.getGalleryDOM();
        photographerGallery.appendChild(galleryDOM);

    });
}

async function init() {

        const { photographers, media } = await getPhotographers();
        const url = new URL(window.location.href);
        const photographerId = parseInt(url.searchParams.get('id'));
        const photographer = photographers.find(photographer => photographer.id === photographerId);
            displayPhotographerInfo(photographer);
            displayPhotographerGallery(photographerId, media, photographer);


}

init();