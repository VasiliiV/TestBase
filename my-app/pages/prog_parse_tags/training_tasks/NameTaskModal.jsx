import React from "react";

function NameTaskModal({ onClose }) {
    return (
        <div className="training-modal__backdrop" onClick={onClose}>
            <div className="training-modal" onClick={(event) => event.stopPropagation()}>
                <div className="training-modal__header">
                    <div>
                        <span className="pill">Practice</span>
                        <h2>Name field and database check</h2>
                    </div>
                    <button className="btn btn-ghost" type="button" onClick={onClose}>
                        Close
                    </button>
                </div>
                <div className="training-modal__body">
                    <p>
                        Goal — practice reading requests in DevTools and comparing data with the database. Treat it as
                        a mini traceability lab between UI, API, and storage.
                    </p>
                    <ol>
                        <li>In the “Test fields” block, enable the “Name” checkbox and enter a value with unicode and emoji.</li>
                        <li>Click “Save” and in DevTools → Network inspect the POST `/api/click` (headers, payload, status).</li>
                        <li>Click “Show name” in the profile — the value should appear without trimming or encoding issues.</li>
                        <li>Check the record in the PostgreSQL `tags` table (via `psql` or any client) and confirm `created_at` is stored.</li>
                        <li>Repeat with an empty string and long string (256+ chars) to see how validation behaves end-to-end.</li>
                    </ol>
                    <div className="training-modal__hint">
                        Example database query:
                        <pre>
                            <code>SELECT name, age, created_at FROM tags ORDER BY id DESC LIMIT 1;</code>
                        </pre>
                    </div>
                    <p>
                        If you notice UI/UX issues, describe them and create a bug report via “New bug report”. Capture
                        all evidence (request, DB row, UI state) in a single note.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NameTaskModal;
