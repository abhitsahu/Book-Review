import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice'; // Adjust the import path as necessary
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import './Login.css'; // Import the CSS file for styling

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate for redirection
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, { email, password });
            // Store user ID in session storage
            // console.log(response);
            sessionStorage.setItem('userId', response.data.user.id);
            sessionStorage.setItem('token', response.data.token);
            
            // Dispatch loginSuccess action to update Redux store
            dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
            
            // Show success message
            toast.success('Login successful! Redirecting to books page...');

            // Redirect to books page after a short delay
            setTimeout(() => {
                navigate('/books'); // Redirect to the books page
            }, 2000); // Adjust the delay as needed
        } catch (err) {
            setError(err.response.data.message || 'Login failed');

        }
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <div className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;