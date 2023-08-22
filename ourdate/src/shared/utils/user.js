export const getCurrentUser = () => {
    const storedUserInfo = localStorage.getItem('user');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  };
  