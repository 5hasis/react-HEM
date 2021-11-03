import React,{useState} from 'react';
import { Row, Col} from 'antd';
import Axios from 'axios';




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
                    //console.log(response.data)
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
            <a href={`/myReservation/${reservation.reservationNo}/${reservation.member.memberNo}`}>
            <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                    <div style={{display: 'inline-block'}}>
                        식당 이름: {reservation.member.memberName}<hr/>
                        예약 이름: {reservation.reservationName}<br/>
                        예약 날짜: {change_date(reservation.reservationDate)}<br/> 
                        예약 시간: {reservation.reservationTime}<br/>
                        예약 인원: {reservation.reservationPeople}명
                    </div>
                
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
            <Row gutter={[32,16]} style={{width: '90%',padding:'3% 0 0 0'}}>

                {renderCards}
                
            </Row>
            
        </div>
);
}

export default MyReservationPage