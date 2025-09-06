import {openBigPicture} from './fullsize-image.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const el = template.cloneNode(true);
    el.querySelector('.picture__img').src = photo.url;
    el.querySelector('.picture__img').alt = photo.description;
    el.querySelector('.picture__likes').textContent = photo.likes;
    el.querySelector('.picture__comments').textContent = photo.comments.length;

    el.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(el);
  });

  container.appendChild(fragment);
};

export {renderPictures};
