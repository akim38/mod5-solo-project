import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../../store/events";
import './EventDetails.css'

const EventDetail = () => {
    const { eventId } = useParams();
    const event = useSelector(state => state.event.list);
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
            {event.imageUrl && (<img className="event-image" src={event.imageUrl} />)}
            <div>
                <h1>{event.name}</h1>
                <p>Host: </p>
                <p>{event.description}</p>
            </div>
            <div>
            <li>{event.date}</li>
            <li>{event.location}{event.city && `, ${event.city}`}, {event.region}</li>
            </div>
        </div>
    )


}

export default EventDetail;
