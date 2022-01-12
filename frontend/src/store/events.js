import { csrfFetch } from "./csrf";

//action types
const LOAD_EVENT = 'event/LOAD';
const ADD_EVENT = 'event/ADD';
const UPDATE_EVENT = 'event/UPDATE';
const DELETE_EVENT = 'event/DELETE';

//action creators
const loadEvent = (event) => ({
    type: LOAD_EVENT,
    event
});

const addEvent = (event) => ({
    type: ADD_EVENT,
    event
});

const updateEvent = (eventId, event) => ({
    type: UPDATE_EVENT,
    eventId,
    event
});

const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId
});


//thunks

export const getEvents = () => async dispatch => {
    const response = await fetch(`/api/events`);

    if (response.ok) {
        const eventList = await response.json();
        dispatch(loadEvent(eventList))
    }
}

export const getSingleEvent = (id) => async dispatch => {
    const response = await fetch(`/api/events/${id}`);

    if (response.ok) {
        const event = await response.json();
        dispatch(loadEvent(event))
    }
};

export const createEvent = (payload) => async dispatch => {
    const response = await fetch('/api/events', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const newEvent = await response.json();
        dispatch(addEvent(newEvent));
        return newEvent;
      }
};

export const editEvent = (id, payload) => async dispatch => {
    const response = await fetch(`/api/events/:${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const updatedEvent = await response.json();
        dispatch(updateEvent(updatedEvent));
    }
};

export const removeEvent = (id) => async dispatch => {
    const response = await fetch(`/api/events/:${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const event = await response.json();
        dispatch(deleteEvent(event.id))
    }

}



//reducer
const initialState = {
    list = []
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENT: {
            const allEvents = {};
            action.list.forEach((event) => {
                allEvents[event.id] = event;
            });
            return {... allEvents, ...state, list: action.list}
        }
        case ADD_EVENT:
        case UPDATE_EVENT: {
            if (!state[action.event.id]) {
                const newState = {
                    ...state,
                    [action.event.id] : action.event
                }
                const eventList = newState.list.map((id) => newState[id]);
                eventList.push(action.event)
                return newState;
            }
        }
        case DELETE_EVENT: {
            const newState = { ...state };
            delete newState[action.eventId];
            return newState;
        }
    }
}

export default eventReducer;
