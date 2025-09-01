import {openBigPicture} from './fullsize-image';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const el = template.cloneNode(true);
    el.querySelector('.picture__img').src = url;
    el.querySelector('.picture__img').alt = description;
    el.querySelector('.picture__likes').textContent = likes;
    el.querySelector('.picture__comments').textContent = comments.length;

    el.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photos);
    });

    fragment.appendChild(el);
  });

  container.appendChild(fragment);
};

export {renderPictures};
