import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent } from "../../store/events";
import dayjs from 'dayjs';
import './CreateEventForm.css';


const CreateEventForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;

    const minDate = dayjs(new Date()).format("YYYY-MM-DD[T]HH[:]mm");

    const [name, setName] = useState('');
    const [date , setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD[T08:00]"));
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId,
            name,
            date,
            location,
            city,
            region,
            description,
            imageUrl
        }

        const event = await dispatch(createEvent(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) return setErrors(data.errors)
            })

        if (event) {
            history.push(`/events/${event.newEvent.id}`);
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        setShowModal(false);
    };


    return (
        <section className="create-event-form">
            <h2>Create a New Event</h2>
            {errors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                </div>
            )}
            <form  onSubmit={handleSubmit}>
                <label htmlFor="name"> Name of Event:
                    <input
                        type="text"
                        placeholder="Event Name"
                        id='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label htmlFor="date"> Date and Time of Event:
                    <input
                        type="datetime-local"
                        id='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        min={minDate}
                    />
                </label>
                <label> Location
                    <input
                        type="text"
                        id='location'
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                </label>
                <label> City (Optional)
                    <input
                        type="text"
                        id='city'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
                <label> Region
                    <input
                        type="text"
                        id='region'
                        value={region}
                        onChange={e => setRegion(e.target.value)}
                    />
                </label>
                <label> Description
                    <textarea
                        id='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label> Image Url (Optional)
                    <input
                        type="url"
                        id='url'
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                </label>
                <button type="submit">Create New Event</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}

export default CreateEventForm;
