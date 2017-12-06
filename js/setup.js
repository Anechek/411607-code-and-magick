'use strict';
(function () {
  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARDS_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;
  // Функция для получения целого случайного числа в заданном диапазоне
  function getRandomIntegerValue(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }
  // Функция для заполнения массива волшебников
  function getArrayWizards() {
    var array = [];
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      var randomValue = getRandomIntegerValue(0, 7);
      array.push({name: WIZARDS_NAMES[randomValue] + ' ' + WIZARDS_SURNAMES[randomValue], coatColor: WIZARDS_COATCOLORS[getRandomIntegerValue(0, 5)], eyesColor: WIZARDS_EYESCOLORS[getRandomIntegerValue(0, 4)]});
    }
    return array;
  }
  // Функция для клонирования волшебников из шаблона
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };
  // Функция заполнения волшебников из массива
  function addWizardsFromArray(wizardsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsArray.length; i++) {
      fragment.appendChild(renderWizard(wizardsArray[i]));
    }
    similarListElement.appendChild(fragment);
  }
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizards = getArrayWizards();
  addWizardsFromArray(wizards);
  document.querySelector('.setup-similar').classList.remove('hidden');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
  wizardCoat.addEventListener('click', function (evt) {
    evt.currentTarget.style.fill = WIZARDS_COATCOLORS[getRandomIntegerValue(0, WIZARDS_COATCOLORS.length - 1)];
  });
  wizardEyes.addEventListener('click', function (evt) {
    evt.currentTarget.style.fill = WIZARDS_EYESCOLORS[getRandomIntegerValue(0, WIZARDS_EYESCOLORS.length - 1)];
  });
  setupFireballWrap.addEventListener('click', function (evt) {
    evt.currentTarget.style.background = WIZARDS_FIREBALLS[getRandomIntegerValue(0, WIZARDS_FIREBALLS.length - 1)];
  });
})();
