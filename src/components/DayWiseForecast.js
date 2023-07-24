import React from "react";
import './css/style.css'

const DayWiseForecast = (props) => {

     return ( 
       <div className="container-item">
        {console.log(props.day)}
          <div className="day">{props.day}</div>
          <div className="temp">{props.maxtTemperature}°C</div>
          <div className="temp">{props.minTemperature}°C </div>
        </div>
     );

}

export default DayWiseForecast;