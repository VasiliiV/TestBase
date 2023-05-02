import React, { useState } from "react";
import CreateIssue from "../create_issue/CreateIssue";
    
const SectionImage = () => {
    const [userName, setUserName] = useState("");
    const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);

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
                    <button className="Button_view_button" type="button" onClick={() => setIsCreateIssueOpen(true)}>
                    Добавить задачу
                    </button>
                    <button className="Button_add_task" type="button" onClick={deleteClickTask}>
                    Удалить задачу
                    </button>
                </div>
            </div>
        </div>
        {isCreateIssueOpen && <CreateIssue />}
    </div>
    );
};
export default SectionImage;