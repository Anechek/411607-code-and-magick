'use strict';
(function () {

  var dialogHandle = window.setupevents.setup.querySelector('.setup-user-pic');

  dialogHandle.style.zIndex = 1000;

  // Функция обработки события начала перетаскивания диалога mousedown

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Функция обработки события передвижения мыши 
    // обновляет смещение относительно первоначальной точки

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setupevents.setup.style.top = (window.setupevents.setup.offsetTop - shift.y) + 'px';
      window.setupevents.setup.style.left = (window.setupevents.setup.offsetLeft - shift.x) + 'px';
    };

    // Функция обработки события при отпускании кнопки мыши

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
