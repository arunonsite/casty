import jwtDecode from 'jwt-decode';
import { Cookies } from "react-cookie";

/**
 * Checks if user is authenticated
 */
const processSuccessResponse = (response) => {
    return {response :response, status:true, message:'Success' }
    
}



export { processSuccessResponse };