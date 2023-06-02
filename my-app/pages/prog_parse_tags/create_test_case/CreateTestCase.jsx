import { useState } from "react";

function CreateTestCase() {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
        setIsOpen(false);
      };
      
    return isOpen ? (
        <div className="testCase">
            <div>
                    <button title="Close" className="button__close" onClick={handleClose}>
                        <span>
                            <mat-icon>
                                <img src="/symbolize-x.png" alt="" className="icon__close"/>
                            </mat-icon> 
                        </span>
                    </button>
                </div>
            <div className="testCase__header">
                <h2>Test Case</h2>
            </div>
            <hr/>
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
                                        <textarea name="" id="" cols="30" rows="10">

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
                                    <div className="Scenario__number">1</div>
                                    <div>
                                        <textarea name="" id="" cols="30" rows="10">
                                            
                                        </textarea>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="testCaseOverview__secondary">
                        
                    </div>
                </div>
            </div>
        </div>
    ):null;
    };

export default CreateTestCase;