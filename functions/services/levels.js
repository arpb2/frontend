"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LevelsService = /*#__PURE__*/function () {
  function LevelsService() {
    _classCallCheck(this, LevelsService);
  }

  _createClass(LevelsService, null, [{
    key: "getAll",
    value: function getAll() {
      return new Promise(function (resolve, reject) {
        (0, _nodeFetch["default"])("".concat(process.env.BACKEND_HOST, "/levels"), {
          method: 'GET'
        }).then(function (res) {
          // TODO: Delete this then when back is up and uncomment the following lines
          resolve(JSON.parse("\n            [{\n                \"name\": \"nivel 1\",\n                \"description\": \"desc\",\n                \"objective\": {\n                    \"title\": \"your objective\",\n                    \"value\": [\"USE_IF\", \"USE_BAG\", \"asdasd\"]\n                }\n            }]"));
        }) // .then((res) => {
        //   if (!res.ok) reject(res.statusText);
        //   return res.json();
        // })
        // .then((data) => {
        //   resolve(data);
        // })
        ["catch"](function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: "get",
    value: function get(id) {
      return new Promise(function (resolve, reject) {
        (0, _nodeFetch["default"])("".concat(process.env.BACKEND_HOST, "/levels/").concat(id), {
          method: 'GET'
        }).then(function (res) {
          if (!res.ok) reject(res);
          return res.json();
        }).then(function (data) {
          resolve(_objectSpread({}, data, {
            objective: {
              title: data.description
            }
          }));
        })["catch"](function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return LevelsService;
}();

exports["default"] = LevelsService;