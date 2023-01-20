import React from 'react'
import { useQuery } from 'react-query'
import cities from '../cities/cities.json';
import City from './City';

const api_key = process.env.REACT_APP_API_KEY
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

// get data from api
const fetchData = () => fetch(`https://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${api_key}`).then(res => res.json());

function Home() {
    const { isLoading, error, data } = useQuery({
        queryKey: 'weatherData',
        queryFn: fetchData,
        refetchInterval: 300000 // refresh in 5 minutes
    });

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            {/*
                this is for main component
            */}

            <City
                obj={data.list}
            />

        </div>
    )

}

export default Home;