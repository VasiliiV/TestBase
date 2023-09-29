import { useState } from "react";

function AuthUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username && password) {
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
            } catch (error) {
                console.error('Ошибка:', error);
            }
        } else {
            alert('Пожалуйста, введите имя и пароль');
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