'use strict';
(function () {
  var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARDS_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  // Функция для заполнения массива волшебников

  function getArrayWizards() {
    var array = [];
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      var randomValue = window.utils.getRandomIntegerValue(0, 7);
      array.push({name: WIZARDS_NAMES[randomValue] + ' ' + WIZARDS_SURNAMES[randomValue], coatColor: WIZARDS_COATCOLORS[window.utils.getRandomIntegerValue(0, 5)], eyesColor: WIZARDS_EYESCOLORS[window.utils.getRandomIntegerValue(0, 4)]});
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

  // Функция для добавления красных рамок.

  var setRedOutline = function () {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.outline = '2px dashed red';
    }
  };

  // Функция для удалния красных рамок. Она же используется для обработки события отпускания звездочки не в ячейку 

  var removeRedOutline = function () {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.outline = '';
    }
  };

  // Функция подстветки области принимающей перетаскивание при dragstarte 

  var onCellsDragstart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      setRedOutline();
    }
  };

  // Функция для обработки события падения звездочки в ячеку

  var onCellsDrop = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
    removeRedOutline();
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizards = getArrayWizards();
  addWizardsFromArray(wizards);
  document.querySelector('.setup-similar').classList.remove('hidden');
  var setupWizard = document.querySelector('.setup-wizard');

  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(wizardCoat, WIZARDS_COATCOLORS, fillElement);
  window.colorizeElement(wizardEyes, WIZARDS_EYESCOLORS, fillElement);
  window.colorizeElement(setupFireballWrap, WIZARDS_FIREBALLS, changeElementBackground);

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  var artifactsElement = document.querySelector('.setup-artifacts');
  var cells = artifactsElement.querySelectorAll('.setup-artifacts-cell');

  // Обработчик события начала перетаскивания элемента

  shopElement.addEventListener('dragstart', onCellsDragstart);
  artifactsElement.addEventListener('dragstart', onCellsDragstart);

  // Перемещаемый элемент оказывается над зоной, принимающей перетаскиваемые элементы

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  // Обработка события при "падении" элемента перетаскивания

  artifactsElement.addEventListener('drop', onCellsDrop);

  // Срабатывает, когда перемещаемый элемент находится над объектом на который он может быть перенесен

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  // Србатывает в момент перетаскивания, когда курсор мыши выходит за пределы элемента 

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  // Обработка события при окончании перетаскивания

  document.addEventListener('dragend', removeRedOutline);

})();
