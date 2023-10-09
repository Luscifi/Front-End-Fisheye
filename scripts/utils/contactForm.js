const openModalBtn = document.getElementById('contact-btn');
openModalBtn.addEventListener('click', openModalContact)

function openModalContact(event) {
    event.preventDefault();
    const modalContact = document.getElementById('container-contact-modal');
        modalContact.style.display = 'block';
    const namePhotographer = document.getElementById('photographerHeaderName');
    const namePhotographerContact = document.getElementById('photographer-name');
    namePhotographerContact.innerText = namePhotographer.innerText;
}

const closeContactModalBtn = document.getElementById('close-modal-icon-contact');
closeContactModalBtn.addEventListener("click", closeModalContact);

function closeModalContact() {
    const modal = document.getElementById('container-contact-modal');
    modal.style.display = 'none';
}

