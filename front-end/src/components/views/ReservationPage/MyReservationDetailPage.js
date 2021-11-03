import React, { useEffect, useState } from 'react'
import { Button,Typography } from 'antd';
import Axios from 'axios';
import { useHistory } from 'react-router';


const {Title} = Typography

function MyReservationDetailPage(props) {

    const history = useHistory();
    const reservationNo = props.match.params.reservationNo
    const memberNo=props.match.params.memberNo
    const [ReservationDetail, setReservationDetail] = useState([])
    const [MemberDetail, setMemberDetail] = useState([])
    const updateBtn = (event) => {
        history.push({
            pathname:`/myReservationInfo`,
            state:ReservationDetail,
        });
    }
        
    const deleteBtn =(event)=>{
        Axios.delete(`/api/reservation/delete/${reservationNo}`)
        .then(response => {
            
                history.push('/myReservation')
            
        })
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
                    //console.log(response.data)
                    setReservationDetail(response.data)
                }
                else{
                    alert('예약 정보를 가져오는데 실패')
                }
            })
    }, [])
    useEffect(() => {
        Axios.get(`/api/member/detail/${memberNo}`)
            .then(response => {
                if(response.data){

                    setMemberDetail(response.data)
                    
                }
                else{
                    alert('예약 정보를 가져오는데 실패')
                }
            })
    }, [])
  
    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>{MemberDetail.memberName}</Title>
            <hr />
            <Title level={4}>{ReservationDetail.reservationName}</Title>
            <Title level={4}>{change_date(ReservationDetail.reservationDate)}</Title>
            <Title level={4}>{ReservationDetail.reservationTime}</Title>
            <Title level={4}>{ReservationDetail.reservationPeople}명</Title>

            <Button onClick={updateBtn}>수정하기</Button>&nbsp;&nbsp;
            <Button onClick={deleteBtn}>삭제하기</Button>


            

        </div>
    )
}

export default MyReservationDetailPage