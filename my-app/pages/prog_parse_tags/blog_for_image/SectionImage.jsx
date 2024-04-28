import React, { useState } from "react";
import CreateIssue from "../create_issue/CreateIssue";
import CreateTestCase from "../create_test_case/CreateTestCase";
import { useRouter } from 'next/router'; 
    
const SectionImage = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");

    // State для управления модальными окнами
    const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);
    const [isCreateTestCaseOpen, setIsCreateTestCaseOpen] = useState(false);

    // Функция для получения токена из localStorage
    const getToken = () => localStorage.getItem('token');

    const fetchWithToken = (url, method) => {
        const token = getToken();
        if (!token) {
            console.log('Токен не найден, пожалуйста, авторизуйтесь.');
            return;
        }

        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    };

    const handleClick = async () => {
        const response = await fetchWithToken('/api/click', 'GET');
        if (response) {
            const data = await response.json();
            setUserName(data.name);
        }
    };

    const deleteClick = async () => {
        const response = await fetchWithToken('/api/click', 'DELETE');
        if (response) {
            // Возможная обработка ответа
        }
    };

    const deleteClickTask = async () => {
        const response = await fetchWithToken('/api/create', 'DELETE');
        if (response) {
            // Возможная обработка ответа
        }
    };

    const navigateToExam = () => {
        router.push('/exam'); // убедитесь, что маршрут соответствует пути вашей страницы экзамена
    };
return (
    <div className="headerRight">
        <div className="headerUser">
            <div className="user-account" href="">
                <span className="user-account_name">{userName}<p>Тут будет твоё имя</p></span>
                <div className="user-account_icon">
                    <img src="/multfilm_gomer.png" alt="" width={120} />
                </div>
                <div className="Button_table_toolbar">
                    <button className="Button_view_button" type="button" onClick={handleClick}>
                    Показать имя
                    </button>
                    <button className="Button_add_task" type="button" onClick={deleteClick}>
                    Удалить имя
                    </button>
                    <button className="Button_view_button" type="button" onClick={() => setIsCreateTestCaseOpen(true)}>
                    Добавить тест кейс
                    </button>
                    <button className="Button_view_button" type="button" onClick={() => setIsCreateIssueOpen(true)}>
                    Добавить задачу
                    </button>
                    <button className="Button_add_task" type="button" onClick={deleteClickTask}>
                    Удалить задачу
                    </button>
                    <button className="Button_exam" type="button" onClick={navigateToExam}>
                    Пройти экзамен
                    </button>
                </div>
            </div>
        </div>
        {isCreateIssueOpen && <CreateIssue />}
        {isCreateTestCaseOpen && <CreateTestCase />}
    </div>
    );
};
export default SectionImage;