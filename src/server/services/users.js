class UserService {
  static signIn(email, password) {
    return new Promise((resolve, reject) => {
      resolve({ user_id: 1, token: 'asd' });
    });
  }
}

export default UserService;
