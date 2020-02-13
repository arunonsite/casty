import jwtDecode from 'jwt-decode';
import { Cookies } from "react-cookie";

/**
 * Checks if user is authenticated
 */
const processSuccessResponse = (response) => {
    return {response :response, status:true, message:'Success' }
    
}

/**
 * Fetch data from given url
 * @param {*} url 
 * @param {*} options 
 */
const fetchJSON = (url, options = {}) => {
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => { throw error });
}




export { processSuccessResponse,fetchJSON };