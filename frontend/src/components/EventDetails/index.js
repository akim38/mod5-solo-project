import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleEvent, removeEvent } from "../../store/events";
import EditEventFormModal from "../EditEventFormModal";
import './EventDetails.css';
import dayjs from 'dayjs';

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
            .then(history.push("/events"))
    }

    return (
        <div className="event-detail">
            {event.imageUrl && (<img className="event-image" alt="event" src={event.imageUrl} />)}
            <div>
                <h1>{event.name}</h1>
                <p>Host: {event?.User?.username}</p>
                <p>{event.description}</p>
            </div>
            <div>
            <li>{dayjs(event.date).format('MMM D, YYYY h:mm A')}</li>
            <li>{event.location}{event.city && `, ${event.city}`}, {event.region}</li>
            </div>
            <div>
                {sessionUser?.id === event?.userId && <EditEventFormModal />}
            </div>
            <div>
                {sessionUser?.id === event?.userId &&
                <button
                    type="submit"
                    id="delete-event-button"
                    onClick={handleDelete}
                >Delete Event</button>}
            </div>
        </div>
    )


}

export default EventDetail;
