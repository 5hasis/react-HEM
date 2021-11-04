import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux';
import { Typography } from 'antd';
import Axios from 'axios';
import {updateReservationUser} from '../../../_actions/user_action';


const {Title} = Typography

function MyRestaurantReservationDetail(props) {

    const reservationNo = props.match.params.reservationNo
    const [ReservationDetail, setReservationDetail] = useState([])
    const dispatch=useDispatch();
    

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

    const onSubmitHandler=(event)=>{
        event.preventDefault();


        let body={
            reservationNo:reservationNo,
            reservationName:ReservationDetail.reservationName,
            reservationDate:ReservationDetail.reservationDate,
            reservationTime:ReservationDetail.reservationTime,
            reservationPeople:ReservationDetail.reservationPeople,
            reservationState:"승인 완료"
        }

        dispatch(updateReservationUser(body))
        .then(response=>{
            
            if(response.payload){
                alert("승인이 완료되었습니다.")
               
            }else{
                alert("승인을 실패하였습니다.")
            }
            
        })

        
    }


    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
        
        <Title level={4}>{ReservationDetail.reservationName}</Title>
        <Title level={4}>{change_date(ReservationDetail.reservationDate)}</Title>
        <Title level={4}>{ReservationDetail.reservationTime}</Title>
        <Title level={4}>{ReservationDetail.reservationPeople}명</Title>
        <Title level={4}>{ReservationDetail.reservationState}</Title>
        <form onSubmit={onSubmitHandler}>
        {/* <input type="text" value={RvState} onChange={onRvStateHandler}/>      */}
        <button type="submit">승인</button>
        </form>

        


        

    </div>
);
}

export default MyRestaurantReservationDetail