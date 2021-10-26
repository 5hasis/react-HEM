import React, { useEffect, useState } from 'react'
import { Button, Col,Row } from 'antd';
import Axios from 'axios';
import Orders from './Orders';


function Menu(props) {

    const [OrderMenu, setOrderMenu] = useState([]);
    const MenuInfo = props.Menus

    const restaurantNo = props.restaurantNo;

    useEffect(() => {
        console.log('props.Menus : ',props.Menus);
        const OrderArr = MenuInfo.map((item,index)=>{ 
            return {menuNumber:item.menuNumber, menuName:item.menuName, orderAmount:0}
        })
        console.log(OrderArr)
        setOrderMenu(...OrderMenu,OrderArr);

    }, [props.Menus])

    
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
        {OrderMenu && OrderMenu.map((item, i) => { 
            orderPrice = orderPrice + ((parseInt(item.orderAmount)) * item.menuPrice)
        })}
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
            <a>
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
            </a>
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
