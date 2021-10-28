import React, { useEffect, useState } from 'react'
import { Button, Col,Row } from 'antd';
import Axios from 'axios';
import Orders from './Orders';


function Menu(props) {

    const [OrderMenu, setOrderMenu] = useState([]);
    const MenuInfo = props.menus

    const restaurantNo = props.restaurantNo;

    useEffect(() => {
        console.log('props.menus : ',props.menus);
        const OrderArr = MenuInfo.map((item,index)=>{ 
            return {menuNumber:item.menuNumber, menuName:item.menuName, menuPrice:item.menuPrice, orderAmount:0}
        })
        console.log(OrderArr)
        setOrderMenu(...OrderMenu,OrderArr);

    }, [props.menus])

    
    const [inputs, setInputs] = useState({
        orderAmount: ''
      })      
    
    const onOrderNumberHandler= (index) => (event)=>{
        
        setInputs({
            ...inputs,
            [event.target.name]:event.target.value
        })

        let newArr = OrderMenu.map((item, i) => { 
            if (index == i) { 
                return { ...item, orderAmount: event.target.value }; 
            } else { 
                return {...item}; 
            } 
        }); 
        setOrderMenu(newArr);

    }

    
    const [OrderNumber, setOrderNumber] = useState(0)

    function totalOrderPrice () {
        let orderPrice = 0;
        console.log(OrderMenu)
        {OrderMenu && OrderMenu.map((item, i) => { 
            orderPrice = orderPrice + ((parseInt(item.orderAmount)) * item.menuPrice)
        })}
        console.log(orderPrice)
        return orderPrice
    }


    const onSubmitHandler=(event)=>{
        
        event.preventDefault();

        
        const totalPrice = totalOrderPrice();
        console.log('totalPrice',totalPrice)

        const order = {
            orderPrice:totalPrice,
            memberMemberNo:restaurantNo,
            orderTableNumber:9, //일단 테이블 넘버 9로...
        }
       
        Axios.post('/api/order', order)
            .then(response => {
                if(response.data){
                    console.log(response.data)
                    setOrderNumber(response.data.orderNumber);
                }
            })

    }

    const renderCards = MenuInfo.map((menu, index) => {
        
        return <Col lg={6} md={8} xs={24} key={index}>
            
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                    <div style={{display: 'inline-block'}}>
                            {menu.menuName}<br/>
                            {menu.menuPrice}원<br/>
                            {menu.menuStatus}
                    </div>
                    
                    <div style={{display: 'inline-block', width:'30%', marginLeft:'36px'}}>
                        <div style={{color:'black'}}>수량</div>
                        <input type="number" name="orderAmount" min={0} onChange={onOrderNumberHandler(index)} 
                            style={{width:'100%'}}
                        />
                        
                    </div>
                </div>
            
            <br />
        </Col>
    })

    return (
        <form onSubmit={onSubmitHandler}>
            <Row gutter={[32,16]}>
                
                    {renderCards}
                    <Orders OrderMenu={OrderMenu} OrderNumber={OrderNumber} onSubmitHandler={onSubmitHandler}/>
                
            </Row>
            <div>
                <Button htmlType="submit">주문하기</Button>
            </div>
        </form>
        
    )
}

export default Menu
