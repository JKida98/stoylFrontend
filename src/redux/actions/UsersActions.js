import { Api } from "../../api/api";
import { USERS_GET_SUCCESS, USERS_POST_SUCCESS } from "../constants";

export function getAllUsers() {
    return (dispatch) => {
        new Api().get(`users`)
            .then(
                (response) => {
                    dispatch(success(response.data));
                },
                (_) => {
                    
                }
            );
    };

    function success(list) {
        return { type: USERS_GET_SUCCESS, list };
    }
}

export function createUser(user) {
    return (dispatch) => {
        new Api().post(`users`, user)
            .then(
                (response) => {
                    dispatch(success(response.data));
                },
                (_) => {
                    
                }
            );
    };

    function success(payload) {
        return { type: USERS_POST_SUCCESS, payload };
    }
}
