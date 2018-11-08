import { ADD_PATH_TOOGLE_MODAL, ADD_MARKER, ADD_DISTANCE, FETCH_TRAVELS, SELECT_TRAVEL } from "../actions/types";

const INIT_STATE = {
    addPathModalOpenState: false,
    markers: [],
    distance: 0,
    travels: [],
    selectedTravel: null,
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_PATH_TOOGLE_MODAL:
            return {
                ...state,
                addPathModalOpenState: !state.addPathModalOpenState,
                distance: 0,
                markers: [],
            };
        case ADD_MARKER:
            const { markers } = state;
            return {
                ...state,
                markers: markers.concat(action.payload),
            };
        case ADD_DISTANCE:
            const { distance } = state;
            return {
                ...state,
                distance: distance + action.payload,
            };
        case FETCH_TRAVELS:
            console.log("FETCH TRAVELS", action.payload)
            return {
                ...state,
                travels: Object.keys(action.payload).map(function(i) { return action.payload[i] })
            };
        case SELECT_TRAVEL:
            console.log("reducer select travel", action.payload)
            return {
                ...state,
                selectedTravel: action.payload,
                markers: action.payload.markers || [],
            }
        default:
            return state;
    }
};