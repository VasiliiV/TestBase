import React, { useState } from 'react';

function Exam() {
  const questions = [
    {
      id: 1,
      question: 'What is the main goal of consumer contract tests?',
      answers: [
        'Catch UI typos before release',
        'Ensure backend responses stay compatible for clients',
        'Speed up rendering in the browser',
      ],
      correct: 1,
      topic: 'API contracts',
    },
    {
      id: 2,
      question: 'Which HTTP methods must remain idempotent in this sandbox?',
      answers: ['GET and DELETE', 'POST for new resources', 'Any request with a JSON body'],
      correct: 0,
      topic: 'API basics',
    },
    {
      id: 3,
      question: 'When should the server return HTTP 401?',
      answers: ['When authentication is missing or invalid', 'When payload is malformed', 'When the server crashed'],
      correct: 0,
      topic: 'API basics',
    },
    {
      id: 4,
      question: 'What does HTTP status code 201 mean?',
      answers: [
        'Request succeeded but there is no content',
        'Resource successfully created',
        'Client should retry later',
      ],
      correct: 1,
      topic: 'HTTP semantics',
    },
    {
      id: 5,
      question: 'What must a strong bug report include?',
      answers: [
        'Only a screenshot of the issue',
        'Steps, expected vs actual result, and environment details',
        'Suggested code fix from the tester',
      ],
      correct: 1,
      topic: 'Process',
    },
    {
      id: 6,
      question: 'What do boundary values check?',
      answers: [
        'Random values in the middle of the range',
        'Minimum and maximum allowed values',
        'Only negative scenarios',
      ],
      correct: 1,
      topic: 'Test design',
    },
    {
      id: 7,
      question: 'What is pairwise testing?',
      answers: [
        'Testing every combination of parameters',
        'Testing each pair of parameter values to reduce combinations',
        'Testing only positive scenarios',
      ],
      correct: 1,
      topic: 'Test design',
    },
    {
      id: 8,
      question: 'Why propagate correlation IDs across UI → API calls?',
      answers: [
        'To randomize payloads for security',
        'To trace a request across logs and pinpoint failures',
        'To speed up JSON parsing',
      ],
      correct: 1,
      topic: 'Observability',
    },
    {
      id: 9,
      question: 'When do mocks or stubs help the most?',
      answers: [
        'When a dependency is slow or unavailable and you need repeatable scenarios',
        'When UI colors must be tested',
        'When you want to bypass all validations',
      ],
      correct: 0,
      topic: 'Automation',
    },
    {
      id: 10,
      question: 'How do you prevent data leakage between users in tests?',
      answers: [
        'Share one global token across everyone',
        'Use dedicated users/fixtures and clean up created data per scenario',
        'Disable authentication checks',
      ],
      correct: 1,
      topic: 'Data isolation',
    },
    {
      id: 11,
      question: 'What is a regression bug?',
      answers: [
        'A defect found only in staging',
        'A reappearing defect after changes or deployments',
        'A typo in interface text',
      ],
      correct: 1,
      topic: 'Process',
    },
    {
      id: 12,
      question: 'What should a QA-focused CI gate include?',
      answers: [
        'Only manual exploratory sessions',
        'Smoke tests for API + UI + DB migrations that fail fast on errors',
        'Deploy without any validation to save time',
      ],
      correct: 1,
      topic: 'CI/CD',
    },
    {
      id: 13,
      question: 'Why validate error response formats in API tests?',
      answers: [
        'To let clients handle failures consistently and build robust parsing',
        'To reduce CSS size',
        'To speed up animations',
      ],
      correct: 0,
      topic: 'API contracts',
    },
    {
      id: 14,
      question: 'What matters when testing API pagination?',
      answers: [
        'Only the presence of a “Next” button',
        'page/limit/total fields, deterministic ordering, and correct next page',
        'Loading indicator color',
      ],
      correct: 1,
      topic: 'API basics',
    },
  ];

  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswerChange = (e, questionId) => {
    const { value } = e.target;
    setUserAnswers((prev) => ({ ...prev, [questionId]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    const topicTotals = {};
    const topicScores = {};

    questions.forEach((q) => {
      topicTotals[q.topic] = (topicTotals[q.topic] || 0) + 1;
      if (userAnswers[q.id] === q.correct) {
        score += 1;
        topicScores[q.topic] = (topicScores[q.topic] || 0) + 1;
      }
    });

    const topicBreakdown = Object.keys(topicTotals).map((topic) => ({
      topic,
      correct: topicScores[topic] || 0,
      total: topicTotals[topic],
    }));

    const gaps = topicBreakdown.filter((item) => item.correct < item.total);

    setResult({
      score,
      total: questions.length,
      topicBreakdown,
      summary:
        gaps.length === 0
          ? 'Outstanding — you are ready to automate and mentor.'
          : `Focus next on: ${gaps.map((item) => item.topic).join(', ')}`,
    });
  };

  return (
    <div className="exam-shell">
      <div className="exam-card">
        <div className="exam-header">
          <span className="pill">Exam</span>
          <h1>Testing engineering exam</h1>
          <p>Validate your readiness across API quality, observability, automation, and process rigor.</p>
        </div>
        <form onSubmit={handleSubmit} className="exam-form">
          {questions.map((q) => (
            <div key={q.id} className="exam-question">
              <p>{q.question}</p>
              <div className="exam-answers">
                {q.answers.map((answer, index) => (
                  <label key={index} className="exam-option">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={index}
                      required
                      onChange={(e) => handleAnswerChange(e, q.id)}
                    />
                    {answer}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-primary exam-submit" type="submit">Submit</button>
        </form>
        {result && (
          <div className="exam-results" aria-live="polite">
            <div className="exam-results__summary">
              <h3>Results</h3>
              <p>You scored {result.score} out of {result.total}.</p>
              <p>{result.summary}</p>
            </div>
            <div className="exam-breakdown">
              {result.topicBreakdown.map((item) => (
                <div key={item.topic} className="exam-breakdown__item">
                  <span>{item.topic}</span>
                  <strong>{item.correct}/{item.total}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;
