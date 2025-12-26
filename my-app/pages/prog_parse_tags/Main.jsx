import React from 'react';
import {useState} from 'react';
import { useRouter } from 'next/router';


function Main() {
            const [status, setStatus] = useState({ type: '', message: '' });
            function handleParseButtonClick() {
              setStatus({ type: '', message: '' });
              const token = localStorage.getItem('token');

              // Проверяем, есть ли токен перед отправкой запроса
              if (!token) {
                setStatus({ type: 'error', message: 'Токен не найден, пожалуйста, авторизуйтесь.' });
                return; // Остановим выполнение функции, если токен отсутствует
              }
            
              const data = {
                name: isNameChecked ? nameInputValue : '',
                age: isAgeChecked ? ageInputValue : ''
              };
              fetch('/api/click', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Добавляем токен в заголовок
                }
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json(); // Обработка ответа здесь
                })
                .then(data => {
                  console.log(data);
                  setStatus({ type: 'success', message: 'Данные успешно сохранены.' });
                })
                .catch(error => {
                  // Обработка ошибки здесь
                  console.error('Ошибка при запросе:', error);
                  setStatus({ type: 'error', message: 'Ошибка при отправке данных.' });
                });
            }
  
  
  //disable is input with click check-box
            const [isNameChecked, setIsNameChecked] = useState(false);
            const [isAgeChecked, setIsAgeChecked] = useState(false);
            const [nameInputValue, setNameInputValue] = useState('');
            const [ageInputValue, setAgeInputValue] = useState('');

            function handleYandexCheckboxChange(event) {
                setIsNameChecked(event.target.checked);
            }

            function handleGoogleCheckboxChange(event) {
                setIsAgeChecked(event.target.checked);
            }

        const router = useRouter();  

        function exitClick() {
          router.push('/');  
    }
    return (
        <section className="dashboard-hero panel">
            <div className="dashboard-hero__top">
                <div>
                    <span className="pill">TestBase QA Lab</span>
                    <h1>Тренировочная площадка для тестировщика</h1>
                    <p className="dashboard-hero__subtitle">
                        Проверь формы, фиксируй баги, оформляй тест-кейсы — всё в одном месте.
                    </p>
                </div>
                <button className="btn btn-ghost" onClick={exitClick}>Выйти</button>
            </div>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Тестовые поля</h3>
                    <p>Включай чекбоксы и проверяй, как ведут себя поля ввода.</p>
                    <div className="field-row">
                        <div className="field-block">
                            <label>Имя</label>
                            <input
                                type="text"
                                placeholder="Введите имя"
                                disabled={!isNameChecked}
                                value={nameInputValue}
                                onChange={(event) => setNameInputValue(event.target.value)}
                            />
                        </div>
                        <label className="toggle">
                            <input type="checkbox" onChange={handleYandexCheckboxChange} />
                            <span>Активировать</span>
                        </label>
                    </div>
                    <div className="field-row">
                        <div className="field-block">
                            <label>Возраст</label>
                            <input
                                type="text"
                                placeholder="Введите возраст"
                                disabled={!isAgeChecked}
                                value={ageInputValue}
                                onChange={(event) => setAgeInputValue(event.target.value)}
                            />
                        </div>
                        <label className="toggle">
                            <input type="checkbox" onChange={handleGoogleCheckboxChange} />
                            <span>Активировать</span>
                        </label>
                    </div>
                    <div className="dashboard-actions">
                        <button className="btn btn-primary" onClick={handleParseButtonClick}>Сохранить</button>
                        {status.message && (
                            <div className={`status-pill ${status.type === 'error' ? 'status-pill--error' : 'status-pill--success'}`} aria-live="polite">
                                {status.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="dashboard-card dashboard-guide">
                    <h3>Как использовать стенд</h3>
                    <ol>
                        <li>Сгенерируй данные, сохрани их и проверь ответ API.</li>
                        <li>Создай тест-кейс или баг-репорт через панель справа.</li>
                        <li>Сравни ожидания с фактом — зафиксируй дефекты.</li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
export default Main;
