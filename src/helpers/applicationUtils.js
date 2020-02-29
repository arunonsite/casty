import jwtDecode from 'jwt-decode';
import { Cookies } from "react-cookie";
import { toast } from 'react-toastify';
import base64Img from "base64-img";
const imageToBase64 = require('image-to-base64');
/**
 * Checks if user is authenticated
 */
const processSuccessResponse = (response, mustRet) => {
    return {response :response, status:true, message:'Success' }
}

/**
 * Checks if user is authenticated
 */
const processPutSuccessResponse = (response, mustRet, indc='') => {
    if(response[mustRet] !== undefined){
        return {response :response, status:true, message:'Success' }
    }else{
        return {response :response, 
        status:false, message:response[indc][0] ? response[indc][0] : 'Unable to Process your request.' }
    }
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

/**
 * Checks if user is authenticated
 */
const notifyMe = (notifyM) => {
     const {notify = false,status=0, message='Success'} = notifyM;

    if(notify){
        if(status === 0){
          toast.success(message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
             
            }); 
        }else if(status === 1){  //Error
          toast.warn(message, {
            zIndex: 9999,
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
             
            });
        }
  
      }
}


/**
 * Fetch data from given url
 * @param {*} url 
 * @param {*} options 
 */
const getBese64Image = (url, options = {}) => {
  
  //  base64Img.base64Sync(url);
  //http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png

    return imageToBase64(url)
    .then(response=>response)
    .catch(
        (error) => {
            console.log(error); //Exepection error....
        }
    )
}



export { processSuccessResponse,fetchJSON, processPutSuccessResponse, notifyMe , getBese64Image};