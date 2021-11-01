import { Button, Typography } from 'antd';
import React from 'react'
import { useHistory, useLocation } from 'react-router';

const {Title} = Typography

function MyRestaurant(props) {

    const history = useHistory();
    const location = useLocation();
    const member = location.state; 

    const restaurantNo = props.match.params.restaurantNo

    console.log(member)

    const updateBtn = (event) => {
        history.push({
            pathname:'/myRestaurantInfo',
            state:member,
        });
    }

    const createMenu = (event) => {
        history.push({
            pathname:`/menu/${restaurantNo}`,
            state:member
        });
    }

    const orderList = () => {
        history.push({
            pathname:`/myRestaurant/orderlist/${restaurantNo}`,
            state:restaurantNo
        });
    }

    const reservationList = () => {
        history.push({
            pathname:`/myRestaurant/reservationlist/${restaurantNo}`,
            state:restaurantNo
        });
    }


    return (
        <div style={{width:'65%', margin:'3rem auto', textAlign:'center'}}>
            <Title level={4}>내 가게 정보 </Title>
            <Title level={4}>{member.memberName} </Title>
            
            <div>
            <Button onClick={createMenu}>메뉴 추가</Button>
            </div><br/>
            <div>
            <Button onClick={orderList}>주문 내역</Button>
            </div><br/>
            <div>
            <Button onClick={reservationList}>예약 내역</Button>
            </div>
            <br />
            <div>
            <Button onClick={updateBtn}>수정</Button>&nbsp;&nbsp;
            <Button >회원 탈퇴</Button>
            </div>
        </div>
    )
}

export default MyRestaurant
