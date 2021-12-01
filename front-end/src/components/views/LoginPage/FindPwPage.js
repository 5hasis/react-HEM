import React, {useEffect, useState} from 'react'
import { EmailJSResponseStatus, init,send } from 'emailjs-com';



function FindPwPage() {

    const [email, setemail] = useState('')
    const [name, setname] = useState('')

    const onEmailHandler = (e) => {
        setemail(e.currentTarget.value)
    }
    
    const onNameHandler = (e) => {
        setname(e.currentTarget.value)
    }

    
    useEffect(() => {
        init(`${process.env.REACT_APP_MAIL_API_INIT}`);
      }, []);
     
    const emailParam = {
        to_name:name,
        to_email:email,
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(e.target)
        send(`${process.env.REACT_APP_MAIL_SERVICE_ID}`, `${process.env.REACT_APP_MAIL_TEMPLATE_ID}`, emailParam)
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form onSubmit={onSubmitForm}>
                이름 입력 : <input type='text' value={name} name='to_name' onChange={onNameHandler}></input><br /><br />
                이메일입력 : <input type='text' value={email} name='to_email' onChange={onEmailHandler}></input><br />
                <button type="submit">비밀번호 찾기</button>
            </form>
        </div>
    )
}

export default FindPwPage
