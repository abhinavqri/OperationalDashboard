
import {
    EMPLOYEE_DETAILS_ACTION_TYPE, EMPLOYEE_STATUS_DETAILS_ACTION_TYPE, EMPLOYEE_LATEST_DATE_ACTION_TYPE
} from '../Actions/ActionTypes';


var initialState = { data : [], employeeStatus:[], date : {} };
 const EmployeeDetailsReducer = (state= initialState, action) => {

     console.log("the reducersss are",action);
    switch(action.type){

        case EMPLOYEE_DETAILS_ACTION_TYPE :{
            console.log("the data is",action.data);
            return {...state , data:action.data.data};

        }

        case EMPLOYEE_STATUS_DETAILS_ACTION_TYPE :{
            return {...state , employeeStatus:action.data.data};
        }

        case EMPLOYEE_LATEST_DATE_ACTION_TYPE :{
            console.log("the actions are ",action);
            return {...state , date:action.data.updatedDate};
        }

        default : {
            return state;
        }
    }
}

export default EmployeeDetailsReducer;
