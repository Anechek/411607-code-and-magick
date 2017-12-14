'use strict';
window.colorizeElement = function (element, colors, process) {
  element.addEventListener('click', function (evt) {
    process(evt.currentTarget, colors[window.utils.getRandomIntegerValue(0, colors.length - 1)]);
  });
};
