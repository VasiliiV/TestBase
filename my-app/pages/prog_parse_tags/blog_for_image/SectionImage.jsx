import React from "react";


const SectionImage = () => {
    return (
        <div className="headerRight">
            <div className="headerUser">
                <div className="user-account" href="">
                    <span className="user-account_name"></span>
                    <div className="user-account_icon">
                        <img src="/multfilm_gomer.png" alt="" width={120}/>
                    </div>
                    <button className="Button_view_button" type="button">Загрузить</button>
                </div>
            </div>
        </div>
    );
}

export default SectionImage;