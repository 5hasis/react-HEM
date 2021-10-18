import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {reservationUser} from '../../../_actions/user_action';




function ReservationPage(props) {
    
    const memberNo = props.match.params.restaurantNo
    
    const dispatch=useDispatch();

    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [RvDate, setRvDate] = useState("")
    const [RvHour, setRvHour] = useState(10)
    const [RvMinute, setRvMinute] = useState("00")
    const [RvNumber, setRvNumber] = useState(1)


    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }
    const onPhoneHandler=(event)=>{
        setPhone(event.currentTarget.value)
    }
    const onRvDateHandler=(event)=>{
        setRvDate(event.currentTarget.value)
    }
    const onRvHourHandler=(event)=>{
        setRvHour(event.currentTarget.value)
    }
    const onRvMinuteHandler=(event)=>{
        setRvMinute(event.currentTarget.value)
    }
    const onRvNumberHandler=(event)=>{
        setRvNumber(event.currentTarget.value)
    }


   

    const onSubmitHandler=(event)=>{
        event.preventDefault();


        let body={
            reservationName:Name,
            reservationPhone:Phone,
            reservationDate:RvDate,
            reservationTime:RvHour+':'+RvMinute,
            reservationPeople:RvNumber,
            memberMemberNo:memberNo
        }

        dispatch(reservationUser(body))
        .then(response=>{
            
            if(response.payload.reservationSuccess){
                console.log(memberNo)
                props.history.push("/reservationSuccess")
            }else{
                alert("예약을 실패하였습니다.")
            }
            
        })

        
    }


    return (
        
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <form style={{display:'flex',flexDirection:'column',width:'20%'}} onSubmit={onSubmitHandler}>
            <label>예약자 이름</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            <label>전화번호</label>
            <input type="text" value={Phone} onChange={onPhoneHandler}/>
            <label>예약 날짜</label>
            <input type="date" value={RvDate} onChange={onRvDateHandler}/>     
            <label>예약 시간</label>
            <div> 
            <input type="number" value={RvHour} style={{width:'45px'}} min={10} max={23} onChange={onRvHourHandler}/> 시&ensp;
            <input type="number" value={RvMinute} style={{width:'45px'}} min={0} max={59} onChange={onRvMinuteHandler}/> 분
            </div>
            <label>인원 수</label>
            <input type="number" value={RvNumber} min={1} onChange={onRvNumberHandler}/>
            
            <br/>
            <button type="submit">예약하기</button>
            {/* <button onClick={onReset}>Reset</button> */}
        </form>
    </div>
);
    
}
  

export default ReservationPage