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
                alert("????????? ?????????????????????.")
            }
            
        })

        
    }


    return (
        
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <form style={{display:'flex',flexDirection:'column',width:'20%'}} onSubmit={onSubmitHandler}>
            <label>????????? ??????</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            <label>????????????:{Phone}</label>
            
            <label>?????? ??????</label>
            <input type="date" value={RvDate} onChange={onRvDateHandler}/>     
            <label>?????? ??????</label>
            <div> 
            <input type="number" value={RvHour} style={{width:'45px'}} min={10} max={23} onChange={onRvHourHandler}/> ???&ensp;
            <input type="number" value={RvMinute} style={{width:'45px'}} min={0} max={59} onChange={onRvMinuteHandler}/> ???
            </div>
            <label>?????? ???</label>
            <input type="number" value={RvNumber} min={1} onChange={onRvNumberHandler}/>
            
            <br/>
            <button type="submit">????????????</button>
            {/* <button onClick={onReset}>Reset</button> */}
        </form>
    </div>
);
    
}
  

export default MyReservationInfo