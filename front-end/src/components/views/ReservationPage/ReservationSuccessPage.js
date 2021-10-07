import React from 'react';
import { Link } from 'react-router-dom'



function ReservationSuccessPage() {
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
            <h1>예약이 완료되었습니다.</h1>
            <br/>
            <div>
            <Link to="./"> 
                <button> 메인페이지 </button>&ensp;
            </Link>
            </div>
            



        </div>
);
}

export default ReservationSuccessPage