import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

function LoginPage(props){

    const dispatch = useDispatch();

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const cookies = new Cookies();
    const cookiesMember = new Cookies();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            memberId: Id,
            memberPw: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.accessToken) {
                    console.log(response.payload)
                    cookies.set('accessToken', response.payload.accessToken, { 
                        path: '/',
                        //expires: Math.floor(new Date(Date.parse(new Date) +1000 *60 *60) ),
                        maxAge:3600,
                        sameSite: 'strict',
                    });
                    //window.localStorage.setItem('accessToken', response.payload.accessToken);
                    cookiesMember.set('memberNo',response.payload.memberNo,{
                        path:'/',
                        maxAge:3600,
                        sameSite:'strict'
                    })
                    props.history.push('/')
                }
            }, error => {
                if(error.response.status === 401){
                    alert('일치하는 로그인 정보가 없습니다')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler} >
                <label>Id</label>
                <input type="text" value={Id} onChange={onIdHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
                <div style={{ display: 'flex', flexDirection: 'row',justifyContent: 'center', marginTop:'1rem' }}>
                <a href={'/login/findid'} style={{color:'black'}}>아이디 찾기</a>
                &nbsp;|&nbsp;
                <a href={'/login/findpw'} style={{color:'black'}}>비밀번호 찾기</a>
                </div>
            </form>
            
            
            
            
        </div>
    )
}

export default withRouter(LoginPage)