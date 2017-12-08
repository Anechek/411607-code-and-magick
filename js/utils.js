'use strict';
window.utils = (function () {
  return {
    // Функция для получения целого случайного числа в заданном диапазоне
    getRandomIntegerValue: function (minValue, maxValue) {
      return Math.round(Math.random() * (maxValue - minValue) + minValue);
    },
    // функция для нахождения максимального значения в массиве
    getMaxNumber: function (times) {
      var max = -1;
      for (var i = 0; i < times.length; i++) {
        var time = times[i];
        if (time > max) {
          max = time;
        }
      }
      return max;
    },
    // функция для нахождения случайного значения в заданном диапазоне (прозрачность)
    getRandomColorOpacity: function (minOpacity, maxOpacity) {
      return Math.random() * (maxOpacity - minOpacity) + minOpacity;
    }
  };
})();
