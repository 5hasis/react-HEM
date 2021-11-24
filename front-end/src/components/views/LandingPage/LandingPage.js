import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';

import Axios from 'axios';

const {Title} = Typography

function LandingPage(){

    const [Restaurants, setRestaurants] = useState([])
    const [MemberList, setMemberList] = useState([1])
    const [Name, setName]=useState('')
    const [btnState, setbtnState] = useState('Name')
    
    const OPTIONS = [
        { value: "name", name: "이름으로 찾기" },
        { value: "place", name: "위치로 찾기" },

    ];
 
    const SelectBox = (props) => {
        const handleChange = (e) => {
            // event handler
           //console.log(e.target.value);
           if(e.target.value === 'name'){
               //console.log("이름으로 검색")
               setbtnState('Name')
              
           }
           else{
               //console.log("주소로 검색")
               setbtnState('Address')
           }
        };
    
        return (
            <select onChange={handleChange}>
                {props.options.map((option) => (
                    <option
                    key={option.value}
                    value={option.value}
					defaultValue={props.defaultValue === option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
            
        );
    };


    const NameHandler=(e)=>{
        setName(e.currentTarget.value)
       
    }

    function searchBy() {
        console.log(btnState)
        Axios.get(`/api/member/${btnState}/${Name}`)
            .then(response => {
                if(response.data){
                    console.log(response.data)
                    setMemberList(response.data)

                }
                else{
                    alert('예약 정보를 가져오는데 실패')
                }
            })
        
        }

            
    useEffect(() => {
        
        Axios.get('/api/member/list')
            .then(response => {
                if (response.data){
                    console.log(response.data)
                    setRestaurants(response.data)
                   

                }
                else{
                    alert('식당 리스트 출력 실패')
                }
            })

    }, [])
    const renderCards2 = MemberList.map((restaurant, index) => {
        //console.log(restaurant)
        return <Col lg={6} md={8} xs={24} key={index}>
            <a href={`/restaurant/${restaurant.memberNo}`}>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                {restaurant.memberName}<br/>
                {restaurant.memberAddress}

                </div>
            </a>
            <br />
            
        </Col>
    })

    const renderCards = Restaurants.map((restaurant, index) => {
        //console.log(restaurant)
        
        
        return( 
          
            
        <Col lg={6} md={8} xs={24} key={index}>

            <a href={`/restaurant/${restaurant.memberNo}`}>
                <div style={{position:'relative', border:'1px solid rgb(232,232,232)',textAlign:'center', padding:'15px 0'}}>
                {restaurant.memberName}<br/>
                {restaurant.memberAddress}

                </div>
            </a>
            <br />
            {/* <Meta 
                avatar={ //동그라미 user이미지
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description="" />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span> - 
            <span> {moment(video.createdAt).format("MMM Do YY")} </span> */}
        </Col>
     
        )
        
    })

console.log(MemberList)
    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>맛집 둘러보기</Title>
            <div>
            <SelectBox options={OPTIONS} defaultValue="name"></SelectBox>&ensp;&ensp;
                <input type="text" onChange={NameHandler}></input>
                
                <button onClick={searchBy}>Search</button>

                

            </div>
            <hr />
            
            <Row gutter={[32,16]}>

                {renderCards2}
                
            </Row>
        
            {
                MemberList[0] === 1
                ?(
                <Row gutter={[32,16]}>
                {renderCards}
                
            </Row>)
            : MemberList.length === 0
                ?(
                    <Row gutter={[32,16]}>
                     <div style={{width:'100%', textAlign:'center'}}><h1>검색 결과가 없습니다.</h1></div>

                
                {renderCards}
                
                
            </Row>
                )
                :null
            }
            


        </div>
    )
}

export default LandingPage