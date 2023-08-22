const ROOT = 'https://api.gurufox.ai';

const API = {
  DATEPLANINFO: `${ROOT}/dateplaninfo/`,
  DATEPLAN: `${ROOT}/dateplan/`,

  LOGIN: `${ROOT}/auth/login/`,
  REGISTER: `${ROOT}/auth/users/`,
  REFRESH: `${ROOT}/auth/jwt/refresh/`,
  CREATE: `${ROOT}/auth/jwt/create/`,
  USERS: `${ROOT}/auth/users/me`,

  PASSWORD_RESET: `${ROOT}/auth/users/reset_password/`,
  PASSWORD_RESET_CONFIRM_URL: `${ROOT}/auth/users/reset_password_confirm/`,
};

export default API;
