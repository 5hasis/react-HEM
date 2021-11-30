import React, { useState, useEffect, useRef } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';


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

        const emailReinput=useRef();

        //만들어둔 action을 useDispath를 통해 발생시킴
        const dispatch=useDispatch();

        const [Name, setName] = useState("")
        const [Phone, setPhone] = useState("")
        const [FirstAddress, setFirstAddress] = useState("")
        const [Address, setAddress] = useState("")
        const [Id, setId] = useState("")
        const [Password, setPassword] = useState("")
        const [ConfirmPassword, setConfirmPassword] = useState("")
        const [Email, setEmail] = useState("")
        const [Boss, setBoss] = useState("")

        useEffect(() => {
            if (Phone.length === 10) {
              setPhone(Phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
            }
            if (Phone.length === 13) {
              setPhone(Phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
            }
          }, [Phone]);
          
          const isEmail = (e) => {
            e.preventDefault();
            const emailRegex =
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
            console.log(emailRegex.test(e.target.value))
            
            if(!emailRegex.test(e.target.value) && (e.target.value).length!==0){
                alert('이메일을 잘못 입력하였습니다')
                setEmail('');
                
            }
          };

        const onNameHandler=(event)=>{
            setName(event.currentTarget.value)
        }
        const onBossHandler=(event)=>{
            setBoss(event.currentTarget.value)
        }
        const onEmailHandler=(event)=>{
            //setEmail(finalEmail)
            setEmail(event.currentTarget.value)

          
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
    
        const getAddress = (data) => {
            setFirstAddress(data);
        }

        const onSubmitHandler=(event)=>{
            event.preventDefault();
    
            if(Password!==ConfirmPassword){
                return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
            }
    
            let body={
                memberName:Name,
                memberPhone:Phone,
                memberAddress:FirstAddress+' '+Address,
                memberId:Id,
                memberPw:Password,
                memberEmail:Email,
                memberBoss:Boss
            }
    
            dispatch(registerUser(body))
            .then(response=>{
                
                if(response.payload.registerSuccess){
                    props.history.push("/registerSuccess")
                }else{
                    alert("Failed to sign up")
                }
                
            })
    
            
        }
    
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <form style={{display:'flex',flexDirection:'column',width:'20%'}} onSubmit={onSubmitHandler}>
            <label>Trade name</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            <label>Name</label>
            <input type="text" value={Boss} onChange={onBossHandler}/>
            <label>Email</label>
            <input type="text" value={Email} onBlur={isEmail} onChange={onEmailHandler} ref={emailReinput}/>
            <label>Phone</label>
            <input type="text" value={Phone} onChange={onPhoneHandler}/>
            <label>Address</label>
            <div>
            <button type='button' onClick={openPostCode}>Zip Code</button>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} getAddress={getAddress} />
                    </PopupDom>
                )}
            </div>
            </div>
            <input type="text" value={FirstAddress} />
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