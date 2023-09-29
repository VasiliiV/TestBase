import { useState } from "react";
import { useRouter } from 'next/router';

function AuthUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();  // Получение экземпляра маршрутизатора

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username && !password) {
            setErrorMessage('Пожалуйста, введите имя и пароль');
        } else if (!username) {
            setErrorMessage('Пожалуйста, введите имя');
        } else if (!password) {
            setErrorMessage('Пожалуйста, введите пароль');
        } else {
            setErrorMessage('');
            console.log('Данные для отправки:', { username, password });
            try {
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: username, password }),  // Передача username и password в теле запроса
                });
                const data = await response.json();  // Преобразование ответа в JSON
                console.log(data);  // Вывод данных ответа в консоль

                // Перенаправление пользователя после успешного выполнения запроса
                router.push('/auth');
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
    };

    return (
        <div className="main">
            <div className="main_reg">
                <div className="main_reg_form">
                    <div className="head">
                        <img className="head__icon" src="icon.png" onError={(e) => { e.target.onerror = null; e.target.src = '/tpl/img/sign/logo_w.png'; }} alt="" />
                    </div>
                    <form id="authForm" onSubmit={handleSubmit}>
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
                            <button type="submit">Войти</button>
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