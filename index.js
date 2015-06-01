"use strict";

module.exports = function(Promise)
{
  Promise.series = function(promises) {
    var promises = promises.slice();
    var results = [];
    var first = true;

    return new Promise(function(resolve, reject) {
      function next(result)
      {
        if (!first) {
          results.push(result);
        }
        else {
          first = false;
        }

        if (promises.length) {
          var promise = promises.shift();

          if (!promise || typeof promise.then !== 'function') {
            promise = Promise.resolve();
          }

          promise
          .then(next)
          .catch(reject);
        }
        else {
          resolve(results);
        }
      }

      next();
    });
  }
};
