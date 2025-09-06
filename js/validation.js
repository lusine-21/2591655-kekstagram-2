const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;

const ErrorMessage = {
  INVALID_HASHTAG: 'Неправильный хэштег',
  HASHTAG_TOO_LONG: `Максимальная длина хэштега ${MAX_HASHTAG_LENGTH} символов`,
  HASHTAG_MAX_COUNT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`,
  DUPLICATE_HASHTAG: 'Хэштеги не должны повторяться',
  COMMENT_TOO_LONG: `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов`
};

// --- Проверка хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return false;
  }

  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);

  return hashtags.every((tag) => HASHTAG_REGEX.test(tag) && tag.length <= MAX_HASHTAG_LENGTH && tag !== '#')
    && uniqueTags.size === hashtags.length;
};

const getHashtagErrorMessage = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return ErrorMessage.HASHTAG_MAX_COUNT;
  }

  for (const tag of hashtags) {
    if (tag.length > MAX_HASHTAG_LENGTH) {
      return ErrorMessage.HASHTAG_TOO_LONG;
    }
    if (!HASHTAG_REGEX.test(tag) || tag === '#') {
      return ErrorMessage.INVALID_HASHTAG;
    }
  }

  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  if (new Set(lowerCaseTags).size !== hashtags.length) {
    return ErrorMessage.DUPLICATE_HASHTAG;
  }

  return '';
};

// --- Проверка комментария
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;
const getCommentErrorMessage = (value) =>
  value.length > MAX_COMMENT_LENGTH ? ErrorMessage.COMMENT_TOO_LONG : '';

const initUploadFormValidation = (form) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'pristine-error'
  });

  const hashtagInput = form.querySelector('.text__hashtags');
  const commentInput = form.querySelector('.text__description');

  pristine.addValidator(
    hashtagInput,
    validateHashtags,
    () => getHashtagErrorMessage(hashtagInput.value)
  );

  pristine.addValidator(
    commentInput,
    validateComment,
    () => getCommentErrorMessage(commentInput.value)
  );

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

  return pristine;
};

export { initUploadFormValidation };
