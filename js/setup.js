'use strict';
(function () {
  var WIZARDS_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARDS_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  // Функция для клонирования волшебников из шаблона

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

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

  // Функция для изменения цвета плаща или глаз
  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  // Функция для изменения цвета фаерболла

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  // Для формы определим обработчик событий по нажатию кнопки Сохранить

  // При успешной отправке

  var onSuccessSubmit = function () {
    window.setupevents.setup.classList.add('hidden');
  };

  // При возникновении ошибки во время отправке

  var onErrorLoadSave = function (errorMessage, loadError) {
    window.node = document.createElement('div');
    window.node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    window.node.style.position = 'absolute';
    window.node.style.left = 0;
    window.node.style.right = 0;
    window.node.style.fontSize = '30px';
    window.node.textContent = errorMessage;
    if (loadError) {
      document.body.insertAdjacentElement('afterbegin', window.node);
    } else {
      window.node.style.width = '80%';
      window.setupevents.setup.insertAdjacentElement('afterbegin', window.node);
    }
  };

  // Функция для обработчика нажатия кнопки Сохранить

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), onSuccessSubmit, onErrorLoadSave);
    evt.preventDefault();
    if (window.node) {
      window.node.remove();
    }
  };

  // Функция заполнения волшебников с сервера

  function addWizardsFromServer() {

    window.backend.load(function (wizards) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < WIZARDS_COUNT; i++) {
        fragment.appendChild(renderWizard(wizards[i]));
      }
      similarListElement.appendChild(fragment);
    }, onErrorLoadSave);
  }


  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  addWizardsFromServer();
  document.querySelector('.setup-similar').classList.remove('hidden');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');

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

  // Обработчик для кнопки Соханить

  var form = window.setupevents.setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', onFormSubmit);
})();
