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
            <h2>Upcoming Events</h2>
            {sessionUser && <CreateEventFormModal />}
            {events?.map(event => (
                <NavLink key={event.name} to={`/events/${event.id}`}>
                    <div className="event-box" key={`div${event.id},${event.name}`} >
                        <ul>
                            <p>{event.name}</p>
                            <li>{dayjs(event.date).format('MMM D, YYYY h:mm A')}</li>
                            <li>{event.location.toLowerCase()}{event.city && `, ${event.city.toLowerCase()}`}, {event.region.toLowerCase()}</li>
                        </ul>
                    </div>
                </NavLink>
            ))}
        </div>
    )
};

export default EventsList;
