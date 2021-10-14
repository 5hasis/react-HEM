import React, { useEffect, useState } from 'react'
import { Button, Col,Row } from 'antd';
import {useDispatch} from 'react-redux';
import { createOrderHistory } from '../../../../_actions/user_action';

function Menu(props) {

    const [OrderMenu, setOrderMenu] = useState([]);
    const MenuInfo = props.Menus

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

    const dispatch=useDispatch();

    const onSubmitHandler=(event)=>{
        console.log('OrderMenu : ', OrderMenu)
        event.preventDefault();

        {OrderMenu && OrderMenu.map((item, i) => { 

            const body={
                menusMenuNumber:item.menuNumber,
                orderAmount:item.orderAmount
            }

            if(parseInt(item.orderAmount) !== 0) {
                dispatch(createOrderHistory(body))
                .then(response=>{
                    console.log(response)
                })
            }
        }); 
    }
               

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
                
            </Row>
            <div>
                <Button htmlType="submit">주문하기</Button>
            </div>
        </form>
        
    )
}

export default Menu
