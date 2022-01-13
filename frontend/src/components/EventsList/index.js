import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEvents } from "../../store/events";
import CreateEventFormModal from "../CreateEventForm";
import './EventsList.css';
import dayjs from 'dayjs';

const EventsList = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.list);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    // console.log(events[1].date)

    return (
        <div className="events-list">
            <h3>Upcoming Events</h3>
            {events?.map(event => (
                <NavLink key={event.name} to={`/events/${event.id}`}>
                    <div className="event-box" key={`div${event.id},${event.name}`} >
                        <ul>
                            <p>{event.name}</p>
                            <li>{dayjs(event.date).format('MMM D, YYYY h:mm A')}</li>
                            <li>{event.location}{event.city && `, ${event.city}`}, {event.region}</li>
                        </ul>
                    </div>
                </NavLink>
            ))}
            {sessionUser && <CreateEventFormModal />}
        </div>
    )
};

export default EventsList;
