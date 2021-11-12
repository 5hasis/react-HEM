import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory,useLocation} from 'react-router-dom'
import {updateReservationUser} from '../../../_actions/user_action';




function MyReservationInfo() {
    
    const dispatch=useDispatch();
    const location=useLocation();
    const reservation=location.state;
    
    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [RvDate, setRvDate] = useState("")
    const [RvHour, setRvHour] = useState(10)
    const [RvMinute, setRvMinute] = useState("00")
    const [RvNumber, setRvNumber] = useState(1)
    const [No, setNo] = useState(0)

    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }
    // const onPhoneHandler=(event)=>{
    //     setPhone(event.currentTarget.value)
    // }
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
   

    useEffect(() => {
        setNo(reservation.reservationNo)
        setName(reservation.reservationName)
        setPhone(reservation.reservationPhone)
        setRvHour(reservation.reservationTime.substring(0,2))
        setRvMinute(reservation.reservationTime.substring(3,5))
        setRvNumber(reservation.reservationPeople)
        
    }, [])

    let history = useHistory();
    const onSubmitHandler=(event)=>{
        event.preventDefault();


        let body={
            reservationNo:No,
            reservationName:Name,
            reservationDate:RvDate,
            reservationTime:RvHour+':'+RvMinute,
            reservationPeople:RvNumber,
        }

        dispatch(updateReservationUser(body))
        .then(response=>{
            
            if(response.payload){
                //console.log(memberNo)
                history.push("/reservationSuccess")
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
            <label>전화번호:{Phone}</label>
            
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
            <button type="submit">수정하기</button>
            {/* <button onClick={onReset}>Reset</button> */}
        </form>
    </div>
);
    
}
  

export default MyReservationInfo