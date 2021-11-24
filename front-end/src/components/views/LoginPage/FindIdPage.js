import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { findID } from '../../../_actions/user_action';

function FindIdPage(props) {

    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")

    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }
    const onPhoneHandler=(event)=>{
        setPhone(event.currentTarget.value)
    }
    
    const dispatch = useDispatch();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            memberName: Name,
            memberPhone: Phone
        }

        dispatch(findID(body))
            .then(response => {
                console.log(response)
                if (response.payload) {
                    // console.log(response.payload)
                    alert("아이디는 "+ response.payload.memberId+" 입니다.")
                    props.history.push('/login')
                }
            }, error => {
                if(error.response.status === 401){
                    alert('일치하는 정보가 없습니다')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler} >
                <label>Name (Trade name)</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Phone</label>
                <input type="text" value={Phone} onChange={onPhoneHandler}/>
                <br />
                <button type="submit">
                    아이디 찾기
                </button>
            </form>
            
            
            
            
        </div>
    )
}

export default FindIdPage
