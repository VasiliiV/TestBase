import React, { useEffect, useState } from "react";
import CreateIssue from "../create_issue/CreateIssue";
import CreateTestCase from "../create_test_case/CreateTestCase";
import NameTaskModal from "../training_tasks/NameTaskModal";
import JuniorTaskModal from "../training_tasks/JuniorTaskModal";
import { useRouter } from 'next/router'; 
    
const SectionImage = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");

    // State для управления модальными окнами
    const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);
    const [isCreateTestCaseOpen, setIsCreateTestCaseOpen] = useState(false);
    const [isNameTaskOpen, setIsNameTaskOpen] = useState(false);
    const [isJuniorTaskOpen, setIsJuniorTaskOpen] = useState(false);
    const [issues, setIssues] = useState([]);
    const [testCases, setTestCases] = useState([]);

    // Функция для получения токена из localStorage
    const getToken = () => localStorage.getItem('token');

    const fetchWithToken = (url, method) => {
        const token = getToken();
        if (!token) {
            console.log('Токен не найден, пожалуйста, авторизуйтесь.');
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
            console.log('Токен не найден, пожалуйста, авторизуйтесь.');
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
            // Возможная обработка ответа
        }
    };

    const deleteClickTask = async () => {
        await loadData();
    };

    const navigateToExam = () => {
        router.push('/exam'); // убедитесь, что маршрут соответствует пути вашей страницы экзамена
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
                <p className="profile-label">Профиль тестировщика</p>
                <h3 className="profile-name">{userName || "Твоё имя появится здесь"}</h3>
                <p className="profile-subtitle">Заполни данные, чтобы проверить сохранение.</p>
            </div>
            <img src="/multfilm_gomer.png" alt="" className="profile-avatar" />
            <div className="profile-actions">
                <button className="btn btn-ghost" type="button" onClick={handleClick}>
                    Показать имя
                </button>
                <button className="btn btn-ghost" type="button" onClick={deleteClick}>
                    Очистить имя
                </button>
                <button className="btn btn-primary" type="button" onClick={() => setIsCreateTestCaseOpen(true)}>
                    Новый тест-кейс
                </button>
                <button className="btn btn-primary" type="button" onClick={() => setIsCreateIssueOpen(true)}>
                    Новый баг-репорт
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setIsNameTaskOpen(true)}>
                    Инструкция: имя
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => setIsJuniorTaskOpen(true)}>
                    Задания для джуна
                </button>
                <button className="btn btn-ghost" type="button" onClick={deleteClickTask}>
                    Обновить списки
                </button>
                <button className="btn btn-ghost" type="button" onClick={navigateToExam}>
                    Пройти экзамен
                </button>
            </div>
        </div>
        <div className="training-panels">
            <section className="training-panel">
                <div className="training-panel__header">
                    <h3>Тест-кейсы</h3>
                    <span className="pill">{testCases.length}</span>
                </div>
                {testCases.length === 0 ? (
                    <p className="training-panel__empty">Пока нет тест-кейсов. Создай первый.</p>
                ) : (
                    <ul className="training-panel__list">
                        {testCases.map((testCase) => (
                            <li className="training-panel__item" key={testCase.id}>
                                <div className="training-panel__title">{testCase.title}</div>
                                <div className="training-panel__meta">{testCase.tags || "Без тегов"} · {formatDate(testCase.createdAt)}</div>
                                <button
                                    className="btn btn-ghost"
                                    type="button"
                                    onClick={() => handleDeleteTestCase(testCase.id)}
                                >
                                    Удалить
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <section className="training-panel">
                <div className="training-panel__header">
                    <h3>Баг-репорты</h3>
                    <span className="pill">{issues.length}</span>
                </div>
                {issues.length === 0 ? (
                    <p className="training-panel__empty">Пока нет багов. Заведи первый репорт.</p>
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
                                    Удалить
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
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
    </section>
    );
};
export default SectionImage;
