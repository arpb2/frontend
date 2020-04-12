import fetch from 'node-fetch';

export default class ClassroomService {
  static getById(id, token) {
    return new Promise((resolve, reject) => {
      resolve({
        level: 7,
        id: 97,
        students: [
          {
            id: 1,
            name: 'Marcelo',
            surname: 'Gallardo',
            imageUrl: '/public/images/avatars/avatar_1.png',
            lastLevel: 7,
            points: 800,
          },
          {
            id: 2,
            name: 'Pity',
            surname: 'Martinez',
            imageUrl: '/public/images/avatars/avatar_2.png',
            lastLevel: 7,
            points: 677,
          },
          {
            id: 3,
            name: 'Lucas',
            surname: 'Pratto',
            imageUrl: '/public/images/avatars/avatar_3.png',
            lastLevel: 7,
            points: 433,
          },
          {
            id: 4,
            name: 'Juan Fernando',
            surname: 'Quintero',
            imageUrl: '/public/images/avatars/avatar_5.png',
            lastLevel: 7,
            points: 442,
          },
          {
            id: 5,
            name: 'Javier',
            surname: 'Pinola',
            imageUrl: '/public/images/avatars/avatar_6.png',
            lastLevel: 7,
            points: 532,
          },
        ],
      });
    //   fetch(`${config.BACKEND_HOST}/classrooms/${id}`, {
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
    //   fetch(`${config.BACKEND_HOST}/classrooms/${id}`, {
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
