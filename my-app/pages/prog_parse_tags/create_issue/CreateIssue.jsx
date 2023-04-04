import React from "react";

function CreateIssue() {
    return(
        <div className="dialog-for-task">
            <div className="dialog-heading">
тут шапка с заголовком
            </div>
            <div className="dialog-content">
                <form action="" className="aui">
                    <div className="form-body">
тело с дивами и разными частями для заполнения таски
                    </div>
                    <div className="buttons-container form-footer">
нижняя панель с кнопками
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default CreateIssue;