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
        h3.setAttribute('aria-label', city + ', ' + country);
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


const close = document.querySelector('#close-modal-icon');
close.addEventListener('click', removeClasses);
function removeClasses(event) {
    currentItem = document.querySelector('.currentItem');
    prevItem = document.querySelector('.prevItem');
    nextItem = document.querySelector('.nextItem');
    if (currentItem) {
    currentItem.classList.remove('currentItem');
    }
    if (prevItem)  {
        prevItem.classList.remove('prevItem');
    }
    if (nextItem) {
    nextItem.classList.remove('nextItem');
    }
}



const openModalBtn = document.getElementById('contact-btn');
openModalBtn.addEventListener('click', openModalContact)



const closeContactModalBtn = document.getElementById('close-modal-icon-contact');
closeContactModalBtn.addEventListener("click", closeModalContact);

function closeModalContact() {
    const modal = document.getElementById('container-contact-modal');
    modal.style.display = 'none';
}



document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const modal = document.getElementById('gallery-item-modal');
    const currentItem = document.querySelector('.currentItem');

    if (modal.style.display === 'block' && currentItem) {
        switch (event.key) {
            case 'ArrowLeft':
                handlePrevItemClick(event);
                break;
            case 'ArrowRight':
                handleNextItemClick(event);
                break;
            case 'Escape':
                closeModalGallery();
                break;
            default:
                break;
        }
    }
}

