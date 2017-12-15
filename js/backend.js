'use strict';

window.backend = (function () {

  var LOAD_URL = 'https://1510.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://1510.dump.academy/code-and-magick';

  // Функция загрузки с сервера

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText, true);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', true);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', true);
    });

    xhr.timeout = 10000;
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  // Функция сохранения на сервер

  var save = function (data, onSave, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSave(xhr.response);
      } else {
        onError('Ошибка при отправке: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  return {
    load: load,
    save: save
  };
})();

