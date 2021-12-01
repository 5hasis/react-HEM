import React,{useState} from 'react'
import {useHistory,useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {updatePw} from '../../../_actions/user_action';

function NewPwPage() {

    const location = useLocation();
    const memberId = location.state; 

    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler=(event)=>{
        setConfirmPassword(event.currentTarget.value)
    }

    const dispatch=useDispatch();
    let history = useHistory();
    
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    
            if(Password!==ConfirmPassword){
                return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
            }
    
            let body={
                memberId,
                memberPw:Password
            }

            dispatch(updatePw(body))
            .then(response=>{
                
                if(response.payload == true){
                    history.push("/login")
                }else{
                    alert("Failed to update")
                }
                
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                
                <label>새로운 비밀번호 :</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>새로운 비밀번호 확인 :</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button type="submit">비밀번호 변경</button>
            </form>

            
        </div>
    )
}

export default NewPwPage
