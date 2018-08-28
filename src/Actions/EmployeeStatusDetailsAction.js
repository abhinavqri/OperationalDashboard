import { EMPLOYEE_STATUS_DETAILS_ACTION_TYPE } from './ActionTypes';
import axios from "axios/index";
import { GET_EMPLOYEE_STATUS_DETAILS_URL } from "../Constants/Constants";

const LoadStatusData = () => {
    console.log("the first line of load data");
    return dispatch => {


        return axios.get(GET_EMPLOYEE_STATUS_DETAILS_URL)

            .then( response => {
                console.log("the actions status response is", response);
                return dispatch({ type: EMPLOYEE_STATUS_DETAILS_ACTION_TYPE, data: response })
            })

            .catch( error => {
                console.log("the employee status details are not loading")
            })

    }


}

export default  LoadStatusData;