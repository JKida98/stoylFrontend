import { Api } from "../../api/api";
import { TABLES_GET_SUCCESS, TABLE_ASSIGN_SUCCESS, TABLES_POST_SUCCESS } from "../constants";

export function getAllTables() {
    return (dispatch) => {
        new Api().get(`tables`)
            .then(
                (response) => {
                    dispatch(success(response.data));
                },
                (_) => {
                }
            );
    };

    function success(list) {
        return { type: TABLES_GET_SUCCESS, list };
    }
}

export function removePersonFromTable(tableId, userId) {
    return (dispatch) => {
        new Api().put(`tables/${tableId}/${userId}`)
            .then(
                (response) => {
                    dispatch(success(response.data));
                },
                (_) => {
                }
            );
    };

    function success(updatedTable) {
        return { type: TABLE_ASSIGN_SUCCESS, updatedTable };
    }
}

export function assignPerson(tableId, user) {
    console.log(tableId, user);
    return (dispatch) => {
        new Api().put(`tables/${tableId}`, [user])
            .then(
                (response) => {
                    dispatch(success(response.data));
                },
                (_) => {
                }
            );
    };

    function success(updatedTable) {
        return { type: TABLE_ASSIGN_SUCCESS, updatedTable };
    }
}

export function addTable(data) {
    return (dispatch) => {
        new Api().post(`tables`, data)
            .then(
                (response) => {
                    dispatch(success(response.data));
                },
                (_) => {
                }
            );
    };

    function success(table) {
        return { type: TABLES_POST_SUCCESS, table };
    }
}
