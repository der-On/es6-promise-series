"use strict";

function promiseSupported(Promise){
	return typeof Promise !== "undefined";
}

module.exports = function(_Promise) {
	_Promise = _Promise || Promise;

	if (!promiseSupported((_Promise))) {
		throw new Error('Promise not supported');
	}

	if (_Promise && typeof _Promise.all === "function" && typeof _Promise.race === "function"){
		 return arguments[0].series = series;
	} else {
		return series.apply(this, arguments);
	}
};


function series (promises, concurrent) {
    var results = null;
    promises = promises.slice();
    concurrent = concurrent || 1;

    return new Promise(function (resolve, reject) {
      function next(result) {
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
  }
