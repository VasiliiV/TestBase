import { useState } from "react";
import { useRouter } from 'next/router';

function AuthUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        // ... проверка на пустые поля и вывод ошибок

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
                router.push('/auth');
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // ... проверка на пустые поля и вывод ошибок

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, password }),
            });
            const data = await response.json();
            if (data.success) {
                setErrorMessage("Регистрация прошла успешно! Теперь вы можете войти.");
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="main">
            <div className="main_reg">
                <div className="main_reg_form">
                    <div className="head">
                        <img className="head__icon" src="icon.png" onError={(e) => { e.target.onerror = null; e.target.src = '/tpl/img/sign/logo_w.png'; }} alt="" />
                    </div>
                    <form id="authForm">
                        <div className="form_input">
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                placeholder="Имя пользователя" 
                                required 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Пароль" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" style={{marginBottom: '10px'}} onClick={handleLogin}>Войти</button>
                            <button type="button" onClick={handleRegister}>Регистрация</button>
                        </div>
                        {errorMessage && <div className="error-message" style={{color: 'red'}}>{errorMessage}</div>}
                    </form>
                    <div className="footer">
                        {/* Footer Content */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthUser;