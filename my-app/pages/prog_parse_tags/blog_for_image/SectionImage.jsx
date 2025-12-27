import React, { useEffect, useState } from "react";
import CreateIssue from "../create_issue/CreateIssue";
import CreateTestCase from "../create_test_case/CreateTestCase";
import NameTaskModal from "../training_tasks/NameTaskModal";
import JuniorTaskModal from "../training_tasks/JuniorTaskModal";
import EngineerTaskModal from "../training_tasks/EngineerTaskModal";
import { useRouter } from 'next/router';
    
const SectionImage = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");

    const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);
    const [isCreateTestCaseOpen, setIsCreateTestCaseOpen] = useState(false);
    const [isNameTaskOpen, setIsNameTaskOpen] = useState(false);
    const [isJuniorTaskOpen, setIsJuniorTaskOpen] = useState(false);
    const [isEngineerTaskOpen, setIsEngineerTaskOpen] = useState(false);
    const [issues, setIssues] = useState([]);
    const [testCases, setTestCases] = useState([]);

    const engineeringMissions = [
        {
            title: "Contract & schema guardrails",
            description: "Write a checklist for status codes, enums, and pagination metadata across /api/tasks and /api/bags.",
            tag: "API quality",
        },
        {
            title: "Traceable defect report",
            description: "Capture UI steps, the request/response pair, and a DB snapshot that proves the inconsistency.",
            tag: "Observability",
        },
        {
            title: "Automation spike",
            description: "Prototype a headless flow that signs in, saves data, and asserts isolation between two users.",
            tag: "CI-ready",
        },
        {
            title: "Resilience drill",
            description: "Simulate a failed dependency by forcing 500s and assert retries or error messaging stay consistent.",
            tag: "Reliability",
        },
    ];

    const getToken = () => localStorage.getItem('token');

    const fetchWithToken = (url, method) => {
        const token = getToken();
        if (!token) {
            console.log('Token not found. Please sign in.');
            return;
        }

        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    };

    const fetchJsonWithToken = async (url, method, body) => {
        const token = getToken();
        if (!token) {
            console.log('Token not found. Please sign in.');
            return null;
        }

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();
        if (!response.ok) {
            console.error(data);
            return null;
        }

        return data;
    };

    const loadData = async () => {
        const [issuesResponse, testCasesResponse] = await Promise.all([
            fetchJsonWithToken('/api/bags', 'GET'),
            fetchJsonWithToken('/api/tasks', 'GET'),
        ]);

        if (issuesResponse?.data) {
            setIssues(
                issuesResponse.data.map((issue) => ({
                    ...issue,
                    createdAt: issue.created_at,
                    issueType: issue.issue_type,
                }))
            );
        }
        if (testCasesResponse?.data) {
            setTestCases(
                testCasesResponse.data.map((testCase) => ({
                    ...testCase,
                    createdAt: testCase.created_at,
                }))
            );
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleClick = async () => {
        const response = await fetchWithToken('/api/click', 'GET');
        if (response) {
            const data = await response.json();
            setUserName(data.name);
        }
    };

    const deleteClick = async () => {
        const response = await fetchWithToken('/api/click', 'DELETE');
        if (response) {
            // Optional response handling
        }
    };

    const deleteClickTask = async () => {
        await loadData();
    };

    const navigateToExam = () => {
        router.push('/exam');
    };

    const handleSaveIssue = (issue) => {
        setIssues((prevIssues) => [issue, ...prevIssues]);
    };

    const handleSaveTestCase = (testCase) => {
        setTestCases((prevCases) => [testCase, ...prevCases]);
    };

    const handleDeleteIssue = async (id) => {
        const result = await fetchJsonWithToken(`/api/bags?id=${id}`, 'DELETE');
        if (result) {
            setIssues((prevIssues) => prevIssues.filter((issue) => issue.id !== id));
        }
    };

    const handleDeleteTestCase = async (id) => {
        const result = await fetchJsonWithToken(`/api/tasks?id=${id}`, 'DELETE');
        if (result) {
            setTestCases((prevCases) => prevCases.filter((testCase) => testCase.id !== id));
        }
    };

    const formatDate = (value) => {
        try {
            return new Date(value).toLocaleString();
        } catch {
            return value;
        }
    };
return (
    <section className="training-shell">
        <div className="profile-card">
            <div>
                <p className="profile-label">QA profile</p>
                <h3 className="profile-name">{userName || "Your name will appear here"}</h3>
                <p className="profile-subtitle">Fill in the data to confirm it is saved.</p>
            </div>
            <img src="/multfilm_gomer.png" alt="" className="profile-avatar" />
            <div className="profile-actions">
                <button className="btn btn-ghost" type="button" onClick={handleClick}>
                    Show name
                </button>
                <button className="btn btn-ghost" type="button" onClick={deleteClick}>
                    Clear name
                </button>
                <button className="btn btn-primary" type="button" onClick={() => setIsCreateTestCaseOpen(true)}>
                    New test case
                </button>
                <button className="btn btn-primary" type="button" onClick={() => setIsCreateIssueOpen(true)}>
                    New bug report
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setIsNameTaskOpen(true)}>
                    Tutorial: name field
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setIsJuniorTaskOpen(true)}>
                    Tasks for junior QA
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setIsEngineerTaskOpen(true)}>
                    Engineering missions
                </button>
                <button className="btn btn-ghost" type="button" onClick={deleteClickTask}>
                    Refresh lists
                </button>
                <button className="btn btn-ghost" type="button" onClick={navigateToExam}>
                    Take the exam
                </button>
            </div>
        </div>
        <div className="training-panels">
            <section className="training-panel">
                <div className="training-panel__header">
                    <h3>Test cases</h3>
                    <span className="pill">{testCases.length}</span>
                </div>
                {testCases.length === 0 ? (
                    <p className="training-panel__empty">No test cases yet. Create the first one.</p>
                ) : (
                    <ul className="training-panel__list">
                        {testCases.map((testCase) => (
                            <li className="training-panel__item" key={testCase.id}>
                                <div className="training-panel__title">{testCase.title}</div>
                                <div className="training-panel__meta">{testCase.tags || "No tags"} · {formatDate(testCase.createdAt)}</div>
                                <button
                                    className="btn btn-ghost"
                                    type="button"
                                    onClick={() => handleDeleteTestCase(testCase.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <section className="training-panel">
                <div className="training-panel__header">
                    <h3>Bug reports</h3>
                    <span className="pill">{issues.length}</span>
                </div>
                {issues.length === 0 ? (
                    <p className="training-panel__empty">No bugs yet. File the first report.</p>
                ) : (
                    <ul className="training-panel__list">
                        {issues.map((issue) => (
                            <li className="training-panel__item" key={issue.id}>
                                <div className="training-panel__title">{issue.summary}</div>
                                <div className="training-panel__meta">{issue.issueType} · {issue.severity} · {issue.priority}</div>
                                <button
                                    className="btn btn-ghost"
                                    type="button"
                                    onClick={() => handleDeleteIssue(issue.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <section className="training-panel training-panel--muted">
                <div className="training-panel__header">
                    <h3>Engineering practice board</h3>
                    <span className="pill">{engineeringMissions.length}</span>
                </div>
                <ul className="training-panel__list">
                    {engineeringMissions.map((mission) => (
                        <li className="training-panel__item" key={mission.title}>
                            <div className="training-panel__title">{mission.title}</div>
                            <div className="training-panel__meta">{mission.tag}</div>
                            <p className="training-panel__description">{mission.description}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
        {isCreateIssueOpen && (
            <CreateIssue
                onClose={() => setIsCreateIssueOpen(false)}
                onSave={handleSaveIssue}
            />
        )}
        {isCreateTestCaseOpen && (
            <CreateTestCase
                onClose={() => setIsCreateTestCaseOpen(false)}
                onSave={handleSaveTestCase}
            />
        )}
        {isNameTaskOpen && (
            <NameTaskModal onClose={() => setIsNameTaskOpen(false)} />
        )}
        {isJuniorTaskOpen && (
            <JuniorTaskModal onClose={() => setIsJuniorTaskOpen(false)} />
        )}
        {isEngineerTaskOpen && (
            <EngineerTaskModal onClose={() => setIsEngineerTaskOpen(false)} />
        )}
    </section>
    );
};
export default SectionImage;
