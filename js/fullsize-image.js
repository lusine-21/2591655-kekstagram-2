
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;
let comments = [];
let shownCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  li.append(img, text);
  return li;
};

const renderComments = () => {
  const nextComments = comments.slice(shownCount, shownCount + COMMENTS_PER_PORTION);

  nextComments.forEach((comment) => {
    commentsList.appendChild(createCommentElement(comment));
  });

  shownCount += nextComments.length;
  shownCommentsCount.textContent = shownCount;
  totalCommentsCount.textContent = comments.length;

  commentsLoader.classList.toggle('hidden', shownCount >= comments.length);
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  caption.textContent = photo.description;

  comments = photo.comments;
  shownCount = 0;
  commentsList.innerHTML = '';
  renderComments();

  commentCountBlock.classList.remove('hidden');

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const onCommentsLoaderClick = (evt) => {
    evt.preventDefault();
    renderComments();
  };


  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  closeButton.addEventListener('click', closeBigPicture, { once: true });
};

export {openBigPicture};
