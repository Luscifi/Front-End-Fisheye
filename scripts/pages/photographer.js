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

    if (photographerHeader) {
        const photographerModel = photographerHeaderTemplate(photographer);
        const userHeaderDOM = photographerModel.getUserHeaderDOM();
        photographerHeader.appendChild(userHeaderDOM);
    } else {
        console.log("Element with class 'photographer-head' not found.");
    }
}

async function displayPhotographerGallery(photographerId, media, photographer) {
    const photographerGallery = document.querySelector('.photographer_gallery');
    const filteredMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);

    filteredMedia.forEach((mediaItem) => {
        const galleryModel = galleryTemplate(mediaItem, photographer.name);
        const galleryDOM = galleryModel.getGalleryDOM();

        if (galleryDOM instanceof Node) {
            photographerGallery.appendChild(galleryDOM);
        } else {
            console.log('galleryDOM is not a valid DOM node.');
        }
    });
}

async function init() {
    try {
        const { photographers, media } = await getPhotographers();
        const url = new URL(window.location.href);
        const photographerId = parseInt(url.searchParams.get('id'));

        console.log('photographerId:', photographerId);

        const photographer = photographers.find(photographer => photographer.id === photographerId);
        console.log('photographer:', photographer);

        if (photographer) {
            displayPhotographerInfo(photographer);
            displayPhotographerGallery(photographerId, media, photographer);
        } else {
            console.log('Photographer not found.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

init();