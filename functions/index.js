"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var functions = _interopRequireWildcard(require("firebase-functions"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
require('dotenv').config();

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"]('dist'));
app.use('/api/users', require('./users')["default"]);
app.use('/api/code', require('./code')["default"]);
app.use('/api/levels', require('./levels')["default"]);
app.use('/api/classrooms', require('./classrooms')["default"]);
app.get('/api/blockly/initial', function (req, res) {
  return res.send(_fs["default"].readFileSync("".concat(__dirname, "/assets/initial_toolbox.xml")));
});
app.get('/api/ping', function (req, res) {
  return res.json({
    ok: true
  });
});
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    next(err);
  } // eslint-disable-next-line no-console


  console.error(err);
  res.status(err.statusCode ? err.statusCode : 500).json({
    error: err.message
  });
});

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  app.listen(process.env.PORT || 8080, function () {
    return console.log("Listening on port ".concat(process.env.PORT || 8080, "!"));
  });
}

exports.app = functions.https.onRequest(app);