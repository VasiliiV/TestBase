import React, { useState } from 'react';

function Exam() {
  // Список вопросов экзамена
  const questions = [
    {
      id: 1,
      question: 'Какой элемент HTML отвечает за создание заголовков?',
      answers: ['<br>', '<header>', '<h1> - <h6>'],
      correct: 2,
    },
    {
      id: 2,
      question: 'Для чего используется Git?',
      answers: [
        'Для виртуализации операционных систем',
        'Для контроля версий исходного кода',
        'Для автоматизации сборки приложений',
      ],
      correct: 1,
    },
    // ... остальные вопросы
  ];

  // Состояние для отслеживания текущего выбора пользователя
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerChange = (e, questionId) => {
    const { value } = e.target;
    setUserAnswers((prev) => ({ ...prev, [questionId]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;

    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correct) {
        score += 1;
      }
    });

    alert(`Вы набрали ${score} из ${questions.length} правильных ответов.`);
    // Здесь можно также отправить результаты на сервер или обработать иначе, в зависимости от ваших требований.
  };

  return (
    <div className="exam">
      <h1>Экзамен по тестированию</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id} className="exam-question">
            <p>{q.question}</p>
            {q.answers.map((answer, index) => (
              <label key={index}>
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
        ))}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default Exam;
