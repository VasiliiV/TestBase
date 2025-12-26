import { useState } from "react";

function CreateTestCase({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        scenario: "",
        comments: "",
        tags: "",
        issuesLinks: "",
        testKeys: "",
        members: "",
        fields: "",
        relations: "",
        mutes: "",
      });
    const [createdAt] = useState(() => new Date().toISOString());

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Токен не найден, пожалуйста, авторизуйтесь.");
                return;
            }

            const response = await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                console.error(data);
                return;
            }

            if (onSave) {
                onSave({
                    id: data.data?.id,
                    createdAt: data.data?.created_at,
                    title: data.data?.title || formData.title || "Без названия",
                    tags: data.data?.tags || formData.tags,
                    description: data.data?.description || formData.description,
                });
            }
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };
      
    return (
        <div className="testCase">
           <div className="_Pane">
                
                <div className="testCase__header">
                    <h2>Test Case</h2>
                    <button onClick={handleClose} className="closeButton">
                        Close
                    </button>
                    <hr/>
                </div>
                
                <div className="testCase__content">
                    <div className="testCaseOverview">
                        <div className="testCaseOverview__primary">
                            <div className="Description">
                                <section>
                                    <h3 className="Description__header">
                                        <div className="Description__name">
                                            Title
                                        </div>
                                    </h3>
                                    <div className="Description__content">
                                        <div>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="Короткий заголовок тест-кейса"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="Description">
                                <section>
                                    <h3 className="Description__header">
                                        <div className="Description__name">
                                            Description
                                        </div>
                                    </h3>
                                    <div className="Description__content">
                                        <div>
                                            <textarea
                                                name="description"
                                                cols="30"
                                                rows="10"
                                                maxLength={255}
                                                value={formData.description}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="Scenario">
                                <section>
                                    <h3 className="Scenario__header">
                                        <div className="Scenario__name">
                                            Scenario
                                        </div>
                                    </h3>
                                    <div className="Scenario__content">
                                        <div>
                                            <textarea
                                                name="scenario"
                                                cols="30"
                                                rows="10"
                                                maxLength={255}
                                                value={formData.scenario}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="Comments">
                                <section>
                                    <h3 className="Comments__header">
                                        <div className="Comments__name">
                                        Comments
                                        </div>
                                    </h3>
                                    <div className="Comments__content">
                                        <div>
                                            <textarea
                                                name="comments"
                                                cols="30"
                                                rows="10"
                                                maxLength={255}
                                                value={formData.comments}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div className="TestCaseOverview__secondary">
                            <div className="TestCaseOverview__created-date">
                                <span className="DateTime">{new Date(createdAt).toLocaleDateString()} </span>
                                <span className="DateTime">{new Date(createdAt).toLocaleTimeString()}</span>
                            </div>
                            <div className="EditableModal">
                            <div>
                                <h3>Tags</h3>
                            </div>
                            <div>
                                <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Issues links</h3>
                            </div>
                            <div>
                                <input type="text" name="issuesLinks" value={formData.issuesLinks} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Test keys</h3>
                            </div>
                            <div>
                                <input type="text" name="testKeys" value={formData.testKeys} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Members</h3>
                            </div>
                            <div>
                                <input type="text" name="members" value={formData.members} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Fields</h3>
                            </div>
                            <div>
                                <input type="text" name="fields" value={formData.fields} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Relations</h3>
                            </div>
                            <div>
                                <input type="text" name="relations" value={formData.relations} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Mutes</h3>
                            </div>
                            <div>
                                <input type="text" name="mutes" value={formData.mutes} onChange={handleChange} />
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
                <div className="testCase__footer">
                    <hr/>
                    <div className="buttons-container form-footer">
                        <button className="button_cancel" type="button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="button_create" type="button" onClick={handleSave}>
                            Save test case
                        </button>
                    </div>
                </div>
           </div>
        </div>
    );
    };

export default CreateTestCase;
