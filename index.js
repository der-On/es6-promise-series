"use strict";

module.exports = function(Promise) {
  Promise.series = function (promises, concurrent) {
    var results = null;
    promises = promises.slice();
    concurrent = concurrent || 1;

    return new Promise(function (resolve, reject) {
      function next(result) {
        console.log('next', promises.length, (new Date()).getTime());
        var concurrentPromises = [];
        var promise;

        if (!results) {
          results = [];
        } else {
          results = results.concat(result);
        }

        if (promises.length) {
          while (concurrentPromises.length < concurrent && promises.length) {
            var promise = promises.shift();

            if (typeof promise === 'function') {
              promise = promise();
            }

            if (!promise || typeof promise.then !== 'function') {
              promise = Promise.resolve();
            }

            concurrentPromises.push(promise);
          }

          Promise.all(concurrentPromises)
            .then(next)
            .catch(reject);
        } else {
          resolve(results);
        }
      }

      next();
    });
  };
};
