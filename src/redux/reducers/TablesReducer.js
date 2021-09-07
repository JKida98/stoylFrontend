import {
    TABLES_GET_SUCCESS,
    TABLE_ASSIGN_SUCCESS
} from '../constants';

const INITIAL_STATE = {
    all: []
}

var tableReduer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TABLES_GET_SUCCESS:
            return {
                ...state,
                all: action.list,
            }
        case TABLE_ASSIGN_SUCCESS:
            var newList = state.all.map((x) => {
                if (x._id === action.updatedTable._id) {
                    return x = action.updatedTable
                } else {
                    return x
                }
            })
            return {
                ...state,
                all: newList
            }
        default:
            return state;
    }
}

export default tableReduer;