import jwt_decode from 'jwt-decode';


export const decodeAuthToken = (token) => {
  if (!token) {
    return {};
  }
  const { user_id, exp, iat, jti } = jwt_decode(token) || {};
  return { userId: user_id, expiration: exp, issuedAt: iat, jwtId: jti };
};

export const isValidToken = (token) => {
  const decodedToken = decodeAuthToken(token);
  if (Date.now() >= decodedToken.exp * 1000) {
    return false;
  }
  return true;
};

export const hasValidToken = () => {
  const token = localStorage.getItem('token');
  return isValidToken(token);
};

export const getValidToken = async (updateToken) => {
  if (!hasValidToken()) {
    const token = await updateToken();
    return token;
  }
  return localStorage.getItem('token');
};