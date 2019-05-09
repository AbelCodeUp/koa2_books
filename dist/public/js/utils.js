"use strict";

function book() {}

;
book._version = '1.0.0';

book.throttle = function (fn, wait) {
  var timer;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => timer = null, wait);
      return fn.apply(this, args);
    }
  };
};