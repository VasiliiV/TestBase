import React from "react";
import logoApp from "./cool-pictures-2018-32.jpeg"

const SectionImage = () => {
    return (
        <div className="headerRight">
            <div className="headerUser">
                <div className="user-account" href="">
                    <span className="user-account_name"></span>
                    <div className="user-account_icon">
                        <img src={logoApp} alt="" className="blog_for_image__logo"/>
                    </div>
                    <button className="Button_view_image" type="button">Загрузить</button>
                </div>
            </div>
        </div>
    );
}

export default SectionImage;