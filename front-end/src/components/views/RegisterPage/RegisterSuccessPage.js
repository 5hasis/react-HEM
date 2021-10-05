import React from 'react';
import { Link } from 'react-router-dom'



function RegisterSuccessPage() {
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
            <h1>회원가입을 축하드립니다!</h1>
            <br/>
            <div>
            <Link to="./lending"> 
                <button> 메인페이지 </button>&ensp;
            </Link>
            <Link to="./login"> 
                <button> 로그인하기 </button>
            </Link>
            </div>
            



        </div>
);
}

export default RegisterSuccessPage