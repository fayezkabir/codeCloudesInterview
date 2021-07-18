import React from "react";
import styled from "styled-components";
import rain from "./../../assets/images/rainy.jfif";
import cloudy from "./../../assets/images/cloudy.jfif";
import sunny from "./../../assets/images/rainy.jfif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun , faCloudShowersHeavy , faSun } from '@fortawesome/free-solid-svg-icons';
import styles from "./weather.module.css"
import moment from "moment";
const Test = styled.div`
    background-image: url(${props => props.img === "rain" ? rain : (props.img === "cloudy" ? cloudy : sunny)});
    background-repeat: no-repeat;
    background-size: cover;  
    padding: 20px;
    border-radius: 8px;
`;


const WeatherCard = props => {
    console.log(props.data);
    const {
        cloudCover, humidity, windSpeed, summary, sunriseTime, sunsetTime, icon , temperature = 2 , time , temperatureHigh
    } = props.data;

    const convertFtoC = temp => {
        if(temp){
            return (temp - 32) * 5/9;
        }
    }

    return (
        <div className={styles.wrapper}>
            <Test img={icon}>
                <p className={styles.summary}>{summary}</p>
                <div className={[styles.FlexCb, styles.infoContainer].join(" ")}>
                    <div>
                        <p className={styles.temp}> {convertFtoC(temperatureHigh || temperature).toFixed(2)}&#176;c <span>{`${temperatureHigh ? '( max )' : ""}`}</span></p>
                        
                        <p className={styles.time}>{moment.unix(time).format("MMMM Do YYYY, h:mm:ss a")}</p>

                        <div className={styles.flexContainer}>
                            <div className={styles.info}>
                                <span>{humidity}</span>
                                <p>( humidity )</p>
                            </div>
                            <div className={styles.info}>
                                <span>{windSpeed}</span>
                                <p>( wind speed )</p>
                            </div>
                            <div className={styles.info}>
                                <span>{cloudCover}</span>
                                <p>( cloud cover )</p>
                            </div>
                            {
                                sunriseTime && (
                                    <div className={styles.info}>
                                        <span>{moment.unix(sunriseTime).format("MMMM Do YYYY, h:mm:ss a")}</span>
                                        <p>( sun rise at )</p>
                                    </div>
                                )
                            }
                            {
                                sunsetTime && (
                                    <div className={styles.info}>
                                        <span>{moment.unix(sunsetTime).format("MMMM Do YYYY, h:mm:ss a")}</span>
                                        <p>( sun set at )</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.weatherIcon}>
                        <FontAwesomeIcon color={"red"} icon={icon === "rain" ? faCloudShowersHeavy : (icon === "cloudy" ? faCloudSun : faSun)} />
                    </div>
                </div>
            </Test>
        </div>

    )
}

export default WeatherCard;