import Cookies from 'universal-cookie';
const cookies = new Cookies();
const daysToExpire = new Date(2147483647 * 1000);
export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (cookies.get('secret')) {
    return cookies.get('secret');
  } else {
    return false;
  }
};


export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    cookies.set('secret', data, { path: '/' ,expires : daysToExpire});
    next();
  }
};



export const signout = (data, next) => {
  if (typeof window !== 'undefined') {
    cookies.remove(data, { path: '/' });
    next();
  }
};


