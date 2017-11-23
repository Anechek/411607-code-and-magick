'use strict';
window.renderStatistics = function (ctx, names, times) {      
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = '#ffffff';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  } 
  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);
  var indent = 50;
  var barWidth = 40;
  var initialX = 150;
  var initialY = 20;    
  var lineHeightTime = 10;	
  var cloudHeight = 270;  
  ctx.fillStyle = 'rgba(0, 0, 255, 1)';
  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(initialX + (barWidth + indent) * i, cloudHeight - times[i] * step - initialY, barWidth, times[i] * step);
    } else {
      ctx.fillStyle = 'blue';
      ctx.globalAlpha = Math.random();
      if (ctx.globalAlpha === 0) {
        ctx.globalAlpha = ctx.globalAlpha + 0.1;
      } 
      ctx.fillRect(initialX + (barWidth + indent) * i, cloudHeight - times[i] * step - initialY, barWidth, times[i] * step);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), initialX + (barWidth + indent) * i, cloudHeight - times[i] * step - initialY - lineHeightTime);
    ctx.fillText(names[i], initialX + (barWidth + indent) * i, cloudHeight);
  } 
};
