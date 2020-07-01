import fetch from 'node-fetch';
import config from '../config';

export default class UserService {
  static signIn(email, password) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BACKEND_HOST}/session`, {
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

  static create(firstName, lastName, password, email, userType, webToken, deviceToken) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BACKEND_HOST}/users`, {
        method: 'POST',
        body: JSON.stringify({
          name: firstName,
          surname: lastName,
          email,
          password,
          type: userType,
          tokens: {
            web: webToken,
            device: deviceToken,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) reject(response);
          return response.json();
        })
        .then((data) => {
          resolve({ ...data, firstName: data.name, lastName: data.surname });
        })
        .catch(error => reject(error));
    });
  }

  static get(id, token) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BACKEND_HOST}/users/${id}`, {
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

  static getCodes(id, token) {
    return new Promise((resolve, reject) => {
      //   fetch(`${config.BACKEND_HOST}/users/${id}/code`, { // TODO: ???
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
      resolve([
        {
          level_id: 0,
          user_id: 0,
          code: "const test = () => { 'I am a test' }",
        },
        {
          level_id: 1,
          user_id: 0,
          code: "const test = () => { 'I am a test' }",
        },
        {
          level_id: 2,
          user_id: 0,
          code: "const test = () => { 'I am a test' }",
        },
      ]);
    });
  }

  static update(id, token, body) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BACKEND_HOST}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...body }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((response) => {
          if (!response.ok) reject(response);
          return response.json();
        })
        .then((data) => {
          resolve({ ...data });
        })
        .catch(error => reject(error));
    });
  }
}
