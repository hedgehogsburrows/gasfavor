/**
 * @typedef {object} Lib
 * @property {object} publicFunc - Ну, это прям ваще
 * @property {number} publicVar - Свойство
 */

/**
 * @typedef {object} MyTool
 * @property {Lib} lib - Ну, это понятно проперти
 */

/** @type {MyTool} */
var MyApp = {
  lib: {}
};

(function(ns) {
  ns.publicVar = 1;
  ns.publicFunc = function publicFunc() {
    return privateFunc();
  };
  var privateVar = 2;
  function privateFunc() {
    return privateVar;
  }
})(MyApp.lib);

MyApp.lib.publicFunc();
MyApp.lib.