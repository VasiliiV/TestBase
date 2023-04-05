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
return (
<div className="headerRight">
    <div className="headerUser">
        <div className="user-account" href="">
            <span className="user-account_name">{userName}<p>Тут отобразится твоё имя</p></span>
            <div className="user-account_icon">
                <img src="/multfilm_gomer.png" alt="" width={120} />
            </div>
            <button className="Button_view_button" type="button" onClick={handleClick}>
            Add userName
            </button>
            <button className="Button_add_task" type="button" onClick={() => setIsCreateIssueOpen(true)}>
            Add task
            </button>
        </div>
    </div>
    {isCreateIssueOpen && <CreateIssue />}
</div>
);
};
export default SectionImage;