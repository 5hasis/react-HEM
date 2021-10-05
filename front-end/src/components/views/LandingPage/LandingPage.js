import React, { useState, useEffect } from 'react';
import { Row, Button } from 'antd';
import GridCards from '../commons/GridCards';
import Axios from 'axios';

function LandingPage(){

    const [Restaurants, setRestaurants] = useState([])

    useEffect(() => {
        
        Axios.get('/api/member/list')
            .then(response => {
                if (response.data){
                    console.log(response.data)
                    setRestaurants(response.data)
                    console.log(Restaurants)
                }
                else{
                    alert('식당 리스트 출력 실패')
                }
            })

    }, [])

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Main Image */}


            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>맛집 둘러보기</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]} >

                    <GridCards Restaurants={Restaurants}/>
                    
                </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button> Load More</Button>
            </div>

        </div>
    )
}

export default LandingPage