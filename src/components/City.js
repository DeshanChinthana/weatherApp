import React, { useEffect, useRef, useState } from 'react';
import './../App.css';
import cities from '../cities/cities.json';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FilterDramaOutlinedIcon from '@mui/icons-material/FilterDramaOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
// import axios from 'axios';
import { Button, FormGroup, Grid, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import moment from 'moment/moment';
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

// set date, time format for current time and date
const adjustForTimezone = (timezone) => {
    const timezoneInMinutes = timezone / 60;
    const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A, MMM DD");
    return currTime;
}

// set time format for sunrise, sunset
const setTimeNew = (timezone) => {
    const timezoneInMinutes = timezone / 60;
    const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
    return currTime;
}

// set 1st letter to UpperCase
const capitalizeWords = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Default color for Unknown or Default weather
const weatherDefaultHc = '#1864b3';

function City({ obj }) {

    // for close city card
    const [cityArr, setCities] = useState(() => obj);

    // for search city
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [isActive, setIsActive] = useState(false);

    // for pseudo elements func
    const parentRef = useRef(null);


    // City search
    const cityList = cities.List;

    useEffect(() => {
        setFilterData(
            cityList.filter((city) => city.CityName.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search, cityList])

    const showList = event => {
        // toggle isActive state on click
        setIsActive(current => !current);
    };

    // for pseudo elements ref
    useEffect(() => {
        const children = parentRef.current.children;
        const lastChild = children[children.length - 1];
        lastChild.classList.add('last-child');
    }, []);

    // close city card
    const removeCity = (index) => {
        const copy = [...cityArr]; // Spread operator is used to spread an iterable (such as an array or object) into separate elements or properties.
        copy.splice(index, 1); // remove item by index
        setCities(copy); // set updated city list after removing index
    }

    return (

        <>
            <Grid container className='content-center'>

                <Grid item xs={12} md={12} className='container-inner-top'>

                    <Grid item className='top-sec'>
                        <WbSunnyIcon className='head-icon' />
                        <Typography className='heading-top'>Weather App</Typography>
                    </Grid>

                    <Grid item className='search-grid'>
                        <FormGroup row sm={6} md={8} className='search-group'>

                            <input type='text' placeholder='Enter a City' className='search-bar'
                                onKeyDown={() => {
                                    showList();
                                }}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                            <ul className={isActive ? 'city-list-drop-down show' : 'city-list-drop-down'}>
                                {filterData.length === 0 ? <li>City not found.</li> : filterData.map((val) => {
                                    return <li key={val.CityCode}>{val.CityName}</li>
                                })}
                            </ul>

                            <Button variant='contained' className='search-btn'>
                                Add City
                            </Button>
                        </FormGroup>
                    </Grid>

                </Grid>

                <Grid item xs={12} md={12} className='container-inner-mid'>

                    <Grid item xs={12} md={10} className='grid-cont-outer margin-remove'>

                        <Grid container row>
                            {cityArr.map((city, index) =>
                                <Grid item xs={12} sm={12} md={6} className='cardOuter' key={city.name}>

                                    {/* <Link to='CitySingle' relative="path" style={{ textDecoration: 'none' }}> */}

                                    <div className='weather'>
                                        <div className='close-btn'><CloseIcon color='white' onClick={() => removeCity(index)} /></div>
                                        <div className='top' style={{
                                            backgroundColor: `${city.weather[0].description === 'clear sky' ? '#de944e' :
                                                city.weather[0].description === 'few clouds' ? '#40b681' :
                                                    city.weather[0].description === 'scattered clouds' ? '#6eaced' :
                                                        city.weather[0].description === 'broken clouds' ? '#6249cc' :
                                                            city.weather[0].description === 'shower rain' ? '#33227c' :
                                                                city.weather[0].description === 'rain' ? '#4c3c8f' :
                                                                    city.weather[0].description === 'thunderstorm' ? '#45338f' :
                                                                        city.weather[0].description === 'snow' ? '#786da5' :
                                                                            city.weather[0].description === 'mist' ? '#6e6887' :
                                                                                city.weather[0].description === weatherDefaultHc
                                                }`
                                        }}>
                                            <div>
                                                <p className='city'>{city.name}, {city.sys.country}</p>
                                                <p className='weather-description'>{adjustForTimezone(city?.sys?.timezone)}</p>

                                                <div className='weather-description weather-stat position-rel'>

                                                    <img src={require(`./../../public/icons/${city.weather[0].icon}.png`)} className='push-up-i' alt='weather' />

                                                    <p className='push-up'>{capitalizeWords(city.weather[0].description)}</p>
                                                </div>
                                            </div>
                                            <div className='temp-box'>
                                                <p className='temperature'>{Math.round(city.main.temp)}&deg;C</p>
                                                <p className='min-max-temp position-rel'><span className='push-min-temp'>Temp Min: {Math.round(city.main.temp_min)}&deg;C</span></p>
                                                <p className='min-max-temp text-align-force-center position-rel'><span className='push-max-temp'>Temp Max: {Math.round(city.main.temp_max)}&deg;C</span></p>
                                            </div>
                                        </div>
                                        <div className='bottom'>

                                            <div className='details divider-custom' ref={parentRef}>
                                                <div className='details-col'>
                                                    <div className='parameter-row-start'>
                                                        <span className='parameter-label'>Pressure:&nbsp;</span>
                                                        <span className='parameter-value'>
                                                            {city.main.pressure}hPa
                                                        </span>
                                                    </div>
                                                    <div className='parameter-row-start'>
                                                        <span className='parameter-label'>Humidity:&nbsp;</span>
                                                        <span className='parameter-value'>
                                                            {city.main.humidity}%
                                                        </span>
                                                    </div>
                                                    <div className='parameter-row-start'>
                                                        <span className='parameter-label'>Visibility:&nbsp;</span>
                                                        <span className='parameter-value'>
                                                            {(city.visibility / 1000).toFixed(1)}km
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='details-col divider last-divider'>
                                                    <div className='parameter-row-center'>
                                                        <span className='parameter-label'><NearMeOutlinedIcon /></span>
                                                    </div>
                                                    <div className='parameter-row-center'>
                                                        <span className='parameter-value'>{city.wind.speed} m/s {city.wind.deg} <span className='f-weight-500'>Degree</span></span>
                                                    </div>
                                                </div>
                                                <div className='details-col'>
                                                    <div className='parameter-row-end'>
                                                        <span className='parameter-label'>Sunrise:&nbsp;</span>
                                                        {/* API sunset and sunrise value were shifted??? */}
                                                        <span className='parameter-value'>{setTimeNew(city.sys.sunset)}</span>
                                                    </div>
                                                    <div className='parameter-row-end'>
                                                        <span className='parameter-label'>Sunset:&nbsp;</span>
                                                        {/* API sunset and sunrise value were shifted??? */}
                                                        <span className='parameter-value'>{setTimeNew(city.sys.sunrise)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* </Link> */}

                                </Grid>
                            )}
                        </Grid>

                    </Grid>

                </Grid>

                <Grid item xs={12} md={12} className='container-inner-mid'>

                    <Grid item xs={12} md={10} className='grid-cont-outer-city cardOuter margin-remove'>

                        <div className='weather-city'>
                            <div className='back-arrow-btn'><ArrowBackOutlinedIcon color='white' /></div>
                            <div className='top-city'>
                                <div>
                                    <p className='city'>Colombo, LK</p>
                                    <p className='weather-description f-weight-400'>10.06pm, Jan 18</p>
                                </div>
                            </div>
                            <div className='top-city top-city-mid' ref={parentRef}>
                                <div className=''>
                                    <p className='weather-description'>
                                        <span className='push-up-i-city'><FilterDramaOutlinedIcon /></span>
                                    </p>
                                    <p className='weather-description weather-stat weather-stat-city position-rel'>
                                        <span className='push-up-city'>Few Clouds</span>
                                    </p>
                                </div>
                                <div className='divider-city-top'>
                                    <p className='temperature temp-city'>22°C</p>
                                    <p className='min-max-temp temp-min-city position-rel'><span className='push-min-temp-city'>Temp Min: 21&deg;C</span></p>
                                    <p className='min-max-temp temp-max-city text-align-force-center position-rel'><span className='push-max-temp-city'>Temp Max: 27&deg;C</span></p>
                                </div>
                            </div>
                            <div className='bottom'>

                                <div className='details divider-custom' ref={parentRef}>
                                    <div className='details-col'>
                                        <div className='parameter-row-start'>
                                            <span className='parameter-label'>Pressure:&nbsp;</span>
                                            <span className='parameter-value'>
                                                1015hPa
                                                {/* {Math.round(22.3)}°C */}
                                            </span>
                                        </div>
                                        <div className='parameter-row-start'>
                                            <span className='parameter-label'>Humidity:&nbsp;</span>
                                            <span className='parameter-value'>
                                                70%
                                            </span>
                                        </div>
                                        <div className='parameter-row-start'>
                                            <span className='parameter-label'>Visibility:&nbsp;</span>
                                            <span className='parameter-value'>
                                                6.1km
                                            </span>
                                        </div>
                                    </div>
                                    <div className='details-col divider-city last-divider-city'>
                                        <div className='parameter-row-center'>
                                            <span className='parameter-label'><NearMeOutlinedIcon /></span>
                                        </div>
                                        <div className='parameter-row-center'>
                                            <span className='parameter-value'>10.6 m/s 88&deg; <span className='f-weight-500'>Degree</span></span>
                                        </div>
                                    </div>
                                    <div className='details-col'>
                                        <div className='parameter-row-end'>
                                            <span className='parameter-label'>Sunrise:&nbsp;</span>
                                            <span className='parameter-value'>6.10AM</span>
                                        </div>
                                        <div className='parameter-row-end'>
                                            <span className='parameter-label'>Sunset:&nbsp;</span>
                                            <span className='parameter-value'>6.01PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Grid>

                </Grid>

                <Grid item xs={12} md={12} className='container-inner-bottom'>
                    <Typography className='footerText'>2023 Fidenz Technologies</Typography>
                </Grid>

            </Grid >
        </>



    );
}

export default City;