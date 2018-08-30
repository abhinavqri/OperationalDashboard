import { EMPLOYEE_LATEST_DATE_ACTION_TYPE } from './ActionTypes';
import axios from "axios/index";
import { GET_LATEST_DATE_URL} from "../Constants/Constants";

const LoadDate = () => {
    return dispatch => {

        return axios.get(GET_LATEST_DATE_URL)

            .then( response => {
                console.log("the actions employee response is", response);
                return dispatch({ type: EMPLOYEE_LATEST_DATE_ACTION_TYPE, data: response })
            })

            .catch( error => {

            })
    }


}

export default  LoadDate;