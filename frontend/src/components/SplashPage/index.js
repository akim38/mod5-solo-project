import { NavLink } from 'react-router-dom';
import './SplashPage.css'


const SplashPage = () => {
    return (
        <div>
            <div>
                <h2>Welcome to PokéMeetup!</h2>
                <p>PokéMeetup is here to connect you to other trainers and Pokéfans!
                Connecting everyone across all regions through our shared interest
                in those companions we call Pokémon.</p>
            </div>
            <NavLink to={`/events`}>
                Checkout Upcoming Events!
            </NavLink>
        </div>

    )
}

export default SplashPage;
