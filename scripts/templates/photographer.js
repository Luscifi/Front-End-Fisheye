const closeModalIcon = document.getElementById("close-modal-icon");
closeModalIcon.addEventListener("click", closeModalGallery);
function closeModalGallery() {
	const modal = document.getElementById("gallery-item-modal");
	modal.style.display = "none";
}

function photographerHeaderTemplate(data) {
	const { id, name, city, country, tagline, price, portrait } = data;
	const picture = `./assets/images/IDphotos/${portrait}`;

	function getUserHeaderDOM() {
		const h2 = document.getElementById("photographerHeaderName");
		h2.textContent = name;
		h2.setAttribute("aria-label", name);
		const h3 = document.getElementById("photographerHeaderh3");
		h3.textContent = `${city}, ${country}`;
		const taglineElement = document.getElementById("photographerHeaderTagline");
		taglineElement.textContent = tagline;
		const imgElement = document.querySelector(".photographerProfileImg");
		imgElement.src = picture;
		imgElement.alt = name;
		const priceDay = document.getElementById("price-day");
        
		priceDay.textContent = `${price} € / jour`; 

	}

	return { id, name, city, country, tagline, price, picture, getUserHeaderDOM };
}





