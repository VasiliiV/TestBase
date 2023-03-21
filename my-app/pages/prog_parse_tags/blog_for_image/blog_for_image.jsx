import exp from "constants";
import React from "react";

function BlogForImage() {
    return (
        <div className="Header-Right">
            <div className="Header-User">
                <a className="user-account" href="" role={"button"}>
                    <span className="user-account_name"></span>
                    <div className="user-account_icon">
                        <img src="" alt="" sizes=""/>
                    </div>
                    <button className="Button_view_image" type="button">Загрузить</button>
                </a>
            </div>
        </div>
    );
}

export default BlogForImage;