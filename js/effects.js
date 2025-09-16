const EFFECTS = {
  none: {
    range: null,
    start: null,
    step: null,
    apply: () => ''
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    apply: (v) => `grayscale(${v})`
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    apply: (v) => `sepia(${v})`
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    apply: (v) => `invert(${v}%)`
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    apply: (v) => `blur(${v}px)`
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    apply: (v) => `brightness(${v})`
  }
};

const initEffects = () => {
  const previewImage = document.querySelector('.img-upload__preview img');
  const effectLevelContainer = document.querySelector('.img-upload__effect-level');
  const effectSliderElement = document.querySelector('.effect-level__slider');
  const effectLevelValue = document.querySelector('.effect-level__value');
  const effectRadios = Array.from(document.querySelectorAll('input[name="effect"]'));

  if (!previewImage || !effectLevelContainer || !effectSliderElement || !effectLevelValue || !effectRadios.length) {
    return;
  }

  noUiSlider.create(effectSliderElement, {
    start: EFFECTS.chrome.start,
    range: EFFECTS.chrome.range,
    step: EFFECTS.chrome.step,
    connect: 'lower'
  });

  const slider = effectSliderElement.noUiSlider;

  const showEffectSlider = (show) => {
    effectLevelContainer.classList.toggle('hidden', !show);
  };

  const applyEffectToPreview = (effectName, value) => {
    if (effectName === 'none') {
      previewImage.style.filter = '';
      effectLevelValue.value = '';
      return;
    }
    const effect = EFFECTS[effectName];
    previewImage.style.filter = effect.apply(value);
    effectLevelValue.value = String(value);
  };

  const configureSliderForEffect = (effectName) => {
    if (effectName === 'none') {
      showEffectSlider(false);
      applyEffectToPreview('none');
      return;
    }

    const effect = EFFECTS[effectName];
    showEffectSlider(true);

    slider.updateOptions({
      range: effect.range,
      step: effect.step,
      start: effect.start
    });

    slider.set(effect.start);
    applyEffectToPreview(effectName, effect.start);
  };

  slider.on('update', (values, handle) => {
    const value = parseFloat(values[handle]);
    const currentEffect = effectRadios.find((r) => r.checked)?.value || 'none';
    applyEffectToPreview(currentEffect, value);
  });

  effectRadios.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      configureSliderForEffect(evt.target.value);
    });
  });

  // По умолчанию "Оригинал"
  const defaultRadio = effectRadios.find((r) => r.value === 'none');
  if (defaultRadio) {
    defaultRadio.checked = true;
    configureSliderForEffect('none');
  }
};

export {initEffects};
