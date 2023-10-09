export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.authentication_token) {
      return { Authorization: 'Bearer ' + user.authentication_token };
    } else {
      return {};
    }
}