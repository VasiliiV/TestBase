import React from "react";

function JuniorTaskModal({ onClose }) {
    return (
        <div className="training-modal__backdrop" onClick={onClose}>
            <div className="training-modal" onClick={(event) => event.stopPropagation()}>
                <div className="training-modal__header">
                    <div>
                        <span className="pill">Junior QA</span>
                        <h2>Tasks for a junior QA engineer</h2>
                    </div>
                    <button className="btn btn-ghost" type="button" onClick={onClose}>
                        Close
                    </button>
                </div>
                <div className="training-modal__body">
                    <p>Select 2–3 tasks and document test cases or bugs based on the results. Cover both happy and risky paths.</p>
                    <ul>
                        <li>API contracts: verify required fields, enum values, and timestamp formats for `/api/tasks` and `/api/bags`.</li>
                        <li>Negative checks: missing token must be `401`; deletion without `id` should return `400` with a clear error body.</li>
                        <li>Data migration: confirm `create_task` records moved to `task` and legacy rows landed in `bags` without data loss.</li>
                        <li>Test design: build equivalence classes and boundary tables for “Name” and “Age” and try them in UI + API.</li>
                        <li>Reliability: verify GET is idempotent, errors share the same JSON shape, and retries do not duplicate data.</li>
                        <li>Isolation: prove different users cannot see each other’s test cases or bugs through UI or API responses.</li>
                    </ul>
                    <p>
                        If something diverges from expectations or documentation, log defects in bug reports. Note how you would
                        automate the scenario in CI.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default JuniorTaskModal;
