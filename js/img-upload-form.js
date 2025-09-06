import { initUploadFormValidation } from './validation.js';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');

const initImageUploadForm = () => {
  const pristine = initUploadFormValidation(form);

  const openForm = () => {
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
  };

  const closeForm = () => {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    form.reset();
    pristine.reset();
  };

  fileInput.addEventListener('change', openForm);
  cancelButton.addEventListener('click', closeForm);

  document.addEventListener('keydown', (evt) => {
    const isTextInput = evt.target.classList.contains('text__hashtags')
      || evt.target.classList.contains('text__description');

    if (evt.key === 'Escape' && !isTextInput) {
      evt.preventDefault();
      closeForm();
    }
  });
};

export { initImageUploadForm };
