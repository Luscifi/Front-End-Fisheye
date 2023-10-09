

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

