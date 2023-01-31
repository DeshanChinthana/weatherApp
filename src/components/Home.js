import React, { useEffect } from 'react';
import cities from '../cities/cities.json';
import City from './City';
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData } from '../actions/weatherActions';

// get CityCode from cities.json and iterate. Then push data to empty array 
const ids = [];

cities.List.map((cCode) => (
    ids.push(cCode.CityCode)
))

function Home() {

    const dispatch = useDispatch();
    const { data, loading, error, timestamp } = useSelector((state) => state);

    // const city = cities.List;
    // const [ids, setIds] = useState([]);

    // useEffect(() => {
    //     city.map((cCode) => (
    //         setIds(current => [...current, cCode.CityCode])
    //     ))
    // }, [city])

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