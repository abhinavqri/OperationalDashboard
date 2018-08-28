
import {
    EMPLOYEE_DETAILS_ACTION_TYPE, EMPLOYEE_STATUS_DETAILS_ACTION_TYPE
} from '../Actions/ActionTypes';


var initialState = { data : [], employeeStatus:[] };
 const EmployeeDetailsReducer = (state= initialState, action) => {
    switch(action.type){

        case EMPLOYEE_DETAILS_ACTION_TYPE :{
            return {...state , data:action.data.data};
            console.log("the data is",action.data);
        }

        case EMPLOYEE_STATUS_DETAILS_ACTION_TYPE :{
            return {...state , employeeStatus:action.data.data};
        }

        default : {
            return state;
        }
    }
}

export default EmployeeDetailsReducer;
