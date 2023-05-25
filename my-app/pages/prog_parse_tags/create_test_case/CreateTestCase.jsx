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
                        <div className="content_estimate">
                            <input type="text" name="" id="" placeholder="Name test case" className="inputTestCase__name"/>
                        </div>
                    </div>
                    <div className="testCaseOverview__secondary">
                        
                    </div>
                </div>
            </div>
        </div>
    ): null;
};

export default CreateTestCase;