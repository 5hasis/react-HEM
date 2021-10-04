import React, { useState } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


function RegisterPage(props){


    
        const [setText] = useState('');
   
        // 팝업창 상태 관리
        const [isPopupOpen, setIsPopupOpen] = useState(false)
     
        // 팝업창 열기
        const openPostCode = () => {
            setIsPopupOpen(true)
        }
     
        // 팝업창 닫기
        const closePostCode = () => {
            setIsPopupOpen(false)
        }

        const onReset = () => {
            setText('');
        }

        const dispatch=useDispatch();

        const [Name, setName] = useState("")
        const [Phone, setPhone] = useState("")
        const [Address, setAddress] = useState("")
        const [Id, setId] = useState("")
        const [Password, setPassword] = useState("")
        const [ConfirmPassword, setConfirmPassword] = useState("")

        const onNameHandler=(event)=>{
            setName(event.currentTarget.value)
        }
        const onPhoneHandler=(event)=>{
            setPhone(event.currentTarget.value)
        }
        const onAddressHandler=(event)=>{
            setAddress(event.currentTarget.value)
        }
        const onIdHandler=(event)=>{
            setId(event.currentTarget.value)
        }
        const onPasswordHandler=(event)=>{
            setPassword(event.currentTarget.value)
        }
        const onConfirmPasswordHandler=(event)=>{
            setConfirmPassword(event.currentTarget.value)
        }
    
        const onSubmitHandler=(event)=>{
            event.preventDefault();
    
            if(Password!==ConfirmPassword){
                return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
            }
    
            let body={
                memberName:Name,
                memberPhone:Phone,
                memberAddress:Address,
                memberId:Id,
                memberPw:Password
            }
    
            dispatch(registerUser(body))
            .then(response=>{
                
                props.history.push("/registerSuccess")
                
            })
    
            
        }
    
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <form style={{display:'flex',flexDirection:'column',width:'20%'}} onSubmit={onSubmitHandler}>
            <label>Name (Trade name)</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            <label>Phone</label>
            <input type="text" value={Phone} onChange={onPhoneHandler}/>
            <label>Address</label>
            <div>
            <button type='button' onClick={openPostCode}>Zip Code</button>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>
            </div>
            <input type="text"/>
            <input type="text" placeholder="Detail Address" value={Address} onChange={onAddressHandler}/>            
            <label>ID</label>
            <input type="text" value={Id} onChange={onIdHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br/>
            <button type="submit">Sign up</button>
            <button onClick={onReset}>Reset</button>
        </form>
    </div>
);
}

export default RegisterPage