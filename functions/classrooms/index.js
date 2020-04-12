"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _classrooms = _interopRequireDefault(require("../services/classrooms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/:id', function (req, res, next) {
  _classrooms["default"].getById(req.params.id, req.header('Authorization')).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
router.post('/:id/students', function (req, res, next) {
  _classrooms["default"].addStudentByEmail(req.body.email, req.header('Authorization')).then(function (payload) {
    return res.json(payload);
  })["catch"](function (err) {
    return next(err);
  });
});
var _default = router;
exports["default"] = _default;