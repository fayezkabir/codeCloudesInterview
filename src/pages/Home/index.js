import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios-config";
import WeatherCard from "../../components/WeatherCard";
import styles from "./home.module.css";


const Home = (props) => {
    const [weatherData, setWeatherData] = useState({});
    const [filterOption, setFilterOption] = useState("weekly");
    const [errorMsg, setErrorMsg] = useState("");
    const [noofCards, setNoofCard] = useState(6);

    useEffect(() => {
        if (navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition, showError);
        }
    }, []);

    //fetching the data based on geolocation
    const setPosition = async position => {
        try {
            const { data } = await axiosInstance.get(`${position.coords.latitude},${position.coords.longitude}`);
            console.log(data);
            setWeatherData(data);
            setNoofCard(6);
            setFilterOption("weekly");
        }
        catch (err) {
            console.error(err)
        }
    };

    //if user don't allow the geolocation then this block of code will be executed
    const showError = err => {
        setErrorMsg(err);
    }

    const handleFiltterChange = event => {
        setFilterOption(event.target.value);
    }

    const handleNumberOfCardRender = _ => {
        let tempNumerofCards = noofCards;
        if (tempNumerofCards <= 42) {
            tempNumerofCards += 6;
        }
        setNoofCard(tempNumerofCards);
    }
    //handleiing different city change
    const handleGeolocationChange = position => {
        const coordinates = position.target.value.split(",");
        const tempCoords = {
            coords: {
                latitude: coordinates[0],
                longitude: coordinates[1]
            }
        }
        setPosition(tempCoords)
    }

    return (
        <div>
            {
                errorMsg ?
                    <p className={styles.errMsg}>Please grant permission to see the Weather Report</p>
                    :
                    !weatherData ? (
                        <p className={styles.errMsg}> Oops! something went wrong</p>
                    ) : (
                        <div className={styles.gridContainer}>
                            <div className={styles.current}>
                                {
                                    weatherData.currently && (
                                        <WeatherCard data={weatherData.currently} />
                                    )
                                }
                            </div>
                            {
                                (weatherData?.hourly || weatherData?.daily) && (
                                    <>
                                        <div className={[styles.select, styles.filter].join(" ")}>
                                            <select name="city" onChange={(e) => handleGeolocationChange(e)}>
                                                <option selected value="">Choose a city</option>
                                                <option value="28.644800,77.216721">Delhi</option>
                                                <option value="13.067439,80.237617">Chennai</option>
                                                <option value="15.496777,73.827827">Goa</option>
                                                <option value="12.972442,77.580643">Bangalore</option>
                                                <option value="19.076090,72.877426">Mumbai</option>
                                            </select>
                                        </div>
                                        <div className={[styles.select, styles.filkter].join(" ")}>
                                            <select name="weatherFilter" value={filterOption} onChange={(e) => handleFiltterChange(e)}>
                                                <option disabled >Choose an option</option>
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                            </select>
                                        </div>
                                    </>
                                )
                            }
                            {
                                filterOption === "daily" ?
                                    weatherData?.hourly && weatherData.hourly.data.map((data, index) => index + 1 <= noofCards && <WeatherCard data={data} key={index} />)
                                    :
                                    weatherData?.daily && weatherData.daily.data.map((data, index) => <WeatherCard data={data} key={index} />)
                            }
                            {
                                filterOption === "daily" &&
                                <button disabled={noofCards === 48} onClick={handleNumberOfCardRender}>{noofCards < 48 ? "Show More" : "no more card left"}</button>
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default Home;