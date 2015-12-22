[![Build Status](https://travis-ci.org/der-On/es6-promise-series.svg)](https://travis-ci.org/der-On/es6-promise-series)

# ES6 Promise.series

Execute promises in series

Usage

```javascript
/**
 * Runs promises in series
 * @param  {Array} list of promises or functions returning promises
 * @param  {Number} (optional) number of concurrent promises, of omitted no concurrency will happen
 * @return {Promise}
 */
import series from 'series'

series([
 aPromise,
 anotherPromise
], 4)
  .then(function (results) {
    ...
  });
```

Old usage

```javascript
/**
 * Runs promises in series
 * @param  {Array} list of promises or functions returning promises
 * @param  {Number} (optional) number of concurrent promises, of omitted no concurrency will happen
 * @return {Promise}
 */
Promise.series([
 aPromise,
 anotherPromise
], 4)
  .then(function (results) {
    ...
  });
```

