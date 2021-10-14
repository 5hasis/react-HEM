import React, { useEffect, useState } from 'react'
import { Button, Col,Row } from 'antd';
import Axios from 'axios';

function Menu(props) {

    const [Menu, setMenu] = useState([]);
    const [OrderMenu, setOrderMenu] = useState([])

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

    useEffect(() => {
        const OrderArr = Menu.map((item,index)=>{
            return {menuName:item.menuName, orderAmount:0}
        })
        setOrderMenu(...OrderMenu,OrderArr)

    }, [])

    const [inputs, setInputs] = useState({
        menuName: ""
      })      
    
    const onOrderNumberHandler= (index) => (event)=>{

        console.log(OrderMenu);

        setInputs({
            ...inputs,
            [event.target.name]:event.target.value
        })

        let newArr = OrderMenu.map((item, i) => { 
            if (index == i) { 
                return { ...item, orderAmount: event.target.value }; 
            } else { 
                return item; 
            } 
        }); 
        setOrderMenu(newArr);
   
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();

        Axios.post('/api/order',OrderMenu) 
            .then(response => response.data)       

    }


    const renderCards = Menu.map((menu, index) => {
        
        return <Col lg={6} md={8} xs={24} key={index}>
            <a>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                    <div style={{display: 'inline-block'}}>
                            {menu.menuName}<br/>
                            {menu.menuPrice}원<br/>
                            {menu.menuStatus}
                    </div>
                    
                    <div style={{display: 'inline-block', width:'30%', marginLeft:'36px'}}>
                        
                        <input type="number" name="menuName" min={0} onChange={onOrderNumberHandler(index)} 
                            style={{width:'100%'}}
                        />
                        
                    </div>
                </div>
            </a>
            <br />
        </Col>
    })

    return (
        <form onSubmit={onSubmitHandler}>
            <Row gutter={[32,16]}>
                
                    {renderCards}
                
            </Row>
            <div>
                <Button type="submit">주문하기</Button>
            </div>
        </form>
        
    )
}

export default Menu
