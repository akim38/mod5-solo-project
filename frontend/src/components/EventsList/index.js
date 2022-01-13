import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEvents } from "../../store/events";
import CreateEventForm from "../CreateEventForm";
import './EventsList.css'

const EventsList = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.list);
    console.log('EVENTSSSSSSSSSS', events);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);


    return (
        <div className="events-list">
            <h3>Upcoming Events</h3>
            {events?.map(event => (
                <NavLink key={event.name} to={`/events/${event.id}`}>
                    <div className="event-box" key={`div${event.id},${event.name}`} >
                        <ul>
                            <p>{event.name}</p>
                            <li>{event.date}</li>
                            <li>{event.location}{event.city && `, ${event.city}`}, {event.region}</li>
                        </ul>
                    </div>
                </NavLink>
            ))}
            <CreateEventForm />
        </div>
    )
};

export default EventsList;
