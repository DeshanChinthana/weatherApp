import axios from "axios";

const url = process.env.REACT_APP_API
const api_key = process.env.REACT_APP_API_KEY

export const fetchWeatherData = (ids) => {
    return async (dispatch) => {
        dispatch({ type: "FETCH_WEATHER_DATA_START" });
        try {
            const params = {
                id: ids, units: 'metric', appid: api_key
            };

            const { data } = await axios.get(url, { params });

            dispatch({ type: "FETCH_WEATHER_DATA_SUCCESS", payload: data });

        } catch (error) {
            dispatch({
                type: "FETCH_WEATHER_DATA_FAIL", payload: error
            });
        }
    }
}
