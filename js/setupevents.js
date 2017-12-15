'use strict';
window.setupevents = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var openPopup = function () {
    setup.style.top = initialCoords.y;
    setup.style.left = initialCoords.x;
    setup.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        var targetElement = evt.target;
        if (targetElement.className !== 'setup-user-name') {
          closePopup();
        }
      }
    });
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    if (window.node) {
      window.node.remove();
    }
  };

  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var initialCoords = {
    x: setup.style.left,
    y: setup.style.top
  };
  var setupClose = setup.querySelector('.setup-close');

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  return {
    setup: setup
  };
})();
