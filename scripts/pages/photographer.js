async function getPhotographers() {
    // Load data from JSON using Fetch
    const response = await fetch('./data/photographers.json');
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


async function displayMedia(photographerId, media, photographer) {
  let mediasTries;
      const tri = document.querySelector("#tribtn");
      const filteredMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);
      tri.addEventListener("change", function () {
          mediasTries = "";
          const container = document.querySelector('.photographer_gallery');
          container.innerHTML = "";
          switch (tri.value) {
      
              case 'popularity':
                  mediasTries = media.sort((a, b) => b.likes - a.likes);
                  displayPhotographersGallery(mediasTries);
                  break;
      
              case 'date':
                  mediasTries = media.sort((a, b) => new Date(b.date) - new Date(a.date));
                  displayPhotographersGallery(mediasTries);
                  break;
      
              case 'title':
                  mediasTries = media.sort((a, b) => a.title.localeCompare(b.title));
                  displayPhotographersGallery(mediasTries);
                  break;
      
              default:
                  displayPhotographersGallery(media);
                  break;
          }
      
      });
    }

async function displayPhotographerGallery(photographerId, media, photographer) {
    const photographerGallery = document.querySelector('.photographer_gallery');
    const filteredMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);
    let mediasTries;
    const tri = document.querySelector("#tribtn");
    const container = document.querySelector('.photographer_gallery');
          container.innerHTML = "";
          switch (tri.value) {
      
            case 'popularity':
                mediasTries = media.sort((a, b) => b.likes - a.likes);
                displayPhotographersGallery(mediasTries);
                break;
    
            case 'date':
                mediasTries = media.sort((a, b) => new Date(b.date) - new Date(a.date));
                displayPhotographersGallery(mediasTries);
                break;
    
            case 'title':
                mediasTries = media.sort((a, b) => a.title.localeCompare(b.title));
                displayPhotographersGallery(mediasTries);
                break;
    
            default:
                displayPhotographersGallery(media);
                break;
        }
    

    filteredMedia.forEach((mediaItem) => {
        const galleryModel = galleryTemplate(mediaItem, photographer.name);
        const galleryDOM = galleryModel.getGalleryDOM();
            photographerGallery.appendChild(galleryDOM);
    });
}



async function init() {
    try {
        const { photographers, media } = await getPhotographers();
        const url = new URL(window.location.href);
        const photographerId = parseInt(url.searchParams.get('id'));
        const photographer = photographers.find(photographer => photographer.id === photographerId)
        if (photographer) {
            displayPhotographerInfo(photographer);
            displayPhotographerGallery(photographerId, media, photographer);
        } else {
            console.log('Photographer not found.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

init();
