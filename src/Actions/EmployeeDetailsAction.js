import { EMPLOYEE_DETAILS_ACTION_TYPE } from './ActionTypes';
import axios from "axios/index";
import { GET_EMPLOYEE_DETAILS_URL } from "../Constants/Constants";

 const LoadData = () => {
    return dispatch => {


        return axios.get(GET_EMPLOYEE_DETAILS_URL)

            .then( response => {
                console.log("the actions employee response is", response);
                return dispatch({ type: EMPLOYEE_DETAILS_ACTION_TYPE, data: response })
            })

            .catch( error => {

            })
    }


}

export default  LoadData;