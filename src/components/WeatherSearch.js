import React, { useState , useEffect} from "react";
import './css/style.css'

const WeatherSearch =(props)=>{

    const[city,setCity] = useState('');
    const[nameIsValid,setNameIsValid] = useState(false);
    const[formIsvalid,setFormIsValid] = useState(false);


    useEffect(()=>{
        setFormIsValid(nameIsValid);
    },[nameIsValid])


    const onChangeHandler = (event) =>{
      setCity(event.target.value);
      setNameIsValid(/^[a-zA-Z]+$/.test(event.target.value.trim()));
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        props.onSearchHandler(city);
        setCity('')
    }

     return <div className="search">
        <form onSubmit={onSubmitHandler}>
           <label>Enter City Name</label>
           <input type='text' onChange={onChangeHandler} value={city} ></input>
           <button type="submit" className="button" disabled={!formIsvalid}>Forecast Weather</button>
        </form> 
     </div>
}

export default WeatherSearch ;