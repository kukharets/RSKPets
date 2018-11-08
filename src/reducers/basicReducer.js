import { ADD_PATH_TOOGLE_MODAL, ADD_MARKER, ADD_DISTANCE, FETCH_TRAVELS, SELECT_TRAVEL, ADD_MARKER_REF } from "../actions/types";

const INIT_STATE = {
    addPathModalOpenState: false,
    markers: [],
    distance: 0,
    travels: [],
    selectedTravel: null,
    markersRefs: [],
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
            return {
                ...state,
                travels: Object.keys(action.payload).map(function(i) {
                    let newTravel = action.payload[i];
                    newTravel.key = i;
                    return newTravel
                })
            };
        case SELECT_TRAVEL:
            console.log("reducer select travel", action.payload)
            let { markersRefs } = state;
            if (markersRefs.length > 0) {
                for (let i = 0; i < markersRefs.length; i++){
                    markersRefs[i].setMap(null);
                }
            }
            return {
                ...state,
                selectedTravel: action.payload,
                markers: action.payload.markers || [],
            };
        case ADD_MARKER_REF:
            return {
                ...state,
                markersRefs: state.markersRefs.concat(action.payload),
            }
        default:
            return state;
    }
};