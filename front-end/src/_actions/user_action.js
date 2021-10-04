import axios from 'axios';
import {
    LOGIN_USER
} from './types';
//import { config } from "../config";

export function loginUser(dataToSubmit) {

    const request = axios.post('/api/user/signin', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}