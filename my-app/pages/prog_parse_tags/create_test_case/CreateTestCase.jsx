import { useState } from "react";

function CreateTestCase() {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
        setIsOpen(false);
      };
      
    return isOpen ? (
        <div className="testCase">
           <div className="_Pane">
                
                <div className="testCase__header">
                    <h2>Test Case</h2>
                    <hr/>
                </div>
                
                <div className="testCase__content">
                    <div className="testCaseOverview">
                        <div className="testCaseOverview__primary">
                            <div className="Description">
                                <section>
                                    <h3 className="Description__header">
                                        <div className="Description__name">
                                            Description
                                        </div>
                                    </h3>
                                    <div className="Description__content">
                                        <div>
                                            <textarea name="" id="" cols="30" rows="10" maxLength={255}>

                                            </textarea>
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
                                            <textarea name="" id="" cols="30" rows="10" maxLength={255}>
                                                
                                            </textarea>
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
                                            <textarea name="" id="" cols="30" rows="10" maxLength={255}>
                                                
                                            </textarea>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div className="TestCaseOverview__secondary">
                            <div className="TestCaseOverview__created-date">
                                <span className="DateTime">2023-06-27 </span>
                                <span className="DateTime">15:17:08</span>
                            </div>
                            <div className="EditableModal">
                            <div>
                                <h3>Tags</h3>
                            </div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Issues links</h3>
                            </div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Test keys</h3>
                            </div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Members</h3>
                            </div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Fields</h3>
                            </div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Relations</h3>
                            </div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="EditableModal">
                            <div>
                                <h3>Mutes</h3>
                            </div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
           </div>
        </div>
    ):null;
    };

export default CreateTestCase;