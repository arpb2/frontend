import fetch from 'node-fetch';
import config from '../config';

export default class CodeService {
  static save(code, workspace, userId, levelId, token) {
    const body = JSON.stringify({
      code,
      workspace,
      level_id: levelId,
      user_id: userId,
    });
    return new Promise((resolve, reject) => {
      fetch(`${config.BACKEND_HOST}/users/${userId}/levels/${levelId}`, {
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
        .then((data) => {
          resolve(data);
        })
        .catch(error => reject(error));
    });
  }
}
