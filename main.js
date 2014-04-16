/**
 * boilerpipe sample
 */

var request     = require('request')
   ,async       = require('async')
   ,Boilerpipe  = require('boilerpipe');


(function() {
  var url = 'http://www.famitsu.com/news/201108/31049362.html';
  var boilerpipe = new Boilerpipe({extractor: Boilerpipe.Extractor.Default});

  boilerpipe.setUrl(url);

  async.series(
    [
      function(cb) {
        request(url, function(err, res, body) {
          if (err) {
          }
          boilerpipe.setHtml(body);
          cb(null, 'request ok');
        });
      },

      function(cb) {
        boilerpipe.getText(function(err, text) {
          if (!err) {
            console.log(text);
            cb(null, 'boilerpipe.getText');
          }
        });
      },

      function(cb) {
        boilerpipe.getImages(function(err, images) {
          if (!err) {
            console.log(images);
            cb(null, 'boilerpipe.getImages');
          }
        });
      }
    ],
    function(err, results) {
      console.log('Finished.');
      console.log(results);
    }
  );

})();

