'use strict';
(function () {
  var INITIAL_CLOUD_X = 100;
  var INITIAL_CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var INITIAL_CLOUD_SHADOW_X = 110;
  var INITIAL_CLOUD_SHADOW_Y = 20;
  var CLOUD_SHADOW_FILLSTYLE = 'rgba(0, 0, 0, 0.7)';
  var INITIAL_MESSAGE_X = 120;
  var INITIAL_MESSAGE_Y1 = 40;
  var INITIAL_MESSAGE_Y2 = 60;
  var HISTOGRAM_HEIGHT = 150;
  var INDENT = 50;
  var BAR_WIDTH = 40;
  var INITIAL_BAR_X = 150;
  var INITIAL_BAR_BASIS_Y = 20;
  var LINE_HEIGHT_TIME = 10;
  var YOUR_BAR_FILLSTYLE = 'rgba(255, 0, 0, 1)';
  var WHITE_COLOR = '#ffffff';
  var BLACK_COLOR = '#000000';
  // функция для нахождения максимального значения в массиве
  function getMaxNumber(times) {
    var max = -1;
    for (var i = 0; i < times.length; i++) {
      var time = times[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  }
  // функция для нахождения случайного значения в заданном диапазоне (прозрачность)
  function getRandomColorOpacity(minOpacity, maxOpacity) {
    return Math.random() * (maxOpacity - minOpacity) + minOpacity;
  }
  window.renderStatistics = function (ctx, names, times) {
    // рисуем облако с сообщением    
    ctx.fillStyle = CLOUD_SHADOW_FILLSTYLE;
    ctx.fillRect(INITIAL_CLOUD_SHADOW_X, INITIAL_CLOUD_SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = WHITE_COLOR;
    ctx.fillRect(INITIAL_CLOUD_X, INITIAL_CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = BLACK_COLOR;
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', INITIAL_MESSAGE_X, INITIAL_MESSAGE_Y1);
    ctx.fillText('Список результатов:', INITIAL_MESSAGE_X, INITIAL_MESSAGE_Y2);
    // находим максимальное время и шаг временной шкалы 
    var max = getMaxNumber(times);
    var step = HISTOGRAM_HEIGHT / (max - 0);
    // рисуем гистограмму
    for (var i = 0; i < times.length; i++) {
      ctx.fillStyle = (names[i] === 'Вы') ? YOUR_BAR_FILLSTYLE : 'rgba(0, 0, 255,' + getRandomColorOpacity(0.1, 1) + ')';
      ctx.fillRect(INITIAL_BAR_X + (BAR_WIDTH + INDENT) * i, CLOUD_HEIGHT - times[i] * step - INITIAL_BAR_BASIS_Y, BAR_WIDTH, times[i] * step);
      ctx.fillStyle = BLACK_COLOR;
      ctx.fillText(Math.round(times[i]), INITIAL_BAR_X + (BAR_WIDTH + INDENT) * i, CLOUD_HEIGHT - times[i] * step - INITIAL_BAR_BASIS_Y - LINE_HEIGHT_TIME);
      ctx.fillText(names[i], INITIAL_BAR_X + (BAR_WIDTH + INDENT) * i, CLOUD_HEIGHT);
    }
  };
})();
