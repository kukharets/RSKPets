import { ADD_PATH_TOOGLE_MODAL, ADD_MARKER, ADD_DISTANCE, FETCH_TRAVELS, SELECT_TRAVEL, ADD_MARKER_REF, FILTER_TRAVELS } from "../actions/types";

const INIT_STATE = {
    addPathModalOpenState: false,
    markers: [],
    distance: 0,
    travels: [],
    selectedTravel: null,
    mapsRefs: [],
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
            const travels = action.payload ? Object.keys(action.payload).map(function(i) {
                let newTravel = action.payload[i];
                newTravel.key = i;
                return newTravel
            }) : []
            return {
                ...state,
                travels: travels
            };
        case SELECT_TRAVEL:
            console.log("reducer select travel", action.payload)
            let { mapsRefs } = state;
            if (mapsRefs.length > 0) {
                for (let i = 0; i < mapsRefs.length; i++){
                    mapsRefs[i].setMap(null);
                }
            }
            return {
                ...state,
                selectedTravel: action.payload,
                markers: action.payload.markers || [],
                mapsRefs: [],
            };
        case ADD_MARKER_REF:
            return {
                ...state,
                mapsRefs: state.mapsRefs.concat(action.payload),
            }
        case FILTER_TRAVELS:
            let existedTravels = state.travels;
            let finded = [];
            for (let i = 0; i < existedTravels.length; i++){
                const current = existedTravels[i];
                let inTitleExist = current.title ? current.title.includes(action.payload + "") : false;
                let inDescriptionExist = current.description ? current.description.includes(action.payload) : false;
                if (inTitleExist || inDescriptionExist){
                    finded.push(current)
                }
            }
            console.log("filter travels,", state)
            return {
                ...state,
                travels: finded
            };
        default:
            return state;
    }
};