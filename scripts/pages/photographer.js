//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    // Charger les données à partir du fichier JSON en utilisant Fetch
    const response = await fetch('./data/photographers.json');
    const data = await response.json();

    const photographersArray = data.photographers;
    const mediaArray = data.media;
    console.log(photographersArray);
    console.log(mediaArray);
    // Retourner les photographes une fois récupérés
    return {
        photographers: photographersArray,
        media: mediaArray
    };
}

async function displayData(media) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((media) => {
        const mediaModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
    
}

