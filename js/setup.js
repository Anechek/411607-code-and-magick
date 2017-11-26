'use strict';
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;
// Функция для получения целого случайного числа в заданном диапазоне
function getRandomIntegerValue(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}
// Функция для заполнения массива волшебников
function getArrayWizards(wizards) {
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    var randomValue = getRandomIntegerValue(0, 7);
    wizards.push({name: WIZARDS_NAMES[randomValue] + ' ' + WIZARDS_SURNAMES[randomValue], coatColor: WIZARDS_COATCOLORS[getRandomIntegerValue(0, 5)], eyesColor: WIZARDS_EYESCOLORS[getRandomIntegerValue(0, 4)]});
  }
}
// Функция для клонирования волшебников из шаблона
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizards = [];
getArrayWizards(wizards);
// Функция заполнения волшебников из массива
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
