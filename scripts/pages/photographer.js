async function getPhotographers() {
	const response = await fetch("./data/photographers.json");
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
	} else {
		console.log("Element with class 'photographer-head' not found.");
	}
}


async function displayPhotographerGallery(photographerId, media, photographer) {
	const photographerGallery = document.querySelector(".photographer_gallery");
	const filteredMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);
	let mediasTries;
	const tri = document.querySelector("#tribtn");
	const container = document.querySelector(".photographer_gallery");
	container.innerHTML = "";
	switch (tri.value) {
      
	case "popularity":
		mediasTries = filteredMedia.sort((a, b) => b.likes - a.likes);

		break;
    
	case "date":
		mediasTries = filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
		break;
    
	case "title":
		mediasTries = filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
		break;
    
	default:
		mediasTries = filteredMedia;
		break;
	}
    

	mediasTries.forEach((mediaItem) => {
		const galleryModel = galleryTemplate(mediaItem, photographer.name);
		const galleryDOM = galleryModel.getGalleryDOM();
		photographerGallery.appendChild(galleryDOM);
	});
}


async function init() {

	const { photographers, media } = await getPhotographers();
	const url = new URL(window.location.href);
	const photographerId = parseInt(url.searchParams.get("id"));
	const photographer = photographers.find(photographer => photographer.id === photographerId);
	displayPhotographerInfo(photographer);
	displayPhotographerGallery(photographerId, media, photographer);
	const tribtn = document.getElementById("tribtn");
	tribtn.addEventListener("change", () => {
		displayPhotographerGallery(photographerId, media, photographer);
	} );

}

init();
