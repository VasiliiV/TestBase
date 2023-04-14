import { useState } from "react";

function CreateIssue() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    }
    

    return isOpen ? (
        <div className="dialog-for-task">
            <div>
                <button title="Close" className="button__close" onClick={handleClose}>
                    <span>
                        <mat-icon>
                            <img src="/symbolize-x.png" alt="" className="icon__close"/>
                        </mat-icon> 
                    </span>
                </button>
            </div>
            <div className="dialog-heading">
                <h2 title="Create Issue">Create Issue</h2>
            </div>
            <div className="dialog-content">
                <form action="" className="aui">
                    <div className="form-body">
                        <div className="group__form-body">
                            <h3>Project</h3>
                            <input className="input__form-body" maxLength="255" placeholder="" type="text" spellCheck="true"></input>
                        </div>
                        <div className="group__form-body">
                            <h3>Issue Type</h3>
                            <select className="select__form-body">
                                <option value="DEFAULT" disabled>Choose a salutation ...</option>
                                <option value="1">Task</option>
                                <option value="2">Bug</option>
                                <option value="3">Story</option>
                                <option value="4">Epic</option>
                                <option value="5">Test Case Template</option>
                                <option value="5">Test Plan</option>
                            </select>
                        </div>
                        <hr/>
                        <div className="content">
                            content
                        </div>
                    </div>
                    <hr/>
                    <div className="buttons-container form-footer">
нижняя панель с кнопками
                    </div>
                </form>
            </div>
        </div>
    ): null;
};

export default CreateIssue;