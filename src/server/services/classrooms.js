import fetch from 'node-fetch';
import config from '../config';

export default class ClassroomService {
  static getById(id, token) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BACKEND_HOST}/classrooms/${id}`, {
        method: 'GET',
        headers: {
          Authorization: 'DEBUG', // token,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) reject(res);
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch(error => reject(error));
    });
  }

  static updateClassroom(id, data, token) {
    const body = JSON.stringify({ ...data });
    return new Promise((resolve, reject) => {
      fetch(`${config.BACKEND_HOST}/classrooms/${id}`, {
        method: 'PUT',
        body,
        headers: {
          Authorization: 'DEBUG', // token,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) reject(res);
          return res.json();
        })
        .then((response) => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }

  static addStudentByEmail(id, email, token) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BACKEND_HOST}/classrooms/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ students: [{ email }] }),
        headers: {
          Authorization: 'DEBUG', // token,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) reject(res);
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch(error => reject(error));
    });
  }
}
