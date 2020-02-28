import fetch from 'node-fetch';

export default class LevelsService {
  static getAll() {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.BACKEND_HOST}/levels`, {
        method: 'GET',
      })
        .then((res) => {
          // TODO: Delete this then when back is up and uncomment the following lines
          resolve(JSON.parse(`
            [{
                "name": "nivel 1",
                "description": "desc",
                "objective": {
                    "title": "your objective",
                    "value": ["USE_IF", "USE_BAG", "asdasd"]
                }
            }]`));
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

  static get(id) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.BACKEND_HOST}/levels/${id}`, {
        method: 'GET',
      })
        // .then((res) => {
        //   // TODO: Delete this then when back is up and uncomment the following lines
        //   resolve(JSON.parse(`
        //     {
        //         "name": "nivel 1",
        //         "description": "desc",
        //         "objective": {
        //             "title": "your objective",
        //             "value": ["USE_IF", "USE_BAG", "asdasd"]
        //         }
        //     }`));
        // })
        .then((res) => {
          if (!res.ok) reject(res);
          return res.json();
        })
        .then((data) => {
          resolve({ ...data, objective: { title: data.description } });
        })
        .catch(error => reject(error));
    });
  }
}
