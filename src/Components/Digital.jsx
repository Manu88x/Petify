import react,{useEffect, useState, UseState} from "react"

function Digital(){
const[time,setTime]=useState(new Date())

useEffect(()=>{
const intervalid= setInterval(()=> {
    setTime(new Date())
},1000);

return(()=>
clearInterval(intervalid)
)

},[])


function formatTime(){
let hours=time.getHours()
let minutes=time.getMinutes()
let seconds=time.getSeconds()
const meridiem= hours >= 12 ? "PM" : "AM";

hours = hours % 12 || 12;
 
return`${padZero(hours)} : ${padZero(minutes)} : ${padZero(seconds)}: ${meridiem}`
}


function padZero(number){
return( number < 10 ? "0" : "") + number
}

    return(
      <div className="Clock-container"  >
<div className="Clock" >
<span>{formatTime()}</span>
</div>
      </div>  
    )
}


export default Digital