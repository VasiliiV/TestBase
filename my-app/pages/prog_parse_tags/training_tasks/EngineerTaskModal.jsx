import React from "react";

function EngineerTaskModal({ onClose }) {
    return (
        <div className="training-modal__backdrop" onClick={onClose}>
            <div className="training-modal" onClick={(event) => event.stopPropagation()}>
                <div className="training-modal__header">
                    <div>
                        <span className="pill">QA Engineer</span>
                        <h2>Engineering-focused practice</h2>
                    </div>
                    <button className="btn btn-ghost" type="button" onClick={onClose}>
                        Close
                    </button>
                </div>
                <div className="training-modal__body">
                    <p>
                        Use these missions to move from manual checks to engineering-grade testing.
                        Each task should end with notes, artifacts, and a short readme on how to repeat it.
                    </p>
                    <h4>API & contract reliability</h4>
                    <ul>
                        <li>Design consumer contract tests for <code>/api/tasks</code> and <code>/api/bags</code> covering happy and failure paths.</li>
                        <li>Validate pagination and sorting determinism with fixed seeds and the same assertions in UI and API.</li>
                        <li>Break schemas on purpose: remove a required field or change the type and check that validators block the change.</li>
                    </ul>
                    <h4>Automation & CI discipline</h4>
                    <ul>
                        <li>Create a headless regression that signs in, saves a name/age pair, and confirms persistence through API + DB.</li>
                        <li>Add a smoke job that fails fast when <code>401/403</code> appear in protected endpoints, and surface the log artifact.</li>
                        <li>Document flaky test detection: run the same suite 5x and capture instability stats.</li>
                    </ul>
                    <h4>Data, observability, and safety</h4>
                    <ul>
                        <li>Seed isolated data sets per user; prove cross-account isolation by querying <code>sqlite/parsetags.db</code>.</li>
                        <li>Trace a request: include correlation IDs in UI → API calls and assert they travel to responses and logs.</li>
                        <li>Security hygiene: attempt mass assignment (extra JSON fields) and verify the server ignores them.</li>
                    </ul>
                    <div className="training-modal__hint">
                        Suggested checklist for each mission:
                        <pre>
                            <code>- Preconditions and seed data
- Exact steps and tooling (DevTools, cURL, sqlite3)
- Assertions (status, schema, side effects)
- Evidence: screenshots, queries, and logs
- Follow-up: how to automate or monitor the scenario</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EngineerTaskModal;
