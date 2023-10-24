async function getPhotographers() {
	// Charger les données à partir du fichier JSON en utilisant Fetch
	const response = await fetch("./data/photographers.json");
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

function photographerTemplate(data) {
	const {id, name, city, country, tagline, price, portrait } = data;

	const picture = `./assets/images/IDphotos/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		const imgLink = document.createElement("a");
		imgLink.href = `photographer.html?id=${id}`;
		imgLink.innerHTML = `<img src="${picture}" alt="${name}" class="profile-picture" />`;
		const h2 = document.createElement("h2");
		h2.textContent = name;
		h2.setAttribute("aria-label", name);
		const h3 = document.createElement("h3");
		h3.textContent = city + ", " + country;
		h3.setAttribute("aria-label", city + ", " + country);
		const taglineElement = document.createElement("p");
		taglineElement.setAttribute("id", "tagline");
		taglineElement.textContent = tagline;

		const priceElement = document.createElement("p");
		priceElement.setAttribute("id", "price");
		priceElement.textContent = price + " €/jour";


		article.appendChild(imgLink);
		article.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(taglineElement);
		article.appendChild(priceElement);

		return article;
	}
	return { id, name, city, country, tagline, price, picture, getUserCardDOM };
}