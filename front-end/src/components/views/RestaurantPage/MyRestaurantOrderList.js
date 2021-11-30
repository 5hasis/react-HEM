import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Row, Col, Typography } from 'antd';

const {Title} = Typography

function MyRestaurantOrderList(props) {

    const restaurantNo = props.match.params.restaurantNo
    // console.log(restaurantNo);

    const [OrderList, setOrderList] = useState([])

    useEffect(() => {
        Axios.get(`/api/order/orderList/${restaurantNo}`)
            .then(response => {
                console.log(response.data)
                setOrderList(response.data)
            })
    }, [])


    const renderCards = OrderList.map((orderlist, index) => {
        
        return <Col lg={6} md={8} xs={24} key={index}> 
            <a href={`/orderDetail/${orderlist.orderNumber}`}>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                    <div style={{display: 'inline-block'}}>
                        주문 번호 : {orderlist.orderNumber}
                        <hr />
                        테이블 번호 : {orderlist.orderTableNumber}<br/>
                        총 주문 금액 : {orderlist.orderPrice}원<br/>
                        {orderlist.orderStatus}
                    </div>
                </div>
            </a>
            <br />
        </Col>
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>우리 가게 주문 내역</Title><hr/>

            {
                OrderList.length == 0?
                
                <Title level={4} style={{margin:'3rem 0 0 2rem'}}>주문 내역이 없습니다.</Title>
                :
                <Row gutter={[32,16]}>
                    {renderCards} 
                </Row>
            }
        </div>
    )
}

export default MyRestaurantOrderList
