const WOW = require('wow.js');

new WOW().init();

// Script for modal
(() => {
    const refs = {
      openModalBtnEdu: document.querySelector('[data-modal-open-edu]'),
      openModalBtnCons: document.querySelector('[data-modal-open-cons]'),
      openModalBtnSup: document.querySelector('[data-modal-open-sup]'),
      closeModalBtnHr: document.querySelector('[data-modal-close-hr]'),
      modalHr: document.querySelector('[data-modal-hr]'),
    };

    refs.openModalBtnEdu.addEventListener('click', toggleModal);
    refs.openModalBtnCons.addEventListener('click', toggleModal);
    refs.openModalBtnSup.addEventListener('click', toggleModal);
    refs.closeModalBtnHr.addEventListener('click', toggleModal);
  
    function toggleModal() {
      refs.modalHr.classList.toggle('is-hidden');
    }
  })();

  // Smooth animation script for page navigation
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};