import fetch from 'node-fetch';

export default class UserService {
  static signIn(email, password) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.BACKEND_HOST}/session`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
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

  static create(firstName, lastName, password, email) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.BACKEND_HOST}/users`, {
        method: 'POST',
        body: JSON.stringify({
          name: firstName,
          surname: lastName,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) reject(response);
          return response.json();
        })
        .then(data => resolve({ ...data, firstName: data.name, lastName: data.surname }))
        .catch(error => reject(error));
    });
  }

  static get(id, token) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.BACKEND_HOST}/users/${id}`, {
        method: 'GET',
        headers: {
          Authorization: token,
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
