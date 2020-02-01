class UserService {
  static signIn(email, password) {
    return new Promise((resolve, reject) => {
      // TODO: Implement call to backend
      resolve({ userId: 1, token: 'asd' });
    });
  }

  static create(firstName, lastName, password, email) {
    return new Promise((resolve, reject) => {
      // TODO: Implement call to backend
      resolve({
        firstName, lastName, password, email,
      });
    });
  }
}

export default UserService;
