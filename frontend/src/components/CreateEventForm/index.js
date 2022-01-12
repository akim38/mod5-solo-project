import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent } from "../../store/events";


const CreateEventForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id

    const [name, setName] = useState('');
    const [date , setDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');


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

        const event = await dispatch(createEvent(payload));
        if (event) {
            history.push(`/events/${event.id}`);
            //hideForm(); add some hiding form functionality later !!!!!
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        // hideForm();
      };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"> Name of Event:
                    <input
                        type="text"
                        placeholder="Event Name"
                        id='name'
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label htmlFor="date"> Date and Time of Event:
                    <input
                        type="datetime-local"
                        id='date'
                        required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </label>
                <label> Location
                    <input
                        type="text"
                        id='location'
                        required
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                </label>
                <label> City
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
                        required
                        value={region}
                        onChange={e => setRegion(e.target.value)}
                    />
                </label>
                <label> Description
                    <textarea
                        id='description'
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label> Optional Image Url
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
