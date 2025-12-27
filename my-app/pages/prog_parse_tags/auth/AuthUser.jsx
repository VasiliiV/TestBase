import React, { useState } from "react";
import { useRouter } from 'next/router';

function AuthUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setInfoMessage('');

        if (!username || !password) {
            setErrorMessage('Username and password are required.');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, password }),
            });
            const data = await response.json();
            if (data.success) {
                const message = data.message || 'Login successful';
                setInfoMessage(message);
                localStorage.setItem('token', data.accessToken);
                router.push('/auth');
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while signing in.');
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-header">
                    <span className="pill">QA Training Lab</span>
                    <h3>Sign in to TestBase</h3>
                    <p className="auth-subtitle">
                        One click — and you are in a space built to file bugs and polish artifacts.
                    </p>
                </div>
                <form id="authForm" className="auth-form">
                    <label className="auth-field">
                        <span>Username</span>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="For example, qa_trainee"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label className="auth-field">
                        <span>Password</span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="At least 6 characters"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="btn btn-primary auth-submit" type="button" onClick={handleLogin}>
                        Sign in or create an account
                    </button>
                    {infoMessage && <div className="info-message">{infoMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            </div>
            <div className="auth-aside">
                <div className="auth-aside__card">
                    <h4>What you can practice</h4>
                    <ul>
                        <li>creating test cases and bug reports</li>
                        <li>checking forms, APIs, and validations</li>
                        <li>finding UI regressions</li>
                    </ul>
                </div>
                <div className="auth-aside__card">
                    <h4>Tip</h4>
                    <p>If the user does not exist, they will be created automatically on first sign-in.</p>
                </div>
            </div>
        </div>
    );
}

export default AuthUser;
