import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { signup } from "../../store/session";
import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(signup({ email, username, password}))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                });
        }
        return setErrors(['Confirmed password must match password.']);
    }

    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
                <ul>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <label>
                    Email
                    <input
                      type='text'
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Username
                    <input
                      type='text'
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password
                    <input
                      type='password'
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    Confirm Password
                    <input
                      type='password'
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
};

export default SignupFormPage;
