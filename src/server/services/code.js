export default class CodeService {
  static save(code, workspace, userId) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.BACKEND_HOST}/users/${userId}/code`, {
        method: 'POST',
        body: JSON.stringify({
          code,
          workspace,
        }),
      })
        .then((res) => {
          // TODO: Delete this then when back is up and uncomment the following lines
          resolve({
            code,
            code_id: 1987,
            userId,
          });
        })
      // .then((res) => {
      //   if (!res.ok) reject(res.statusText);
      //   return res.json();
      // })
      // .then((data) => {
      //   resolve(data);
      // })
        .catch(error => reject(error));
    });
  }
}
