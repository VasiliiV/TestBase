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
        // Очищаем предыдущие ошибки
        setErrorMessage('');
        setInfoMessage('');

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
                const message = data.message || 'Успешный вход';
                setInfoMessage(message);
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

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-header">
                    <span className="pill">QA Training Lab</span>
                    <h3>Вход в TestBase</h3>
                    <p className="auth-subtitle">
                        Один клик — и вы в среде, где удобно искать баги и оформлять артефакты.
                    </p>
                </div>
                <form id="authForm" className="auth-form">
                    <label className="auth-field">
                        <span>Имя пользователя</span>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Например, qa_trainee" 
                            required 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label className="auth-field">
                        <span>Пароль</span>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Минимум 6 символов" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="btn btn-primary auth-submit" type="button" onClick={handleLogin}>
                        Войти или создать аккаунт
                    </button>
                    {infoMessage && <div className="info-message">{infoMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            </div>
            <div className="auth-aside">
                <div className="auth-aside__card">
                    <h4>Что можно тренировать</h4>
                    <ul>
                        <li>создание тест-кейсов и баг-репортов</li>
                        <li>проверка форм, API и валидаций</li>
                        <li>поиск регрессий в UI</li>
                    </ul>
                </div>
                <div className="auth-aside__card">
                    <h4>Подсказка</h4>
                    <p>Если пользователя нет, он будет создан автоматически при первом входе.</p>
                </div>
            </div>
        </div>
    );
}

export default AuthUser;
