import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from './ProfileButton';
import LoginFormModal from "../LoginFormModal";
import './Navigation.css';
import CreateEventFormModal from "../CreateEventForm";

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
            <CreateEventFormModal />
            <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to='/signup'>Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className="navbar">
            <div className="nav-links">
                <NavLink exact to='/'>Home</NavLink>
                <NavLink to='/events'>Events</NavLink>
            </div>
            <h2 className="nav-title">PokéMeetup</h2>
            <div className="session-links">
                {isLoaded && sessionLinks}
            </div>
        </div>
    )
}

export default Navigation;
