function openModalContact(event) {
    event.preventDefault();
    const modalContact = document.getElementById('container-contact-modal');
        modalContact.style.display = 'block';
    const namePhotographer = document.getElementById('photographerHeaderName');
    const namePhotographerContact = document.getElementById('photographer-name');
    namePhotographerContact.innerText = namePhotographer.innerText;
}
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
