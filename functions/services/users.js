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

var UserService = /*#__PURE__*/function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, null, [{
    key: "signIn",
    value: function signIn(email, password) {
      return new Promise(function (resolve, reject) {
        (0, _nodeFetch["default"])("".concat(process.env.BACKEND_HOST, "/session"), {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password
          }),
          headers: {
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
  }, {
    key: "create",
    value: function create(firstName, lastName, password, email, userType) {
      return new Promise(function (resolve, reject) {
        (0, _nodeFetch["default"])("".concat(process.env.BACKEND_HOST, "/users"), {
          method: 'POST',
          body: JSON.stringify({
            name: firstName,
            surname: lastName,
            email: email,
            password: password,
            type: userType
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          if (!response.ok) reject(response);
          return response.json();
        }).then(function (data) {
          resolve(_objectSpread({}, data, {
            firstName: data.name,
            lastName: data.surname
          }));
        })["catch"](function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: "get",
    value: function get(id, token) {
      return new Promise(function (resolve, reject) {
        (0, _nodeFetch["default"])("".concat(process.env.BACKEND_HOST, "/users/").concat(id), {
          method: 'GET',
          headers: {
            Authorization: token
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
  }, {
    key: "getCodes",
    value: function getCodes(id, token) {
      return new Promise(function (resolve, reject) {
        //   fetch(`${process.env.BACKEND_HOST}/users/${id}/code`, { // TODO: ???
        //     method: 'GET',
        //     headers: {
        //       Authorization: token,
        //     },
        //   })
        //     .then((res) => {
        //       if (!res.ok) reject(res);
        //       return res.json();
        //     })
        //     .then((data) => {
        //       resolve(data);
        //     })
        //     .catch(error => reject(error));
        // });
        resolve([{
          level_id: 0,
          user_id: 0,
          code: "const test = () => { 'I am a test' }"
        }, {
          level_id: 1,
          user_id: 0,
          code: "const test = () => { 'I am a test' }"
        }, {
          level_id: 2,
          user_id: 0,
          code: "const test = () => { 'I am a test' }"
        }]);
      });
    }
  }, {
    key: "update",
    value: function update(id, token, body) {
      return new Promise(function (resolve, reject) {
        (0, _nodeFetch["default"])("".concat(process.env.BACKEND_HOST, "/users/").concat(id), {
          method: 'PUT',
          body: JSON.stringify(_objectSpread({}, body)),
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }).then(function (response) {
          if (!response.ok) reject(response);
          return response.json();
        }).then(function (data) {
          console.log(data);
          resolve(_objectSpread({}, data));
        })["catch"](function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return UserService;
}();

exports["default"] = UserService;