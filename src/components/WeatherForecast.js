import React, { useState } from "react";
import WeatherSearch from "./WeatherSearch";
import {DotLoader} from "react-spinners"
import axios from "axios";
import DayWiseForecast from "./DayWiseForecast";
import './css/style.css'

const WeatherForecast = () =>{

    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState([{}]);
    const [first,setFirst] = useState(false);
    const [town,setTown] = useState('');
    const [error,setError] = useState(false);

    const onSearchHandler = (city) =>{
        setIsLoading(true);
        setError(false);
        setTown(city);
        axios.get(`http://localhost:8081/weather/weatherForecast?cityName=${city}&metricUnit=metric`,{
            headers:{
               transactionId: new Date().getTime().toString()
            }
       }
     ).then((response) => {
        setFirst(true);
        setIsLoading(false);
        setError(false);
        setData(response.data.dayWiseDetailsList);
        console.log(response.data);
    }).catch((error)=>{
      console.log(error);
      setError(true);
      setIsLoading(false);
      setFirst(false);
    })
    // setSearch('')
    setData([{}])
  
    }

    return(

        <div className="app">
          <WeatherSearch onSearchHandler={onSearchHandler}/> 
          {
             error ? <div className="error">The city name is invalid</div> : null 
          }  
           <div className="townDisplay">
               {(!isLoading&!error)?<h1>{town}</h1>:null}
           </div>    
            {
              <div className="loader">
                {
                  isLoading ? 
                    <DotLoader 
                        size = {80}
                        loading={true}
                        color = {"#36d7b7"}
                    /> : null 
                }
              </div>
            }
            <div className="container">
                {
                      (first&&!isLoading) ?
                      data.map(
                      daywiseData=>{
                        return <DayWiseForecast 
                          kay = {Math.random().toString}
                          day = {daywiseData.day }
                          maxtTemperature = {daywiseData.maxTemperature}
                          minTemperature = {daywiseData.minTemperature}
                        />  
                      }
                    ) :null
                }
            </div>
        </div>
    )
}

export default WeatherForecast;