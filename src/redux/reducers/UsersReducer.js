import {
    USERS_GET_SUCCESS,
    USERS_POST_SUCCESS,
} from '../constants';

const INITIAL_STATE = {
    all: []
}

var usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERS_GET_SUCCESS:
            return {
                ...state,
                all: action.list,
            }
        case USERS_POST_SUCCESS:
            let newList  = [...state.all, action.payload]
            return {
                ...state,
                all: newList
            }
        default:
            return state;
    }
}

export default usersReducer;