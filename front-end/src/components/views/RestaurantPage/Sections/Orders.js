import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {useHistory } from 'react-router-dom'
import { createOrderHistory } from '../../../../_actions/user_action';

function Orders(props) {

    const OrderMenu = props.OrderMenu;
    const OrderNumber = props.OrderNumber;

    const dispatch=useDispatch();
    let history = useHistory();

    useEffect(() => {
        {OrderMenu && OrderMenu.map((item, i) => { 
            
            const body={
                menusMenuNumber:item.menuNumber,
                orderAmount:item.orderAmount,
                orderOrderNumber:OrderNumber,
            }
    
            if(parseInt(item.orderAmount) !== 0) {
                dispatch(createOrderHistory(body))
                .then(response=>{
                    if(response.payload){
                        console.log(response.payload)
                    }
                })
            }
        }); 
        }

        if(OrderNumber > 0){
            alert('주문 완료!')
            history.push('/')
        }
    }, [OrderNumber])

    return (
        <div>
            
        </div>
    )
}

export default Orders
