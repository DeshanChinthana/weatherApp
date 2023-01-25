const initialState = {
    data: null,
    loading: false,
    error: null,
    timestamp: null
};

export default function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_WEATHER_DATA_START":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "FETCH_WEATHER_DATA_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
                timestamp: Date.now()
            };
        case "FETCH_WEATHER_DATA_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
