import React, { useState } from "react";
import CreateIssue from "../create_issue/CreateIssue";
import CreateTestCase from "../create_test_case/CreateTestCase";
import { useRouter } from 'next/router'; 
    
const SectionImage = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);
    const [isCreateTestCaseOpen, setIsCreateTestCaseOpen] = useState(false);

    const handleClick = async () => {
    const response = await fetch('/api/click', { method: 'GET' });
    const data = await response.json();
    setUserName(data.name);
    };

    const deleteClick = async () => {
    const response = await fetch('/api/click', { method: 'DELETE' });
    const data = await response.json();
    };
    const deleteClickTask = async () => {
        const response = await fetch('/api/create', { method: 'DELETE' });
        const data = await response.json();
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