import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import { Row, Col, Typography } from 'antd';
import {updateReservationUser} from '../../../_actions/user_action';

const {Title} = Typography

function MyRestaurantReservationList(props) {

    const dispatch=useDispatch();
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
                <a href={`/myRestaurant/reservationDetail/${reservationlist.reservationNo}`}>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                    <div style={{display: 'inline-block'}}>
                    
                        예약 번호 : {reservationlist.reservationNo}
                        <hr />
                        예약 이름 : {reservationlist.reservationName}<br/>
                        예약 날짜 : {change_date(reservationlist.reservationDate)}<br/>
                        예약 시간 : {reservationlist.reservationTime}<br/>
                        예약 인원 : {reservationlist.reservationPeople}<br/>
                        예약 상태 : {reservationlist.reservationState}<br/><br/>
                        
                        
              
                            
                    </div>
                </div>
                </a>
            <br />
        </Col>
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>우리 가게 예약 내역</Title><hr/>

            {
                ReservationList.length == 0?
                
                <Title level={4} style={{margin:'3rem 0 0 2rem'}}>예약 내역이 없습니다.</Title>
                :
                <Row gutter={[32,16]}>
                    {renderCards} 
                </Row>
            }
        </div>
    )
}

export default MyRestaurantReservationList
