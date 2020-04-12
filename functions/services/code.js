"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CodeService = /*#__PURE__*/function () {
  function CodeService() {
    _classCallCheck(this, CodeService);
  }

  _createClass(CodeService, null, [{
    key: "save",
    value: function save(code, workspace, userId, levelId, token) {
      var body = JSON.stringify({
        code: code,
        workspace: workspace,
        level_id: levelId,
        user_id: userId
      });
      return new Promise(function (resolve, reject) {
        (0, _nodeFetch["default"])("".concat(process.env.BACKEND_HOST, "/users/").concat(userId, "/levels/").concat(levelId), {
          method: 'PUT',
          body: body,
          headers: {
            Authorization: 'DEBUG',
            // token,
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          if (!res.ok) reject(res);
          return res.json();
        }).then(function (data) {
          resolve(data);
        })["catch"](function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return CodeService;
}();

exports["default"] = CodeService;