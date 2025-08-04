const DESCRIPTIONS = [
  'Закат на море',
  'Прогулка в горах',
  'Любимая кошка',
  'Первый снег',
  'Кафе на углу',
  'Осенний парк',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом — и у неё получилось лучше.',
  'Я уронил фотоаппарат на кота — и вышло шедеврально.',
  'Лица перекошены, как будто их избивают.',
];

const COMMENT_NAMES = [
  'Даниил',
  'Ольга',
  'Михаил',
  'Светлана',
  'Денис',
  'Анна',
  'Иван',
  'Юлия',
];

const PHOTO_COUNT = 25;
const AVATAR_COUNT = 6;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = (id) => {
  const messageCount = getRandomInteger(1, 2);
  const fullMessage = Array.from({ length: messageCount }, () => getRandomArrayElement(MESSAGES)).join(' ');

  return {
    id: id,
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: fullMessage,
    name: getRandomArrayElement(COMMENT_NAMES),
  };
};

const createPhoto = (id) => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({ length: commentsCount }, (_, index) =>
    createComment(id * 100 + index)
  );

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: comments,
  };
};

const photos = Array.from({ length: PHOTO_COUNT }, (_, index) => createPhoto(index + 1));

// eslint-disable-next-line no-console
console.log(photos);
