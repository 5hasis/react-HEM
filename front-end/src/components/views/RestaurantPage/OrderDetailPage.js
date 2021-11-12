import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Typography } from 'antd';

const {Title} = Typography

function OrderDetailPage(props) {

    const orderNo = props.match.params.orderNumber

    const [OrderDetail, setOrderDetail] = useState([])
    const [OrderTableNumber, setOrderTableNumber] = useState(0)
    const [OrderPrice, setOrderPrice] = useState(0)

    useEffect(() => {
        Axios.get(`/api/orderhistory/orderList/${orderNo}`)
            .then(response => {
                //console.log(response.data)
                setOrderDetail(response.data)
                //console.log(response.data[0])
                setOrderTableNumber(response.data[0].order.orderTableNumber)
                setOrderPrice(response.data[0].order.orderPrice)
            })
    }, [orderNo])

    const renderCards = OrderDetail.map((orderDetail, index) => {
        
        return <Col lg={24} md={24} xs={24} key={index}> 
            
            {orderDetail.menus.menuName} : {orderDetail.orderAmount}개 
            
            <br />
        </Col>
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>우리 가게 주문 내역</Title><hr/>
            
            {/* <div style={{textAlign:'center'}}> */}
                <div style={{ width:'30%', border:'1px solid rgb(232,232,232)', 
                            textAlign:'center', padding:'15px 0', display:'inline-block'}}>
                <Title level={5}>주문 번호 : {orderNo}</Title>
                <Title level={5}>테이블 번호 : {OrderTableNumber}</Title>
                <Title level={5}>총 주문 금액 : {OrderPrice}원</Title><br/>
                
                {renderCards} 
                </div>
            {/* </div> */}
        </div>
    )
}

export default OrderDetailPage
