const cacheMiddleware = (store) => (next) => (action) => {

    if (action.type === "FETCH_WEATHER_DATA") {
        const state = store.getState();
        if (state.data && Date.now() - state.timestamp < 300000) { // refresh in 5min
            return next({ type: "FETCH_WEATHER_DATA_CACHED", payload: state.data });
        }
    }

    return next(action);

};

export default cacheMiddleware