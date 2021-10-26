import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import PopupDom from '../RegisterPage/PopupDom';
import PopupPostCode from '../RegisterPage/PopupPostCode';
import {updateUser} from '../../../_actions/user_action';

function MyRestaurantInfo() {

    const location = useLocation();
    const member = location.state; 
    //console.log('member = ',member)

    //const [MyInfo, setMyInfo] = useState('')
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('')
    const [FirstAddress, setFirstAddress] = useState("")
    const [Address, setAddress] = useState('')
    const [Id, setId] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {

        Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
        Axios.get(`/api/member/myinfo`, member)
            .then(response => {

                if(response.data){
                    //console.log(response.data)
                    //setMyInfo(response.data)
                    setName(response.data.memberName)
                    setPhone(response.data.memberPhone)
                    setAddress(response.data.memberAddress)
                    setId(response.data.memberId)
                    //setPassword(response.data.memberPw)
                }
                else{
                    alert('식당 정보를 가져오는데 실패')
                }
                
            })
    }, [])


    const [setText] = useState('');
   
    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    
    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
    
    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    
    const getAddress = (data) => {
        setFirstAddress(data);
        setAddress('')
    }

    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }
    const onPhoneHandler=(event)=>{
        setPhone(event.currentTarget.value)
    }
    
    const onAddressHandler=(event)=>{
        setAddress(event.currentTarget.value)
    }
    
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler=(event)=>{
        setConfirmPassword(event.currentTarget.value)
    }

    //만들어둔 action을 useDispath를 통해 발생시킴
    const dispatch=useDispatch();
    let history = useHistory();
    
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    
            if(Password!==ConfirmPassword){
                return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
            }
    
            let body={
                memberName:Name,
                memberPhone:Phone,
                memberAddress:FirstAddress+Address,
                memberPw:Password
            }

            dispatch(updateUser(body))
            .then(response=>{
                
                if(response.payload){
                    history.push("/")
                }else{
                    alert("Failed to update")
                }
                
            })
    }

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <form style={{display:'flex',flexDirection:'column',width:'20%'}} onSubmit={onSubmitHandler}>
            <label>Name (Trade name)</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            <label>Phone</label>
            <input type="text" value={Phone} onChange={onPhoneHandler}/>
            <label>Address</label>
            <div>
            <button type='button' onClick={openPostCode}>Zip Code</button>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} getAddress={getAddress} />
                    </PopupDom>
                )}
            </div>
            </div>
            <input type="text" defaultValue={FirstAddress} />
            <input type="text" placeholder="Detail Address" value={Address} onChange={onAddressHandler}/>            
            <label>ID : {Id} </label>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br/>
            <button type="submit">Update</button>
            
        </form>
        </div>
    )
}

export default MyRestaurantInfo
