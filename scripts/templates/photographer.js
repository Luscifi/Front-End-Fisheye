function photographerTemplate(data) {
    const {id, name, city, country, tagline, price, portrait } = data;

    const picture = `./assets/images/IDphotos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const imgLink = document.createElement('a');
        imgLink.href = `photographer.html?id=${id}`;
        imgLink.innerHTML = `<img src="${picture}" alt="${name}" class="profile-picture" />`;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute('aria-label', name);
        const h3 = document.createElement('h3');
        h3.textContent = city+', '+country;
        const taglineElement = document.createElement('p');
        taglineElement.setAttribute('id', 'tagline');
        taglineElement.textContent = tagline;
        const priceElement = document.createElement('p');
        priceElement.setAttribute('id', 'price');
        priceElement.textContent = price+' €/jour';

        article.appendChild(imgLink);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }
    return { id, name, city, country, tagline, price, picture, getUserCardDOM }
}

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
    }

    return { id, name, city, country, tagline, price, picture, getUserHeaderDOM };
}

function galleryTemplate(galleryItem, photographerName) {
    const { id, title, image, video, likes, price } = galleryItem;

    // Generate the path to the image using the photographer's name and image name
    const picture = `./assets/images/${photographerName}/${image}`;
    const videoPhotographer = `./assets/images/${photographerName}/${video}`;
    function getGalleryDOM() {
        const article = document.createElement('article');
        article.classList.add('gallery-item');
    
        const galleryLink = document.createElement('a');
        galleryLink.href = '#';
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
    
        function openModal(event) {
            event.preventDefault();
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `<p>Modal content for ${title}</p>`;
            modal.style.display = 'block';
        }
    
        galleryLink.addEventListener('click', openModal);
    
        return article;
    }
    return { id, title, image, likes, price, getGalleryDOM };
}




