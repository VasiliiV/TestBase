import React, { useState } from "react";
    const SectionImage = () => {
    const [userName, setUserName] = useState("");
    const handleClick = async () => {
    const response = await fetch('/api/click', { method: 'POST' });
    const data = await response.json();
    setUserName(data.name);
    };
return (
<div className="headerRight">
    <div className="headerUser">
        <div className="user-account" href="">
            <span className="user-account_name">{userName}</span> //тут хочу оторазить имя из бд
            <div className="user-account_icon">
                <img src="/multfilm_gomer.png" alt="" width={120} />
            </div>
            <button className="Button_view_button" type="button" onClick={handleClick}>
            Add userName
            </button>
        </div>
    </div>
</div>
);
};
export default SectionImage;