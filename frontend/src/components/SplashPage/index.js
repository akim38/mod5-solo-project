import { NavLink } from 'react-router-dom';
import './SplashPage.css'


const SplashPage = () => {
    return (
        <>
        <div className='splash-area'>
            <div className='splash-text'>
                <h2>Welcome to PokéMeetup!</h2>
                <p>PokéMeetup is here to connect you to trainers, Pokéfans, and all others in the Pokémon world!
                Connecting everyone across all regions through our shared interest
                in those companions we call Pokémon.</p>
            </div>
            <NavLink to={`/events`}>
                Checkout Upcoming Events!
            </NavLink>
        </div>
        <div className='about'>
            <p>Developed by Aletheia Kim 2022</p>
            <a href='https://github.com/akim38'>Github</a>
        </div>
        </>

    )
}

export default SplashPage;
