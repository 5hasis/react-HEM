import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button } from 'antd';

import Axios from 'axios';

const {Title} = Typography

function LandingPage(){

    const [Restaurants, setRestaurants] = useState([])

    useEffect(() => {
        
        Axios.get('/api/member/list')
            .then(response => {
                if (response.data){
                    console.log(response.data)
                    setRestaurants(response.data)
                   

                }
                else{
                    alert('식당 리스트 출력 실패')
                }
            })

    }, [])

    const renderCards = Restaurants.map((restaurant, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <a>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                {restaurant.memberName}<br/>
                {restaurant.memberAddress}

                </div>
            </a>
            <br />
            {/* <Meta 
                avatar={ //동그라미 user이미지
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description="" />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span> - 
            <span> {moment(video.createdAt).format("MMM Do YY")} </span> */}
        </Col>
    })


    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>맛집 둘러보기</Title>
            <hr />
            <Row gutter={[32,16]}>

                {renderCards}
                
            </Row>


        </div>
    )
}

export default LandingPage