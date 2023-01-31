const cacheMiddleware = (store) => (next) => (action) => {
    if (action.type === "FETCH_WEATHER_DATA") {

        // Check if data is already stored in localStorage
        const cachedData = localStorage.getItem("weatherData");
        const cachedTimestamp = localStorage.getItem("weatherTimestamp");
        if (cachedData && (Date.now() - cachedTimestamp < 300000)) { // refresh in 5min
            return next({ type: "FETCH_WEATHER_DATA_CACHED", payload: JSON.parse(cachedData) });
        }

        // Otherwise, continue with the fetch and store the data and timestamp in localStorage
        return next(action).then((result) => {
            localStorage.setItem("weatherData", JSON.stringify(result.payload)); // set weather data after converting the payload object to a sting. 
            localStorage.setItem("weatherTimestamp", Date.now());
            return result;
        });

    }
    return next(action);
};

export default cacheMiddleware