// @flow
import {
    LOAD_DASHBOARD,
    LOAD_DASHBOARD_SUCCESS 

} from '../../constants/actionTypes';



const INIT_STATE = {
    dashboardData: [],
    loading: false,
  
};



const show = (state = INIT_STATE, action = {  }) => {
    switch (action.type) {

        case LOAD_DASHBOARD:
            return { ...state, loading: true };

        case LOAD_DASHBOARD_SUCCESS:
            const { response : {data=[]}, response={} } = action.payload;
            return {
                ...state, dashboardData: data, data:response,   
                loading: false, error: null
            };
     
        default: return { ...state };
    }
}

export default show;