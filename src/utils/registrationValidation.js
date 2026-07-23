export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
}

export function validateUsername(username) {
  const trimmed = (username || '').trim();
  return /^[a-zA-Z0-9_]{3,20}$/.test(trimmed);
}

export function validatePassword(password) {
  return (password || '').length >= 5;
}

export function findDuplicateUser({ email, username }, users = []) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const normalizedUsername = (username || '').trim().toLowerCase();

  return {
    emailExists: users.some((user) => (user.email || '').trim().toLowerCase() === normalizedEmail),
    usernameExists: users.some((user) => (user.nombre || '').trim().toLowerCase() === normalizedUsername),
  };
}
