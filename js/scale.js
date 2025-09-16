const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const initScale = () => {
  const scaleSmaller = document.querySelector('.scale__control--smaller');
  const scaleBigger = document.querySelector('.scale__control--bigger');
  const scaleValueField = document.querySelector('.scale__control--value');
  const previewImage = document.querySelector('.img-upload__preview img');

  if (!scaleSmaller || !scaleBigger || !scaleValueField || !previewImage) {
    return;
  }

  const applyScaleToPreview = (percent) => {
    const scale = percent / 100;
    previewImage.style.transform = `scale(${scale})`;
    scaleValueField.value = `${percent}%`;
  };

  const getCurrentScalePercent = () => {
    const value = parseInt(scaleValueField.value, 10);
    return Number.isNaN(value) ? SCALE_DEFAULT : value;
  };

  const setScalePercent = (value) => {
    const v = Math.min(Math.max(value, SCALE_MIN), SCALE_MAX);
    applyScaleToPreview(v);
  };

  const onScaleSmallerClick = (evt) => {
    evt.preventDefault();
    const current = getCurrentScalePercent();
    setScalePercent(current - SCALE_STEP);
  };

  const onScaleBiggerClick = (evt) => {
    evt.preventDefault();
    const current = getCurrentScalePercent();
    setScalePercent(current + SCALE_STEP);
  };

  // Начальное состояние
  scaleValueField.value = `${SCALE_DEFAULT}%`;
  applyScaleToPreview(SCALE_DEFAULT);

  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
};

export {initScale};
