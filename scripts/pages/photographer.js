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

async function init() {
    const { photographers } = await getPhotographers();

    const url = new URL(window.location.href);
    const photographerId = url.searchParams.get('id');

    const photographer = photographers.find(photographer => photographer.id === parseInt(photographerId));

    if (photographer) {
        displayPhotographerInfo(photographer);
    } else {
        console.log("Photographer not found.");
    }
}

init();