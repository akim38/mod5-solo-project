import { csrfFetch } from "./csrf";

//action types
const LOAD_EVENT = 'event/LOAD';
const ADD_EVENT = 'event/ADD';
const UPDATE_EVENT = 'event/UPDATE';
const DELETE_EVENT = 'event/DELETE';
const LOAD_ONE_EVENT = 'event/LOAD_ONE'

//action creators
const loadEvent = (list) => ({
    type: LOAD_EVENT,
    list
});

const loadOneEvent = (event) => ({
    type: LOAD_ONE_EVENT,
    event
})

const addEvent = (event) => ({
    type: ADD_EVENT,
    event
});

const updateEvent = (event) => ({
    type: UPDATE_EVENT,
    event
});

const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId
});


//thunks

export const getEvents = () => async dispatch => {
    const response = await csrfFetch(`/api/events`);

    if (response.ok) {
        const eventList = await response.json();
        dispatch(loadEvent(eventList))
    }
}

export const getSingleEvent = (id) => async dispatch => {
    const response = await csrfFetch(`/api/events/${id}`);

    if (response.ok) {
        const event = await response.json();
        dispatch(loadOneEvent(event))
    }
};

export const createEvent = (payload) => async dispatch => {

    const response = await csrfFetch('/api/events', {
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

export const editEvent = (payload) => async dispatch => {

    const response = await csrfFetch(`/api/events/:${payload.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const updatedEvent = await response.json();
        dispatch(updateEvent(updatedEvent));
        return updatedEvent;
    }
};

export const removeEvent = (id) => async dispatch => {
    const response = await csrfFetch(`/api/events/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const event = await response.json();
        dispatch(deleteEvent(event.id))
    }

}



//reducer
const initialState = {
    list: []
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENT: {
            const allEvents = {};

            action.list.events.forEach((event) => {
                allEvents[event.id] = event;
            });

            return {...allEvents, ...state, list: action.list.events}
        }
        case LOAD_ONE_EVENT: {
            const allEvents = {};

            allEvents[action.event.event.id] = action.event;

            return {...allEvents, ...state, single: action.event.event}
        }
        case ADD_EVENT: {
                let newState;
                if (!state[action.event.id]) {
                    newState = {
                        ...state,
                        [action.event.newEvent.id] : action.event.newEvent
                    }

                    const eventList = newState.list.map((id) => newState[id]);
                    eventList.push(action.event)

                };
                return newState;
            }
        case UPDATE_EVENT: {
                const newState = {
                    ...state,
                    [action.event.event.id] : action.event.event,
                };
                newState.single = action.event.event;

                return newState;

        }
        case DELETE_EVENT: {
            const newState = { ...state };
            delete newState[action.eventId];
            newState.list = newState.list.filter((id) => id !== action.eventId);
            newState.single = null; 
            return newState;
        }
        default:
            return state;
    }
}

export default eventReducer;
