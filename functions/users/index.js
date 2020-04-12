"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../services/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signin', function (req, res, next) {
  _users["default"].signIn(req.body.email, req.body.password).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
router.post('/', function (req, res, next) {
  _users["default"].create(req.body.firstName, req.body.lastName, req.body.password, req.body.email, req.body.userType).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
router.get('/:id/code', function (req, res, next) {
  _users["default"].getCodes(req.params.id, req.headers.authorization).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
router.get('/:id', function (req, res, next) {
  _users["default"].get(req.params.id, req.headers.authorization).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
router.put('/:id', function (req, res, next) {
  _users["default"].update(req.params.id, req.headers.authorization, req.body).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
var _default = router;
exports["default"] = _default;