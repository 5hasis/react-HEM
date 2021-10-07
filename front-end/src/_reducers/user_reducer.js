import {
    LOGIN_USER,REGISTER_USER, UPDATE_USER
} from '../_actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, accessToken: action.payload }
            break;
        case REGISTER_USER:
            return {...state,register:action.payload}
            break;
        case UPDATE_USER:
            return {...state,member:action.payload}
            break;    
        default:
            return state;
    }
}