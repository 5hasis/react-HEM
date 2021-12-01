import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { init,send } from 'emailjs-com';



function FindPwPage() {

    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [id, setid] = useState('')
    const [user_AuthNum, setuser_AuthNum] = useState('')

    //6자리 숫자 인증번호 생성
    const[AuthNum,setAuthNum] = useState("000000")

    function createRandom(){
        setAuthNum(String(Math.floor(Math.random()*1000000)).padStart(6, "0"))
    }

console.log(AuthNum)
    const onEmailHandler = (e) => {
        setemail(e.currentTarget.value)
    }
    
    const onNameHandler = (e) => {
        setname(e.currentTarget.value)
    }
    
    const onIdHandler = (e) => {
        setid(e.currentTarget.value)
    }

    const onUserAuthNumHandler = (e) => {
        setuser_AuthNum(e.currentTarget.value)
    }

    
    useEffect(() => {
        init(`${process.env.REACT_APP_MAIL_API_INIT}`);
      }, []);
     
    const emailParam = {
        to_name:name,
        to_email:email,
        Authorization:AuthNum
    }

    const onEmailSubmitForm = (e) => {
        e.preventDefault();
        
        send(`${process.env.REACT_APP_MAIL_SERVICE_ID}`, `${process.env.REACT_APP_MAIL_TEMPLATE_ID}`, emailParam)
    }

    let history = useHistory();

    const onAuthSubmitForm = (e) => {
        e.preventDefault();
        if(AuthNum !== user_AuthNum){
            alert('인증번호가 일치하지 않습니다.')
            setuser_AuthNum('')
        } else{
            history.push("/login/newpw")
            history.push({
                pathname:`/login/newpw`,
                state:id
            });
        }
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onEmailSubmitForm}>
                이름 입력 : <input type='text' value={name} name='to_name' onChange={onNameHandler}></input><br />
                아이디 입력 : <input type='text' value={id} onChange={onIdHandler}></input><br />
                이메일입력 : <input type='text' value={email} name='to_email' onChange={onEmailHandler}></input><br />
                <button type="submit" onClick={createRandom}>인증번호 전송</button>
            </form>

            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onAuthSubmitForm}> 
                인증번호 입력 : <input type='text' value={user_AuthNum} onChange={onUserAuthNumHandler}></input><br />
                <button type="submit">새로운 비밀번호 생성</button>
            </form>
        </div>
    )
}

export default FindPwPage
