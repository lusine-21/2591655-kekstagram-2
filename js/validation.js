const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[A-zА-яё0-9]{1,19}$/i;

const ErrorMessage = {
  INVALID_HASHTAG: 'Неправильный хэштег',
  HASHTAG_TOO_LONG: `Максимальная длина хэштега ${MAX_HASHTAG_LENGTH} символов`,
  HASHTAG_MAX_COUNT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`,
  DUPLICATE_HASHTAG: 'Хэштеги не должны повторяться',
  COMMENT_TOO_LONG: `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов`
};

let errorMessage = '';

const validateHashtags = (value) => {
  errorMessage = '';

  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    errorMessage = ErrorMessage.HASHTAG_MAX_COUNT;
    return false;
  }

  for (const hashtag of hashtags) {
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      errorMessage = ErrorMessage.HASHTAG_TOO_LONG;
      return false;
    }
    if (hashtag === '#' || !HASHTAG_REGEX.test(hashtag)) {
      errorMessage = ErrorMessage.INVALID_HASHTAG;
      return false;
    }
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    errorMessage = ErrorMessage.DUPLICATE_HASHTAG;
    return false;
  }

  return true;
};

const getHashtagErrorMessage = () => errorMessage;

// --- Проверка комментария
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;
const getCommentErrorMessage = (value) =>
  value.length > MAX_COMMENT_LENGTH ? ErrorMessage.COMMENT_TOO_LONG : '';

const initUploadFormValidation = (form) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
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

export {initUploadFormValidation};
