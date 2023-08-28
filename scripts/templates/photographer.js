function photographerTemplate(data) {
    const {id, name, city, country, tagline, price, portrait } = data;

    const picture = `./assets/images/IDphotos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const imgLink = document.createElement('a');
        imgLink.href = `photographer.html?id=${id}`;
        imgLink.innerHTML = `<img src="${picture}" alt="${name}" class="profile-picture" />`;
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', name);
        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country;
        const taglineElement = document.createElement('p');
        taglineElement.setAttribute('id', 'tagline');
        taglineElement.textContent = tagline;
        const priceElement = document.createElement('p');
        priceElement.setAttribute('id', 'price');
        priceElement.textContent = price + ' €/jour';

        article.appendChild(imgLink);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return article;
    }
    return { id, name, city, country, tagline, price, picture, getUserCardDOM }
}

function closeModalGallery() {
    const modal = document.getElementById('gallery-item-modal');
    modal.style.display = 'none';
}

const closeModalIcon = document.getElementById('close-modal-icon');
closeModalIcon.addEventListener('click', closeModalGallery);

function photographerHeaderTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `./assets/images/IDphotos/${portrait}`;

    function getUserHeaderDOM() {
        const h2 = document.getElementById("photographerHeaderName");
        h2.textContent = name;
        h2.setAttribute('aria-label', name);
        const h3 = document.getElementById("photographerHeaderh3");
        h3.textContent = `${city}, ${country}`;
        const taglineElement = document.getElementById("photographerHeaderTagline");
        taglineElement.textContent = tagline;
        const imgElement = document.querySelector(".photographerProfileImg");
        imgElement.src = picture;
        imgElement.alt = name;
        const priceDay = document.getElementById('price-day');
        
        priceDay.textContent = `${price} € / jour`; 

    }

    return { id, name, city, country, tagline, price, picture, getUserHeaderDOM };
}
let totalLike = 0;
let likesArray = []
let mediaArray = [];
let mediaArrayAfterFunction;
function galleryTemplate(galleryItem, photographerName) {
    const { id, title, image, video, likes, price } = galleryItem;
    mediaArray.push(id);
    likesArray.push(likes)
    // Generate the path to the image using the photographer's name and image name
    const picture = `./assets/images/${photographerName}/${image}`;
    const videoPhotographer = `./assets/images/${photographerName}/${video}`;

    function getGalleryDOM() {
        const article = document.createElement('article');
        article.classList.add('gallery-item');

        const galleryLink = document.createElement('a');
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = picture;
            imgElement.alt = title;
            galleryLink.appendChild(imgElement);
        } else if (video) {
            const videoElement = document.createElement('video');
            videoElement.src = videoPhotographer;
            videoElement.controls = true;
            videoElement.setAttribute('aria-type', 'video');
            galleryLink.appendChild(videoElement);
        }
        galleryLink.addEventListener('click', openModalGallery);
        const galleryItemInfoDiv = document.createElement('div');
        galleryItemInfoDiv.classList.add('gallery-item-info');

        const galleryItemTitle = document.createElement('p');
        galleryItemTitle.textContent = title;
        galleryItemTitle.classList.add('gallery-item-title');

        const nbLikes = document.createElement('p');
        nbLikes.textContent = likes;
        const heartIconElement = document.createElement('i');
        heartIconElement.classList.add('fas', 'fa-heart');
        nbLikes.appendChild(heartIconElement);

        galleryItemInfoDiv.appendChild(galleryItemTitle);
        galleryItemInfoDiv.appendChild(nbLikes);
        galleryLink.appendChild(galleryItemInfoDiv);
        article.appendChild(galleryLink);
        totalLike = totalLike + likes;
        const LikesTotal = document.getElementById('likes-total');
        LikesTotal.textContent = totalLike;
        return article;


        function openModalGallery(event) {
            event.preventDefault();
            const modal = document.getElementById('gallery-item-modal');
            const modalContent = document.getElementById('gallery-item-modal-content');
            const imgModal = document.getElementById("modale-img");
            const videoModal = document.getElementById("modale-video");
            const titleModal = document.getElementById("gallery-item-title")
            if (image){ 
            imgModal.src = `./assets/images/${photographerName}/${image}`;
            imgModal.style.display = 'block';
            videoModal.style.display = 'none';
            titleModal.textContent = title;
        } else {
            videoModal.src = `./assets/images/${photographerName}/${video}`;
            videoModal.controls = true;
            videoModal.style.display='block'
            imgModal.style.display = 'none';
        }
            modal.style.display = 'block';
        }

    }

console.log(mediaArray);

currentId = id;

let findId = (element) => element === currentId;
indexOfId = mediaArray.findIndex(findId);
console.log(indexOfId)
indexOfIdPrevious = indexOfId - 1;
console.log(mediaArray[indexOfIdPrevious]);
indexOfIdNext = indexOfId + 1;
console.log(mediaArray[indexOfIdNext]);


    return { mediaArray, id, title, image, likes, price, getGalleryDOM };
}

console.log('mediaArray hors fonction :' + mediaArray);
console.log('likes array hors fonction :' + likesArray);
function openModalContact(event) {
    event.preventDefault();
    const modalContact = document.getElementById('container-contact-modal');
        modalContact.style.display = 'block';
}

const openModalBtn = document.getElementById('contact-btn');
openModalBtn.addEventListener('click', openModalContact);

function closeModalContact() {
    const modal = document.getElementById('container-contact-modal');
    modal.style.display = 'none';
}



const comboText2 = document.querySelector('#combo1-0');
console.log(comboText2);
selectedOption3 = comboText2.value;
selectecOption4 = comboText2.text;
console.log(selectedOption3);
console.log(selectedOption4);