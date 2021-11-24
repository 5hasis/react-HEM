import axios from 'axios';
import {
    REGISTER_USER,
    LOGIN_USER,
    RESERVATION_USER,
    FIND_ID
} from './types';
import Cookies from 'universal-cookie';
//import { config } from "../config";

export function loginUser(dataToSubmit) {

    const request = axios.post('/api/member/signin', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function findID(dataToSubmit) {

    const request = axios.post('/api/member/findId', dataToSubmit)
        .then(response => response.data)

    return {
        type: FIND_ID,
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


export function updateUser(dataToSubmit){

    const request=axios.patch('/api/member/update',dataToSubmit)
        .then(response=>response.data)
    return {
        type:REGISTER_USER,
        payload:request
    }
}

export function reservationUser(dataToSubmit){
    const request=axios.post('/api/reservation/createReservation',dataToSubmit)
        .then(response=>response.data)
    return {
        type:RESERVATION_USER,
        payload:request
    }

}

export function updateReservationUser(dataToSubmit){

    const request=axios.patch('/api/reservation/update',dataToSubmit)
        .then(response=>response.data)
    return {
        type:RESERVATION_USER,
        payload:request
    }
}

export function deleteReservation(dataToSubmit){

    const request=axios.patch('/api/reservation/delete',dataToSubmit)
        .then(response=>response.data)
    return {
        type:RESERVATION_USER,
        payload:request
    }
}

export function createMenu(dataToSubmit){
    const cookies = new Cookies();
    const token = cookies.get('accessToken');

    const request = axios({
        method: 'post',
        url: '/api/menu',
        data: dataToSubmit,
        headers: { Authorization: `Bearer ${token}` },
      }).then(response=>response.data)

    return {
        type:"create_menu",
        payload:request
    }
}

export function createOrderHistory(dataToSubmit){
    const request=axios.post('/api/orderhistory',dataToSubmit)
        .then(response=>response.data)
    return {
        type:"create_order_history",
        payload:request
    }

}