import React from 'react'
import { Link } from 'react-router-dom'

function DeleteRestaurantSuccess() {
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
            <h1>지금까지 HEM을 사랑해주셔서 감사합니다!</h1>
            <br/>
            <div>
            <Link to="./"> 
                <button> 메인페이지 </button>&ensp;
            </Link>
            
            </div>
            



        </div>
    );
}

export default DeleteRestaurantSuccess
