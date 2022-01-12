import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../../store/events";
import './EventDetails.css'

const EventDetail = () => {
    const { eventId } = useParams();
    const event = useSelector(state => state.event[eventId]);
    console.log('EVENTSSSSSSSSSS', event);
    const dispatch = useDispatch();
    // const [showEventEditForm, setShowEventEditForm] = useState(false);

    useEffect(() => {
        dispatch(getSingleEvent(eventId));
        //setShowEventEditForm(false);
    }, [dispatch, eventId]);

    if (!event) return null;

    return (
        <div className="event-detail">
            {event.event.imageUrl && (<img className="event-image" src={event.event.imageUrl} />)}
            <div>
                <h1>{event.event.name}</h1>
                <p>Host: </p>
                <p>{event.event.description}</p>
            </div>
            <div>
            <li>{event.event.date}</li>
            <li>{event.event.location}{event.event.city && `, ${event.event.city}`}, {event.event.region}</li>
            </div>
        </div>
    )


}

export default EventDetail;
