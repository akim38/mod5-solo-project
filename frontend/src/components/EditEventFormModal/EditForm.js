import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEvent } from "../../store/events";

const EditEventForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    let event = useSelector(state => state.event.list);

    console.log('EEEEVEEEEENT', event);

    const [name, setName] = useState(event?.name);
    const [date , setDate] = useState(event?.date);
    const [location, setLocation] = useState(event?.location);
    const [city, setCity] = useState(event?.city);
    const [region, setRegion] = useState(event?.region);
    const [description, setDescription] = useState(event?.description);
    const [imageUrl, setImageUrl] = useState(event?.imageUrl);
    const [errors, setErrors] = useState([]);
    const id = event.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id,
            userId,
            name,
            date,
            location,
            city,
            region,
            description,
            imageUrl
        }

        const editedEvent = await dispatch(editEvent(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) return setErrors(data.errors)
            })
        console.log('edit edit edit edit EVENT~~~~~~~~', editedEvent)
        if (editedEvent) {
            setShowModal(false)
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        // hideForm();
      };

    return (
        <section>
            <h2>Edit Your Event</h2>
            {errors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
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
                <label> Optional Image Url
                    <input
                        type="url"
                        id='url'
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                </label>
                <button type="submit">Update Event</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}

export default EditEventForm;
