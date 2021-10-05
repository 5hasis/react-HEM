import React from 'react'
import { Col } from 'antd';


function GridCards(props) {

    console.log(props)
    
    return (

        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <div>{props.Restaurants.memberName}</div>
            </div>
        </Col>

    )
    
}

export default GridCards