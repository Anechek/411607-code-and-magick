'use strict';
(function () {
  // Функция для получения целого случайного числа в заданном диапазоне
  window.getRandomIntegerValue = function (minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  };
  // функция для нахождения максимального значения в массиве
  window.getMaxNumber = function (times) {
    var max = -1;
    for (var i = 0; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  };
})();
