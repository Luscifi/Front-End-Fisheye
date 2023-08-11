async function getPhotographers() {
    // Charger les données à partir du fichier JSON en utilisant Fetch
    const response = await fetch('./data/photographers.json');
    const data = await response.json();

    const photographersArray = data.photographers;
    const mediaArray = data.media;

    // Retourner les photographes une fois récupérés
    return {
        photographers: photographersArray,
        media: mediaArray,

    };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();