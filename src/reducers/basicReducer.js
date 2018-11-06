import { ADD_PATH_TOOGLE_MODAL } from "../actions/types";

const INIT_STATE = {
    addPathModalOpenState: false,
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_PATH_TOOGLE_MODAL:
            return {
                ...state,
                addPathModalOpenState: !state.addPathModalOpenState,
            };
        default:
            return state;
    }
};