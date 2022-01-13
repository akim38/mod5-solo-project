import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleEvent, removeEvent } from "../../store/events";
import EditEventFormModal from "../EditEventFormModal";
import './EventDetails.css';
import dayjs from 'dayjs';
import { NavLink } from "react-router-dom";

const EventDetail = () => {
    const { eventId } = useParams();

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const event = useSelector(state => state.event.single);
    const history = useHistory();


    useEffect(() => {
        dispatch(getSingleEvent(eventId));
    }, [dispatch, eventId]);

    if (!event) return null;

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(removeEvent(eventId))
            .then((res) => history.push("/events"))
    }

    return (
        <div className="event-detail">
            <div className="change-event">
                {sessionUser?.id === event?.userId &&
                <>
                    <EditEventFormModal />
                    <button
                        type="submit"
                        id="delete-event-button"
                        onClick={handleDelete}
                    >Delete Event</button>
                </>}
            </div>
            <div className="event-title">
                <h2>{event.name}</h2>
                <p>Host: {event?.User?.username}</p>
            </div>
            <div className="event-timeplace">
                <li>{dayjs(event.date).format('MMM D, YYYY h:mm A')}</li>
                <li>{event.location.toLowerCase()}{event.city && `, ${event.city.toLowerCase()}`}, {event.region.toLowerCase()}</li>
            </div>
            {event.imageUrl && (<img className="event-image" alt="event" src={event.imageUrl} />)}
            <div className="event-description">
                <h4>About:</h4>
                {event.description}
            </div>
            <NavLink to={`/events`}>
                Back to events!
            </NavLink>
        </div>
    )


}

export default EventDetail;
