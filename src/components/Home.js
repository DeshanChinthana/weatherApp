import React, { useEffect } from 'react';
import cities from '../cities/cities.json';
import City from './City';
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData } from '../actions/weatherActions';

const ids = [
    cities.List[0].CityCode,
    cities.List[1].CityCode,
    cities.List[2].CityCode,
    cities.List[3].CityCode,
    cities.List[4].CityCode,
    cities.List[5].CityCode,
    cities.List[6].CityCode,
    cities.List[7].CityCode
];

function Home() {

    const dispatch = useDispatch();
    const { data, loading, error, timestamp } = useSelector((state) => state);

    useEffect(() => {
        if (!data || Date.now() - timestamp > 300000) {
            dispatch(fetchWeatherData(ids.toString()));
        }
        // eslint-disable-next-line
    }, [ids, data, dispatch, timestamp]);

    if (loading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            {!loading &&
                <City
                    obj={data?.list}
                />
            }
        </div>
    )

}

export default Home;