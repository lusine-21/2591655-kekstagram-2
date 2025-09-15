import {photos} from './data.js';
import {renderPictures} from './thumbnail.js';
import {initImageUploadForm} from './img-upload-form.js';
// eslint-disable-next-line no-console
console.log(photos);

renderPictures(photos);
initImageUploadForm();
