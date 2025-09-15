import {initUploadFormValidation} from './validation.js';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');

const initImageUploadForm = () => {
  const pristine = initUploadFormValidation(form);

  const onEscKeydown = (evt) => {
    const isTextInput =
      evt.target.classList.contains('text__hashtags') ||
      evt.target.classList.contains('text__description');

    if (evt.key === 'Escape' && !isTextInput) {
      evt.preventDefault();
      onCancelButtonClick();
    }
  };

  const onFileInputChange = () => {
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeydown);
  };

  function onCancelButtonClick() {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    form.reset();
    pristine.reset();
    document.removeEventListener('keydown', onEscKeydown);
  }

  fileInput.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
};


export {initImageUploadForm};
