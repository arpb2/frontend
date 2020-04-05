import fetch from 'node-fetch';

export default class ClassroomService {
  static getById(id, token) {
    return new Promise((resolve, reject) => {
      resolve({
        level: 7,
        id: 97,
      });
    //   fetch(`${process.env.BACKEND_HOST}/classrooms/${id}`, {
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

  static addStudentByEmail(email, token) {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
      });
    //   fetch(`${process.env.BACKEND_HOST}/classrooms/${id}`, {
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
}
