import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../../store/events";
import EditEventFormModal from "../EditEventFormModal";
import './EventDetails.css'

const EventDetail = () => {
    const { eventId } = useParams();
    // console.log('EVENTSSSSSSSSSS', event);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const event = useSelector(state => state.event.list);

    useEffect(() => {
        dispatch(getSingleEvent(eventId));
    }, [dispatch, eventId]);

    if (!event) return null;

    return (
        <div className="event-detail">
            {event.imageUrl && (<img className="event-image" alt="event" src={event.imageUrl} />)}
            <div>
                <h1>{event.name}</h1>
                <p>Host: {event?.User?.username}</p>
                <p>{event.description}</p>
            </div>
            <div>
            <li>{event.date}</li>
            <li>{event.location}{event.city && `, ${event.city}`}, {event.region}</li>
            </div>
            <div>
                {sessionUser.id === event?.userId && <EditEventFormModal />}
            </div>

        </div>
    )


}

export default EventDetail;
