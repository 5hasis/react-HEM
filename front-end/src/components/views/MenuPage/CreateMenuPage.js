import React,{useState} from 'react';
import { createMenu } from '../../../_actions/user_action';
import {useDispatch} from 'react-redux';
import Axios from 'axios';

function CreateMenuPage(props) {

    const memberNo = props.match.params.restaurantNo

    const [MenuName, setMenuName] = useState('')
    const [MenuPrice, setMenuPrice] = useState('')

    const onNameHandler = (event) => {
        setMenuName(event.currentTarget.value)
    }

    const onPriceHandler = (event) => {
        setMenuPrice(event.currentTarget.value)
    }

    const dispatch=useDispatch();

    const onSubmitHandler=(event)=>{
        event.preventDefault();


        let body={
            menuName:MenuName,
            menuPrice:MenuPrice,
            memberMemberNo:memberNo
        }

        Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        dispatch(createMenu(body))
        .then(response=>{
            console.log(response)
            if(response.payload){
                console.log(memberNo)
                props.history.push(`/restaurant/${memberNo}`)
            }else{
                alert("메뉴 등록을 실패하였습니다.")
            }
            
        })        
    }

    return (
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
            <form style={{display:'flex',flexDirection:'column',width:'20%'}} onSubmit={onSubmitHandler}>
                <label>메뉴명</label>
                <input type="text" value={MenuName} onChange={onNameHandler}/>
                <label>가격</label>
                <input type="text" value={MenuPrice} onChange={onPriceHandler}/>
                
                <br/>
                <button type="submit">등록</button>
                {/* <button onClick={onReset}>Reset</button> */}
            </form>
        </div>
    );
}

export default CreateMenuPage