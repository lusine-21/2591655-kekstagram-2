import {photos} from './data.js';
import {renderPictures} from './thumbnail.js';
import {initImageUploadForm} from './img-upload-form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';


// eslint-disable-next-line no-console
console.log(photos);

renderPictures(photos);
initImageUploadForm();
initScale();
initEffects();
