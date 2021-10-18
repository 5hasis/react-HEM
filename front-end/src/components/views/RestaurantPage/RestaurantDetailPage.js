import React, { useEffect, useState } from 'react'
import { Typography, Button } from 'antd';
import { useHistory } from "react-router-dom";

import Axios from 'axios';
import Menu from './Sections/Menu';

const {Title} = Typography

function RestaurantDetailPage(props) {
    //console.log(props)

    const restaurantNo = props.match.params.restaurantNo

    const [RestaurantDetail, setRestaurantDetail] = useState([])
    const [Menus, setMenus] = useState([]);

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

            Axios.get(`/api/menu/${restaurantNo}`)
            .then(response => {
              if(response.data)  {
                //console.log(response.data)
                setMenus(response.data)
              }
              else{
                alert('메뉴 정보를 가져오는데 실패')
              }
            })
    }, [])


    let history = useHistory();

    const myRestaurantBtn = () => {
        history.push({
            pathname:`/myRestaurant/${restaurantNo}`,
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

            <Button onClick={makeReservation}>예약하기</Button>&nbsp;&nbsp;
            <Button onClick={myRestaurantBtn}>내 가게 보기</Button>
           
            <br />
            
            <div style={{marginTop:'3rem'}}>
                <Title level={2}>메뉴 &nbsp;&nbsp;
                    
                </Title>
                <hr />
                
            </div>

            <Menu Menus={Menus} restaurantNo={restaurantNo} />
        </div>
    )
}

export default RestaurantDetailPage
