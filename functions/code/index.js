"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _code = _interopRequireDefault(require("../services/code"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', function (req, res, next) {
  _code["default"].save(req.body.code, req.body.workspace, req.body.userId, req.body.levelId, req.header('Authorization')).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
var _default = router;
exports["default"] = _default;