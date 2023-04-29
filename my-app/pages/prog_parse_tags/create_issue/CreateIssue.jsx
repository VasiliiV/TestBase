import { useState } from "react";

function CreateIssue() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    }
    

    return isOpen ? (
        <div className="dialog-for-task">
            <div className="dialog-heading__basic">
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
                    <h4 title="Create Issue">from Jira</h4>
                </div>
                <hr/>
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
                                <option value="1">Bug</option>
                                <option value="2">Task</option>
                                <option value="3">Story</option>
                                <option value="4">Epic</option>
                                <option value="5">Test Case Template</option>
                                <option value="5">Test Plan</option>
                            </select>
                        </div>
                        <hr/>
                        <div className="content">
                            <div className="content_estimate">
                                <h3>Original Estimate</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Remaining Estimate</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Severity</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Priority</h3>
                                <select className="select__form-body">
                                    <option value="DEFAULT" disabled>Choose a salutation ...</option>
                                    <option value="1">Highest</option>
                                    <option value="2">High</option>
                                    <option value="3">Medium</option>
                                    <option value="4">Low</option>
                                    <option value="5">Lowest</option>
                            </select>
                            </div>
                            <div className="content_estimate">
                                <h3>Affects Version/s</h3>
                                <select className="select__form-body">
                                    <option value="DEFAULT" disabled>Choose a salutation ...</option>
                                    <option value="1"> </option>
                                    <option value="1">1.14.1</option>
                                    <option value="2">1.14.0</option>
                                    <option value="3">1.13.0</option>
                                    <option value="4">1.12.0</option>
                                    <option value="5">1.11.0</option>
                                </select>
                            </div>
                            <div className="content_estimate">
                                <h3>Fix Version/s</h3>
                                <select className="select__form-body">
                                    <option value="DEFAULT" disabled>Choose a salutation ...</option>
                                    <option value="1"> </option>
                                    <option value="1">1.14.1</option>
                                    <option value="2">1.14.0</option>
                                    <option value="3">1.13.0</option>
                                    <option value="4">1.12.0</option>
                                    <option value="5">1.11.0</option>
                                </select>
                            </div>
                            <div className="content_estimate">
                                <h3>build</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Assignee</h3>
                                <select className="select__form-body">
                                    <option value="DEFAULT" disabled>Choose a salutation ...</option>
                                    <option value="1">Vasilii Volgin</option>
                                    <option value="2">Feda Pupkin</option>
                                    <option value="3">Alex Doska</option>
                                    <option value="4">Anna Fedkina</option>
                                    <option value="5">Andrei Chuchka</option>
                                </select>
                            </div>
                            <div className="content_estimate">
                                <h3>Component/s</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Summary</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Description</h3>
                                <textarea name="" id="" cols="30" rows="10" maxLength={255}></textarea>
                            </div>
                            <div className="content_estimate">
                                <h3>Шаги для воспроизведения</h3>
                                <textarea name="" id="" cols="30" rows="10" maxLength={255}></textarea>
                            </div>
                            <div className="content_estimate">
                                <h3>Attachment</h3>
                                <input type="text" name="" id="attachment" placeholder="Drop files to attach, or browse."/>
                            </div>
                            <div className="content_estimate">
                                <h3>Labels</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Клиент</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Linked Issues</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Issue</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>QA</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Environment</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Epic Link</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Planned start</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Planned finish</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Контакты клиента</h3>
                                <input type="text" name="" id="" />
                            </div>
                            <div className="content_estimate">
                                <h3>Sprint</h3>
                                <input type="text" name="" id="" />
                            </div>
                        </div>
                    </div>
                
                </form>
                
            </div>
            <div>
            <hr/>
                <div className="buttons-container form-footer">
                    <button className="button_cancel" type="button">
                        Cancel
                    </button>
                    <button className="button_create" type="button">
                        Create
                    </button>
                </div>
            </div>
        </div>
    ): null;
};

export default CreateIssue;