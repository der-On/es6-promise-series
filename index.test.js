'use strict';

var expect = require('expect.js');
require('./index')(Promise);

function pTimeout(result, cb) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(result);
      if (cb) cb();
    }, 500);
  });
}

function logTime() {
  console.log((new Date()).getTime());
}


describe('Promise.series', function () {
  this.timeout(5000);

  it('pTimeout() should work', function () {
    return pTimeout(logTime)
      .then(function () {
        return pTimeout(1, logTime);
      })
      .then(function () {
        return pTimeout(2, logTime);
      })
      .then(function () {
        return pTimeout(3, logTime);
      });
  });

  it('Should run promises in series', function (done) {
    var n = 0;
    function count() {
      n++;
      logTime();
    }

    var p = Promise.series([
      pTimeout(1, count),
      pTimeout.bind(null, 2, count),
      pTimeout.bind(null, 3, count)
    ])
    .then(function (results) {
      expect(n).to.be(3);
      expect(results).to.eql([1, 2, 3]);
      done();
    })
    .catch(done);

    expect(p).to.be.a(Promise);
  });

  it('Should run promises in concurrency', function (done) {
    var n = 0;

    function count() {
      n++;
      logTime();
    }

    var p = Promise.series([
      pTimeout(1, count),
      pTimeout.bind(null, 2, count),
      pTimeout.bind(null, 3, count),
      pTimeout.bind(null, 4, count),
      pTimeout.bind(null, 5, count)
    ], 2)
    .then(function (results) {
      expect(n).to.be(5);
      expect(results).to.eql([1, 2, 3, 4, 5]);
      done();
    })
    .catch(done);

    expect(p).to.be.a(Promise);
  });
});
