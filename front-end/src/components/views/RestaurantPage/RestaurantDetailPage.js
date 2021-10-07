import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Button } from 'antd';
import { useHistory } from "react-router-dom";

import Axios from 'axios';

const {Title} = Typography

function RestauranDetailPage(props) {
    //console.log(props)

    const restaurantNo = props.match.params.restaurantNo

    const [RestaurantDetail, setRestaurantDetail] = useState([])

    useEffect(() => {
        Axios.get(`/api/member/detail/${restaurantNo}`)
            .then(response => {
                if(response.data){
                    console.log(response.data)
                    setRestaurantDetail(response.data)
                }
                else{
                    alert('식당 정보를 가져오는데 실패')
                }
            })
    }, [])

    let history = useHistory();

    const updateBtn = (event) => {
        history.push({
            pathname:'/myRestaurantInfo',
            state:RestaurantDetail
        });
    }

    const makeReservation =(event) =>{
        history.push({
            pathname:`/reservation/${restaurantNo}`,
            state:RestaurantDetail

        })
    }

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>{RestaurantDetail.memberName}</Title>
            <hr />
            <Title level={4}>{RestaurantDetail.memberAddress}</Title>
            <Title level={4}>{RestaurantDetail.memberPhone}</Title>

            <Button onClick={makeReservation}>예약하기</Button>
            <Button onClick={updateBtn}>내 가게 수정</Button>

        </div>
    )
}

export default RestauranDetailPage
