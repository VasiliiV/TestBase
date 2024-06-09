import React, { useState } from "react";
import { useRouter } from 'next/router';

function AuthUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Очищаем предыдущие ошибки
        setErrorMessage('');

        // Простая проверка на пустые поля
        if (!username || !password) {
            setErrorMessage('Имя пользователя и пароль обязательны.');
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
                // Сохраняем токен в localStorage
                localStorage.setItem('token', data.accessToken);
                // Перенаправляем на защищенную страницу
                router.push('/auth');
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setErrorMessage('Произошла ошибка при авторизации.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // Очищаем предыдущие ошибки
        setErrorMessage('');

        // Простая проверка на пустые поля
        if (!username || !password) {
            setErrorMessage('Имя пользователя и пароль обязательны.');
            return;
        }

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
            setErrorMessage('Произошла ошибка при регистрации.');
        }
    };

    return (
        <div className="main">
            <div className="main_reg">
                <div className="main_reg_form">
                    <div className="head">
                        <h3>Авторизация</h3>
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
                        {/* Содержимое футера, если необходимо */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthUser;