import fetch from 'node-fetch';

export default class CodeService {
  static save(code, workspace, userId, levelId, token) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.BACKEND_HOST}/users/${userId}/levels/${levelId}`, {
        method: 'PUT',
        body: JSON.stringify({
          code,
          workspace,
        }),
        headers: {
          Authentication: token,
          'Content-Type': 'application/json',
        },
      })
        // .then((res) => {
        //   // TODO: Delete this then when back is up and uncomment the following lines
        //   resolve({
        //     code,
        //     code_id: 1987,
        //     userId,
        //   });
        // })
        .then((res) => {
          if (!res.ok) reject(res.statusText);
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch(error => reject(error));
    });
  }
}
