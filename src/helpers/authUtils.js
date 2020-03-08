import jwtDecode from 'jwt-decode';
import { Cookies } from "react-cookie";

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    }
    else {
        return true;
    }
}

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies(); 
    const user = cookies.get("user");
    return user ? (typeof(user) == 'object'? user: JSON.parse(user)) : null;
}


/**
 * Fetch data from given url
 * @param {*} url 
 * @param {*} options 
 */
const findTheAccess = (roles) => {
    const superUsr = 'SuperAdmin';
    const adminUsr = 'admin';
    const constriUsr = 'constributer';
    
        if (roles && roles.indexOf(superUsr) !== -1) {
            return 0;                      
        } else if (roles && roles.indexOf(adminUsr) !== -1) {
            return 1;         
        } else if (roles && roles.indexOf(constriUsr) !== -1) {
            return -1;         
        }
        return 1; 
    
  }

export { isUserAuthenticated, getLoggedInUser, findTheAccess};