import { useState } from "react";

function CreateIssue({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        project: "",
        issueType: "",
        originalEstimate: "",
        remainingEstimate: "",
        severity: "",
        priority: "",
        affectsVersions: "",
        fixVersions: "",
        build: "",
        assignee: "",
        component: "",
        summary: "",
        description: "",
        stepsToReproduce: "",
        attachment: "",
        labels: "",
        client: "",
        linkedIssues: "",
        issue: "",
        qa: "",
        environment: "",
        epicLink: "",
        plannedStart: "",
        plannedFinish: "",
        customerContacts: "",
        sprint: "",
      });
    
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
    
      const createTask = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.log("Token not found. Please sign in.");
            return;
          }

          const response = await fetch("/api/bags", {
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
              summary: data.data?.summary || formData.summary || "Untitled",
              issueType: data.data?.issue_type || formData.issueType || "Bug",
              severity: data.data?.severity || formData.severity || "Medium",
              priority: data.data?.priority || formData.priority || "Medium",
            });
          }
          handleClose();
        } catch (error) {
          console.error(error);
        }
      };
        

    return (
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
                </div>
            </div>
            <div className="dialog-content">
                <form action="" className="aui">
                    <div className="form-body">
                        <div className="group__form-body">
                            <h3>Project</h3>
                            <select name="project" className="select__form-body" value={formData.project} onChange={handleChange}>
                                <option value="" disabled>Choose a project ...</option>
                                <option value="TestBase">TestBase</option>
                            </select>
                        </div>
                        <div className="group__form-body">
                            <h3>Issue Type</h3>
                            <select name="issueType" className="select__form-body" value={formData.issueType} onChange={handleChange}>
                                <option value="" disabled>Choose a type ...</option>
                                <option value="Bug">Bug</option>
                                <option value="Task">Task</option>
                                <option value="Story">Story</option>
                                <option value="Epic">Epic</option>
                                <option value="Test Case Template">Test Case Template</option>
                                <option value="Test Plan">Test Plan</option>
                            </select>
                        </div>
                        <hr/>
                        <div className="content">
                            <div className="content_estimate">
                                <h3>Original Estimate</h3>
                                <input type="text" name="originalEstimate" value={formData.originalEstimate} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Remaining Estimate</h3>
                                <input type="text" name="remainingEstimate" value={formData.remainingEstimate} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Severity</h3>
                                <input type="text" name="severity" value={formData.severity} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Priority</h3>
                                <select name="priority" className="select__form-body" value={formData.priority} onChange={handleChange}>
                                    <option value="" disabled>Choose a priority ...</option>
                                    <option value="Highest">Highest</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    <option value="Lowest">Lowest</option>
                            </select>
                            </div>
                            <div className="content_estimate">
                                <h3>Affects Version/s</h3>
                                <select name="affectsVersions" className="select__form-body" value={formData.affectsVersions} onChange={handleChange}>
                                    <option value="" disabled>Choose a version ...</option>
                                    <option value="1.14.1">1.14.1</option>
                                    <option value="1.14.0">1.14.0</option>
                                    <option value="1.13.0">1.13.0</option>
                                    <option value="1.12.0">1.12.0</option>
                                    <option value="1.11.0">1.11.0</option>
                                </select>
                            </div>
                            <div className="content_estimate">
                                <h3>Fix Version/s</h3>
                                <select name="fixVersions" className="select__form-body" value={formData.fixVersions} onChange={handleChange}>
                                    <option value="" disabled>Choose a version ...</option>
                                    <option value="1.14.1">1.14.1</option>
                                    <option value="1.14.0">1.14.0</option>
                                    <option value="1.13.0">1.13.0</option>
                                    <option value="1.12.0">1.12.0</option>
                                    <option value="1.11.0">1.11.0</option>
                                </select>
                            </div>
                            <div className="content_estimate">
                                <h3>build</h3>
                                <input type="text" name="build" value={formData.build} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Assignee</h3>
                                <select name="assignee" className="select__form-body" value={formData.assignee} onChange={handleChange}>
                                    <option value="" disabled>Choose an assignee ...</option>
                                    <option value="Vasilii Volgin">Vasilii Volgin</option>
                                    <option value="Feda Pupkin">Feda Pupkin</option>
                                    <option value="Alex Doska">Alex Doska</option>
                                    <option value="Anna Fedkina">Anna Fedkina</option>
                                    <option value="Andrei Chuchka">Andrei Chuchka</option>
                                </select>
                            </div>
                            <div className="content_estimate">
                                <h3>Component/s</h3>
                                <input type="text" name="component" value={formData.component} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Summary</h3>
                                <input type="text" name="summary" value={formData.summary} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Description</h3>
                                <textarea name="description" cols="30" rows="10" maxLength={255} value={formData.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="content_estimate">
                                <h3>Steps to reproduce</h3>
                                <textarea name="stepsToReproduce" cols="30" rows="10" maxLength={255} value={formData.stepsToReproduce} onChange={handleChange}></textarea>
                            </div>
                            <div className="content_estimate">
                                <h3>Attachment</h3>
                                <input type="text" name="attachment" id="attachment" placeholder="Drop files to attach, or browse." value={formData.attachment} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Labels</h3>
                                <input type="text" name="labels" value={formData.labels} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Client</h3>
                                <input type="text" name="client" value={formData.client} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Linked Issues</h3>
                                <input type="text" name="linkedIssues" value={formData.linkedIssues} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Issue</h3>
                                <input type="text" name="issue" value={formData.issue} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>QA</h3>
                                <input type="text" name="qa" value={formData.qa} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Environment</h3>
                                <input type="text" name="environment" value={formData.environment} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Epic Link</h3>
                                <input type="text" name="epicLink" value={formData.epicLink} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Planned start</h3>
                                <input type="text" name="plannedStart" value={formData.plannedStart} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Planned finish</h3>
                                <input type="text" name="plannedFinish" value={formData.plannedFinish} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Customer contacts</h3>
                                <input type="text" name="customerContacts" value={formData.customerContacts} onChange={handleChange}/>
                            </div>
                            <div className="content_estimate">
                                <h3>Sprint</h3>
                                <input type="text" name="sprint" value={formData.sprint} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                
                </form>
                
            </div>
            <div>
            <hr/>
                <div className="buttons-container form-footer">
                    <button className="button_cancel" type="button" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="button_create" type="button" onClick={createTask}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateIssue;
