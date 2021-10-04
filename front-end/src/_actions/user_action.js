import axios from 'axios';
import {
    REGISTER_USER,
    LOGIN_USER
} from './types';
//import { config } from "../config";

export function loginUser(dataToSubmit) {

    const request = axios.post('/api/member/signin', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){

    const request=axios.post('/api/member/signup',dataToSubmit)
        .then(response=>response.data)
    return {
        type:REGISTER_USER,
        payload:request
    }

}