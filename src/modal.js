// Script for Hero section modal
(() => {
  const refs = {
    openModalBtnHr: document.querySelector('[data-modal-open-hr]'),
    closeModalBtnHr: document.querySelector('[data-modal-close-hr]'),
    modalHr: document.querySelector('[data-modal-hr]'),
  };

  refs.openModalBtnHr.addEventListener('click', toggleModal);
  refs.closeModalBtnHr.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modalHr.classList.toggle('is-hidden');
  }
})();

// Script for Hero mobile section modal
(() => {
  const refs = {
    openModalBtnHrMob: document.querySelector('[data-modal-open-hr-mob]'),
    closeModalBtnHrMob: document.querySelector('[data-modal-close-hr-mob]'),
    modalHrMob: document.querySelector('[data-modal-hr-mob]'),
  };

  refs.openModalBtnHrMob.addEventListener('click', toggleModal);
  refs.closeModalBtnHrMob.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modalHrMob.classList.toggle('is-hidden');
  }
})();

// Script for About section modal
(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();

// Script for Location modal
(() => {
  const refs = {
    openModalBtnLoc: document.querySelector('[data-modal-open-loc]'),
    closeModalBtnLoc: document.querySelector('[data-modal-close-loc]'),
    modalLoc: document.querySelector('[data-modal-loc]'),
  };

  refs.openModalBtnLoc.addEventListener('click', toggleModal);
  refs.closeModalBtnLoc.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modalLoc.classList.toggle('is-hidden');
  }
})();

// Script for Franchise modal
(() => {
  const refs = {
    openModalBtnFra: document.querySelector('[data-modal-open-fra]'),
    closeModalBtnFra: document.querySelector('[data-modal-close-fra]'),
    modalFra: document.querySelector('[data-modal-fra]'),
  };

  refs.openModalBtnFra.addEventListener('click', toggleModal);
  refs.closeModalBtnFra.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modalFra.classList.toggle('is-hidden');
  }
})();





    (() => {
        document
            .querySelector('.mail-input-form')
            .addEventListener('submit', e => {
                e.preventDefault();

                new FormData(e.currentTarget).forEach((value, name) =>
                    console.log(`${name}: ${value}`),
                );

                e.currentTarget.reset();
            });
    })
      ();
