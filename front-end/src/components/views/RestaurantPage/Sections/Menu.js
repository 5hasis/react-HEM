import React, { useEffect, useState } from 'react'
import { Col } from 'antd';
import Axios from 'axios';

function Menu(props) {

    const [Menu, setMenu] = useState([]);

    useEffect(() => {
        Axios.get(`/api/menu/${props.restaurantNo}`)
            .then(response => {
              if(response.data)  {
                setMenu(response.data)
              }
              else{
                alert('메뉴 정보를 가져오는데 실패')
              }
            })
    }, [])

    const renderCards = Menu.map((menu, index) => {
        
        return <Col lg={6} md={8} xs={24} key={index}>
            <a>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                {menu.menuName}<br/>
                {menu.menuPrice}

                </div>
            </a>
            <br />
        </Col>
    })

    return (
        <div>
            {renderCards}
        </div>
    )
}

export default Menu
