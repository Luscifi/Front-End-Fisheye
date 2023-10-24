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
                imgModal.alt = title;
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
    article.addEventListener('click', galleryChecker);

     

    return { id, title, image, likes, price, getGalleryDOM };
}


function galleryChecker(event) {
    const clickedItem = event.currentTarget;
    clickedItem.classList.add('currentItem');
    const prevItem = clickedItem.previousElementSibling;
    if (prevItem) {
        prevItem.classList.add('prevItem');
        chevronLeft.style.display = 'block';
    } else {
        const chevronLeft = document.querySelector('#chevron-left');
        chevronLeft.style.display = 'none';
    }
    const nextItem = clickedItem.nextElementSibling;
    if(nextItem) {
    nextItem.classList.add('nextItem');
    } else  {
        const chevronRight = document.querySelector('#chevron-right');
        chevronRight.style.display = 'none';
    }
}



const chevronLeft = document.querySelector('#chevron-left');
chevronLeft.addEventListener('click', handlePrevItemClick);

const chevronRight = document.querySelector('#chevron-right');
chevronRight.addEventListener('click', handleNextItemClick);


function handlePrevItemClick(event) {
    chevronRight.style.display = 'block';
    chevronLeft.style.display = 'block';
    const prevItem = document.querySelector(".prevItem");
    const nextItem = document.querySelector(".nextItem");
    let newCurrentItem;
    if (prevItem) {
        const prevImg = prevItem.querySelector('img');
        const prevVideo = prevItem.querySelector('video');
        const prevTitleElement = prevItem.querySelector('.gallery-item-title');
        const imgModal = document.getElementById("modale-img");
        const videoModal = document.getElementById("modale-video");
        const titleModal = document.getElementById("gallery-item-title");
        if (prevImg) {
            imgModal.style.display = 'block';
            videoModal.style.display = 'none';
            const prevSrc = prevImg.getAttribute('src');
            const prevTitle = prevTitleElement.textContent;
            imgModal.src = prevSrc;
            titleModal.textContent = prevTitle;
        }
        if (prevVideo) {
            imgModal.style.display = 'none';
            videoModal.style.display = 'block';
            const prevSrc = prevVideo.getAttribute('src');
            const prevTitle = prevTitleElement.textContent;
            videoModal.src = prevSrc;
            titleModal.textContent = prevTitle;
        }
        let currentItem = document.querySelector('.currentItem');
        newCurrentItem = currentItem.previousElementSibling; 
        currentItem.classList.remove('currentItem');
        newCurrentItem.classList.add('currentItem');

    if (nextItem) {
      nextItem.classList.remove('nextItem');
    }
    if (prevItem) {
        prevItem.classList.remove('prevItem');
        
    }
    const newPrevItem = newCurrentItem.previousElementSibling;
    const newNextItem = newCurrentItem.nextElementSibling;

    if (newPrevItem) {
        newPrevItem.classList.add('prevItem');
        chevronLeft.style.display = 'block';
    } else {
        chevronLeft.style.display = 'none';
    }
    if (newNextItem) {
        newNextItem.classList.add('nextItem');
        chevronRight.style.display = 'block';
    } else {
        chevronRight.style.display = 'none';
    }
}
}

function handleNextItemClick(event) {
    chevronRight.style.display = 'block';
    chevronLeft.style.display = 'block';
    const prevItem = document.querySelector(".prevItem");
    const nextItem = document.querySelector(".nextItem");
    
    let newCurrentItem; 
    if (nextItem) {
        const nextImg = nextItem.querySelector('img');
        const nextVideo = nextItem.querySelector('video');
        const nextTitleElement = nextItem.querySelector('.gallery-item-title');
        const imgModal = document.getElementById("modale-img");
        const videoModal = document.getElementById("modale-video");
        const titleModal = document.getElementById("gallery-item-title");
        if (nextImg) {
            imgModal.style.display = 'block';
            videoModal.style.display = 'none';
            const nextSrc = nextImg.getAttribute('src');
            const nextTitle = nextTitleElement.textContent;
            imgModal.src = nextSrc;
            titleModal.textContent = nextTitle;
        }
        if (nextVideo) {
            imgModal.style.display = 'none';
            videoModal.style.display = 'block';
            const nextSrc = nextVideo.getAttribute('src');
            const nextTitle = nextTitleElement.textContent;
            videoModal.src = nextSrc;
            titleModal.textContent = nextTitle;
        }
        let currentItem = document.querySelector('.currentItem');
        newCurrentItem = currentItem.nextElementSibling; 
        currentItem.classList.remove('currentItem');
        newCurrentItem.classList.add('currentItem');
    }

    if (nextItem) {
        nextItem.classList.remove('nextItem');
    }
    if (prevItem) {
        prevItem.classList.remove('prevItem');
    }

    const newPrevItem = newCurrentItem.previousElementSibling;
    const newNextItem = newCurrentItem.nextElementSibling;
    if (newPrevItem) {
    newPrevItem.classList.add('prevItem');
    chevronLeft.style.display = 'block';
    } else {
        chevronLeft.style.display = 'none';
    }

    if (newNextItem) {
    newNextItem.classList.add('nextItem');
    chevronRight.style.display = 'block';
    } else {
        chevronRight.style.display = 'none';
    }
}