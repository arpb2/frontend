"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _levels = _interopRequireDefault(require("../services/levels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function (req, res, next) {
  _levels["default"].getAll().then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
router.get('/:id', function (req, res, next) {
  _levels["default"].get(req.params.id).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
var _default = router;
exports["default"] = _default;