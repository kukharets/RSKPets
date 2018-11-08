import { todosRef, travelsRef } from "../config/firebase";
import {FETCH_TODOS, ADD_PATH_TOOGLE_MODAL, ADD_MARKER, ADD_DISTANCE, FETCH_TRAVELS, SELECT_TRAVEL, ADD_TO_FAVORITES} from "./types";

export const addToDo = newToDo => async dispatch => {
    todosRef.push().set(newToDo);
};

export const addTravel = newTravel => async dispatch => {
    console.log("action.",newTravel)
    travelsRef.push().set(newTravel);
};


export const completeToDo = completeToDoId => async dispatch => {
    todosRef.child(completeToDoId).remove();
};

export const deleteTravel = travelId => async dispatch => {
    travelsRef.child(travelId).remove();
};

export const addToFavorite = travelId => async dispatch => {
    travelsRef.child(travelId)
        .update({ favorite: true });
};

export const fetchToDos = () => async dispatch => {
    todosRef.on("value", snapshot => {
        dispatch({
            type: FETCH_TODOS,
            payload: snapshot.val()
        });
    });
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

export const selectTravel = (travel) => ({
    type: SELECT_TRAVEL,
    payload: travel,
});