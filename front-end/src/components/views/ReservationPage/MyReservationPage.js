import React,{useEffect,useState} from 'react';
import { Row, Col, Typography, Button } from 'antd';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';




function MyReservationPage() {


    const [PhoneNumber, setPhoneNumber]=useState('1')
    const [Reservations, setReservations] = useState([])
    

    const phoneNumberHandler=(e)=>{
        setPhoneNumber(e.currentTarget.value)
    }

    
    
    function searchByPhone() {
        Axios.get(`/api/reservation/${PhoneNumber}`)
            .then(response => {
                if(response.data){
                    console.log(response.data)
                    setReservations(response.data)
                }
                else{
                    alert('예약 정보를 가져오는데 실패')
                }
            })
        }
    
    function change_date(published_at){
        var moment = require('moment');
        
        const publish_date = moment(published_at).format('YYYY-MM-DD')
        return publish_date
    }

    

    const renderCards = Reservations.map((reservation, index) => {
        
        return <Col lg={6} md={8} xs={24} key={index}>
            <a href={`/myReservation/${reservation.reservationNumber}`}>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                {reservation.memberName}<br/>
                {reservation.reservationName}<br/>
                {change_date(reservation.reservationDate)}<br/> 
                {reservation.reservationTime}<br/>
                {reservation.reservationPeople}명

                </div>
                </a>
            
            <br />
            
        </Col>
    })

    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
            <h1>내 예약 확인하기</h1>
            <br/>
            <div>
                <input type="text" onChange={phoneNumberHandler}></input>
                <button onClick={searchByPhone}>Search</button>
            </div>
            <Row gutter={[32,16]}>

                {renderCards}
                
            </Row>
            
        </div>
);
}

export default MyReservationPage