import {

    LOGIN_USER,REGISTER_USER, UPDATE_USER,RESERVATION_USER, FIND_ID

} from '../_actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, accessToken: action.payload }
           // break;
        case FIND_ID:
            return { ...state, member:action.payload }
           // break;
        case REGISTER_USER:
            return {...state,register:action.payload}
           // break;

        case UPDATE_USER:
            return {...state,member:action.payload}
          //  break;    

        case RESERVATION_USER:
            return {...state,reservation:action.payload}
           // break;

        case "create_menu":
            return {...state,menu:action.payload}
           // break;

        case "create_order_history":
            return {...state,orderhistory:action.payload}
           // break;

        default:
            return state;
    }
}