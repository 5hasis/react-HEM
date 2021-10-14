import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Button } from 'antd';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import MyReservationPage from './MyReservationPage';


const {Title} = Typography

function MyReservationDetailPage(props) {

    const reservationNo = props.match.params.reservationNumber
    //const restaurantNo = props.match.params.restaurantNo

    const [ReservationDetail, setReservationDetail] = useState([])

    function change_date(published_at){
        var moment = require('moment');
        
        const publish_date = moment(published_at).format('YYYY-MM-DD')
        return publish_date
    }

    useEffect(() => {
        Axios.get(`/api/reservation/detail/${reservationNo}`)
            .then(response => {
                if(response.data){
                    console.log(response.data)
                    setReservationDetail(response.data)
                }
                else{
                    alert('예약 정보를 가져오는데 실패')
                }
            })
    }, [])
    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>{ReservationDetail.reservationName}</Title>
            <hr />
            <Title level={4}>{ReservationDetail.reservationName}</Title>
            <Title level={4}>{change_date(ReservationDetail.reservationDate)}</Title>
            <Title level={4}>{ReservationDetail.reservationTime}</Title>
            <Title level={4}>{ReservationDetail.reservationPeople}</Title>

            

        </div>
    )
}

export default MyReservationDetailPage