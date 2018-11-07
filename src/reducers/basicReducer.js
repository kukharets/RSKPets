import { ADD_PATH_TOOGLE_MODAL, ADD_MARKER, ADD_DISTANCE, FETCH_TRAVELS } from "../actions/types";

const INIT_STATE = {
    addPathModalOpenState: false,
    markers: [],
    distance: 0,
    travels: [],
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_PATH_TOOGLE_MODAL:
            return {
                ...state,
                addPathModalOpenState: !state.addPathModalOpenState,
                distance: 0,
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
                travels: action.payload,
            };
        default:
            return state;
    }
};