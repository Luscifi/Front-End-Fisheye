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




function photographerHeaderTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `./assets/images/IDphotos/${portrait}`;

    function getUserHeaderDOM() {
        const h2 = document.getElementById("photographerHeaderName");
        h2.textContent = name;
        h2.setAttribute('aria-label', name);
        const h3 = document.getElementById("photographerHeaderh3");
        h3.textContent = `${city}, ${country}`;
        h3.setAttribute('aria-label', `${city}, ${country}`);
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

function galleryTemplate(galleryItem, photographerName) {


    const { id, title, image, video, likes, price } = galleryItem;
    likesArray.push(likes)
    const picture = `./assets/images/${photographerName}/${image}`;
    const videoPhotographer = `./assets/images/${photographerName}/${video}`;

    function getGalleryDOM() {
        const article = document.createElement('article');
        article.classList.add('gallery-item');
        console.log(article);
        article.addEventListener('click', galleryChecker);
    
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
        const nbLikesP = document.createElement('p');
        nbLikesP.classList.add('nbLikes');

        nbLikes.setAttribute('id', 'nbLikes');
        const heartIconElement = document.createElement('i');
        heartIconElement.classList.add('fa-regular', 'fa-heart', 'notLiked');
        heartIconElement.setAttribute('id', 'likeHeart');
        const likesTotal = document.querySelector('#likes-total');
        heartIconElement.addEventListener('click', function (event) {
            event.stopPropagation();
            const nbLikes = nbLikesP;
            if (nbLikes) {
              if (heartIconElement.classList.contains('fa-regular')) {
                heartIconElement.classList.remove('fa-regular');
                heartIconElement.classList.add('fas');
                const currentLikes = parseInt(nbLikes.textContent);
                nbLikes.textContent = currentLikes + 1;
        
                // Mettre à jour le nombre total de likes
                likesTotal.textContent = parseInt(likesTotal.textContent) + 1;
              } else {
                heartIconElement.classList.add('fa-regular');
                heartIconElement.classList.remove('fas');
                const currentLikes = parseInt(nbLikes.textContent);
                nbLikes.textContent = currentLikes - 1;
        
                // Mettre à jour le nombre total de likes
                likesTotal.textContent = parseInt(likesTotal.textContent) - 1;
              }
            }
          });
        
        nbLikes.appendChild(nbLikesP);
        nbLikes.appendChild(heartIconElement);
        nbLikesP.textContent = likes;
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
            const titleModal = document.getElementById("gallery-item-title");
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

    const article = document.createElement('article');
    article.classList.add('gallery-item');
    console.log(article);
    article.addEventListener('click', galleryChecker);

     

    return { id, title, image, likes, price, getGalleryDOM };
}



/*setTimeout(()=>{
     const comboText2 = document.querySelector('#combo1-0');
//comboText2.addEventListener('click', test())
function test() {
    console.log('test');
}
console.log(comboText2);
}2000)=*/
