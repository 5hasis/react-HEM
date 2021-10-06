import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom'

function MyRestaurantInfo() {

    const location = useLocation();
    const myinfo = location.state;    
    console.log(myinfo)

    useEffect(() => {
        Axios.get(`/api/member/myinfo`, myinfo)
            .then(response => {
                if(response.data){
                    console.log(response.data)
                }
                else{
                    alert('식당 정보를 가져오는데 실패')
                }
            })
    }, [])

    return (
        <div>
            MyRestaurantInfo
        </div>
    )
}

export default MyRestaurantInfo
