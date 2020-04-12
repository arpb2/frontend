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

var ClassroomService = /*#__PURE__*/function () {
  function ClassroomService() {
    _classCallCheck(this, ClassroomService);
  }

  _createClass(ClassroomService, null, [{
    key: "getById",
    value: function getById(id, token) {
      return new Promise(function (resolve, reject) {
        resolve({
          level: 7,
          id: 97,
          students: [{
            id: 1,
            name: 'Marcelo',
            surname: 'Gallardo',
            imageUrl: '/public/images/avatars/avatar_1.png',
            lastLevel: 7,
            points: 800
          }, {
            id: 2,
            name: 'Pity',
            surname: 'Martinez',
            imageUrl: '/public/images/avatars/avatar_2.png',
            lastLevel: 7,
            points: 677
          }, {
            id: 3,
            name: 'Lucas',
            surname: 'Pratto',
            imageUrl: '/public/images/avatars/avatar_3.png',
            lastLevel: 7,
            points: 433
          }, {
            id: 4,
            name: 'Juan Fernando',
            surname: 'Quintero',
            imageUrl: '/public/images/avatars/avatar_5.png',
            lastLevel: 7,
            points: 442
          }, {
            id: 5,
            name: 'Javier',
            surname: 'Pinola',
            imageUrl: '/public/images/avatars/avatar_6.png',
            lastLevel: 7,
            points: 532
          }]
        }); //   fetch(`${process.env.BACKEND_HOST}/classrooms/${id}`, {
        //     method: 'GET',
        //     headers: {
        //       Authorization: 'DEBUG', // token,
        //       'Content-Type': 'application/json',
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
      });
    }
  }, {
    key: "addStudentByEmail",
    value: function addStudentByEmail(email, token) {
      return new Promise(function (resolve, reject) {
        resolve({
          ok: true
        }); //   fetch(`${process.env.BACKEND_HOST}/classrooms/${id}`, {
        //     method: 'GET',
        //     headers: {
        //       Authorization: 'DEBUG', // token,
        //       'Content-Type': 'application/json',
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
      });
    }
  }]);

  return ClassroomService;
}();

exports["default"] = ClassroomService;