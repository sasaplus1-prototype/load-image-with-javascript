(function(){

  'use strict';

  var loadButton = document.getElementById('js-load-button'),
      image1 = document.getElementById('js-image-1'),
      image2 = document.getElementById('js-image-2');

  function load(src) {
    return new Promise(function(resolve, reject) {
      var image = new Image();

      image.onabort = reject;
      image.onerror = reject;

      image.onload = function() {
        console.log('loaded: %s', src);

        resolve(image) || (image = null);
      };
      image.src = src;

      if (image.naturalWidth) {
        console.log('load from cache: %s', src);

        resolve(image) || (image = null);
      }
    });
  }

  loadButton.addEventListener('click', function() {
    image1.src = '';
    image2.src = '';

    load('image.jpg?_=' + (+new Date)).then(function(image) {
      console.log('set image1: %s', image.src);

      image1.src = image.src;
    });
    load('image.jpg').then(function(image) {
      console.log('set image2: %s', image.src);

      image2.src = image.src;
    });
  }, false);

}());
