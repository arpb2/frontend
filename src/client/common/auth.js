export const isTeacher = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('session'));
  return loggedInUser.type === 'teacher';
};

export const isStudent = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('session'));
  return loggedInUser.type === 'student';
};

export const logout = () => {
  localStorage.removeItem('session');
};

export const isLoggedIn = () => !!localStorage.getItem('session');
