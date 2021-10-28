import React, { useEffect, useState } from 'react'
import { Button,Typography } from 'antd';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router';


const {Title} = Typography

function MyReservationDetailPage(props) {

    const history = useHistory();
    const reservationNo = props.match.params.reservationNo
    const [ReservationDetail, setReservationDetail] = useState([])
    const [Reservations, setReservations] = useState([])

    // const onRemove = reservationNumber => {
       
    //     setStudents(students.filter(student => student.id !== id));
    //   };

    const updateBtn = (event) => {
        history.push({
            pathname:`/myReservationInfo`,
            state:ReservationDetail,
        });
    }
        
    
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
            <Title level={2}>{ReservationDetail.reservationNo}</Title>
            <hr />
            <Title level={4}>{ReservationDetail.reservationName}</Title>
            <Title level={4}>{change_date(ReservationDetail.reservationDate)}</Title>
            <Title level={4}>{ReservationDetail.reservationTime}</Title>
            <Title level={4}>{ReservationDetail.reservationPeople}명</Title>

            <Button onClick={updateBtn}>수정하기</Button>&nbsp;&nbsp;
            <Button >삭제하기</Button>
            {/* <button onClick={() => onRemove(reservationNumber)}>삭제</button> */}


            

        </div>
    )
}

export default MyReservationDetailPage