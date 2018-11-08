import { travelsRef } from "../config/firebase";
import { ADD_PATH_TOOGLE_MODAL, ADD_MARKER, ADD_DISTANCE, FETCH_TRAVELS, SELECT_TRAVEL, ADD_MARKER_REF, FILTER_TRAVELS, DELETE_TRAVEL } from "./types";

export const addTravel = newTravel => async dispatch => {
    travelsRef.push().set(newTravel);
};

export const deleteTravel = travelId => async dispatch => {
    travelsRef.child(travelId).remove();
    dispatch({
        type: DELETE_TRAVEL,
        payload: travelId,
    });
};

export const addToFavorite = travelId => async dispatch => {
    travelsRef.child(travelId)
        .update({ favorite: true });
};

export const fetchTravels = () => async dispatch => {
    travelsRef.on("value", snapshot => {
        dispatch({
            type: FETCH_TRAVELS,
            payload: snapshot.val()
        });
    });
};

export const switchDailyPreviewModalState = () => ({
    type: ADD_PATH_TOOGLE_MODAL,
});

export const addMarker = (marker) => ({
    type: ADD_MARKER,
    payload: marker,
});

export const addDistance = (distance) => ({
    type: ADD_DISTANCE,
    payload: distance,
});

export const addMapRef = (ref) => ({
    type: ADD_MARKER_REF,
    payload: ref,
});

export const filterTravels = (value) => ({
    type: FILTER_TRAVELS,
    payload: value,
});

export const selectTravel = (travel) => ({
    type: SELECT_TRAVEL,
    payload: travel,
});