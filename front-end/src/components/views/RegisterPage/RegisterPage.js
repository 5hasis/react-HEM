import React, { useState } from 'react';
//import { useForm } from "react-hook-form";
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';


function RegisterPage(){


    
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
    
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <form style={{display:'flex',flexDirection:'column',width:'20%'}}>
            <label>Name (Trade name)</label>
            <input type="text"/>
            <label>Phone</label>
            <input type="text"/>
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
            <input type="text" placeholder="Detail Address"/>            
            <label>ID</label>
            <input type="text"/>
            <label>Password</label>
            <input type="password"/>
            <label>Confirm Password</label>
            <input type="password"/>
            <br/>
            <button type="submit">Sign in</button>
            <button onClick={onReset}>Reset</button>
        </form>
    </div>
);
}

export default RegisterPage
