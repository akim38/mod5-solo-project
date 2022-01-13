import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const loginDemo = (e) => {
        e.preventDefault();
        return dispatch(login({
            credential: 'demo@user.io',
            password: 'password'
        }))
    }

    return (
        <div className="login-form">
            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
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
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    />
                </label>
                <label>
                    Password
                    <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Log In</button>
                <button onClick={loginDemo}>Log In as Demo User!</button>
            </form>

        </div>
    )
};

export default LoginForm;
