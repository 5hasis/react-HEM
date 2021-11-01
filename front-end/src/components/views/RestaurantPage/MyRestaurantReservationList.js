import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Row, Col, Typography } from 'antd';

const {Title} = Typography

function MyRestaurantReservationList(props) {

    const restaurantNo = props.match.params.restaurantNo
    //console.log(restaurantNo);

    const [ReservationList, setReservationList] = useState([])

    function change_date(published_at){
        var moment = require('moment');
        
        const publish_date = moment(published_at).format('YYYY-MM-DD')
        return publish_date
    }

    useEffect(() => {
        Axios.get(`/api/reservation/reservationhistory/${restaurantNo}`)
            .then(response => {
                console.log(response.data)
                setReservationList(response.data)
            })
    }, [])

    const renderCards = ReservationList.map((reservationlist, index) => {
        
        return <Col lg={6} md={8} xs={24} key={index}> 
            <a>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                    <div style={{display: 'inline-block'}}>
                        예약 번호 : {reservationlist.reservationNo}
                        <hr />
                        예약 이름 : {reservationlist.reservationName}<br/>
                        예약 날짜 : {change_date(reservationlist.reservationDate)}<br/>
                        예약 시간 : {reservationlist.reservationTime}<br/>
                        예약 인원 : {reservationlist.reservationPeople}<br/>
                       
                            
                    </div>
                </div>
            </a>
            <br />
        </Col>
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>우리 가게 예약 내역</Title><hr/>
            <Row gutter={[32,16]}>
                    {renderCards} 
            </Row>
        </div>
    )
}

export default MyRestaurantReservationList
