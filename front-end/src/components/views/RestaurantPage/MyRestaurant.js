import { Button, Typography } from 'antd';
import React from 'react'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import Cookies from 'universal-cookie';

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


    const deleteBtn = () => {
        const cookies = new Cookies();
        if (window.confirm("정말 회원 탈퇴하시겠습니까?")) {
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.get('accessToken')}`
            axios.delete(`/api/member/delete`).then(res => res)

            axios.get('/api/member/logout').then(response => {
                
                if (!response.data.accessToken) {
                    console.log(response)
                    cookies.remove('accessToken',{ path: '/' });
                    cookies.remove('memberNo',{ path: '/' });
                    
                    props.history.push("/deleteRestaurant");
                } else {
                    alert('Log Out Failed')
                }
            });
          } else {
            console.log("회원 탈퇴 취소.");
          }
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
            <Button onClick={deleteBtn}>회원 탈퇴</Button>
            </div>
        </div>
    )
}

export default MyRestaurant
