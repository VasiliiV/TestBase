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
    {
      id: 3,
      question: 'Что означает статус-код HTTP 201?',
      answers: [
        'Запрос выполнен, но контент отсутствует',
        'Ресурс успешно создан',
        'Нужна дополнительная авторизация',
      ],
      correct: 1,
    },
    {
      id: 4,
      question: 'Что такое smoke testing?',
      answers: [
        'Полное регрессионное тестирование',
        'Быстрая проверка ключевых функций',
        'Тестирование производительности',
      ],
      correct: 1,
    },
    {
      id: 5,
      question: 'Что обязательно должно быть в баг-репорте?',
      answers: [
        'Код исправления',
        'Шаги, ожидание и фактический результат',
        'Список всех тест-кейсов',
      ],
      correct: 1,
    },
    {
      id: 6,
      question: 'Эквивалентное разбиение помогает:',
      answers: [
        'Сгенерировать больше тестов',
        'Сократить количество тестов, сохранив покрытие',
        'Автоматизировать тесты без кода',
      ],
      correct: 1,
    },
    {
      id: 7,
      question: 'Что проверяют граничные значения?',
      answers: [
        'Случайные значения из середины диапазона',
        'Минимальные и максимальные допустимые значения',
        'Только отрицательные сценарии',
      ],
      correct: 1,
    },
    {
      id: 8,
      question: 'Что важно проверить при контрактном тестировании API?',
      answers: [
        'Только скорость ответа',
        'Формат данных, типы и обязательные поля',
        'Цвет кнопок в UI',
      ],
      correct: 1,
    },
    {
      id: 9,
      question: 'Какой HTTP-метод считается идемпотентным?',
      answers: ['GET', 'POST', 'PATCH'],
      correct: 0,
    },
    {
      id: 10,
      question: 'Когда нужны миграции базы данных?',
      answers: [
        'Когда меняется схема или структура таблиц',
        'Когда добавляют новый UI экран',
        'Когда меняют цветовую схему',
      ],
      correct: 0,
    },
    {
      id: 11,
      question: 'Что такое регрессионный баг?',
      answers: [
        'Ошибка, обнаруженная до релиза',
        'Повторно возникшая ошибка после изменений',
        'Опечатка в тексте интерфейса',
      ],
      correct: 1,
    },
    {
      id: 12,
      question: 'Какой код статуса отвечает за отсутствие авторизации?',
      answers: ['200', '401', '500'],
      correct: 1,
    },
    {
      id: 13,
      question: 'Что такое тест-кейс?',
      answers: [
        'Описание шагов и ожидаемого результата',
        'Список багов в релизе',
        'График нагрузки системы',
      ],
      correct: 0,
    },
    {
      id: 14,
      question: 'Что важно проверить в API пагинации?',
      answers: [
        'Только наличие кнопки “Далее”',
        'Поля page/limit/total и корректность следующей страницы',
        'Цвет индикатора загрузки',
      ],
      correct: 1,
    },
    {
      id: 15,
      question: 'Что означает статус-код HTTP 400?',
      answers: [
        'Серверная ошибка',
        'Неверный запрос клиента',
        'Ресурс создан',
      ],
      correct: 1,
    },
    {
      id: 16,
      question: 'Что такое pairwise тестирование?',
      answers: [
        'Проверка всех комбинаций параметров',
        'Проверка каждой пары значений параметров',
        'Проверка только позитивных сценариев',
      ],
      correct: 1,
    },
    {
      id: 17,
      question: 'Зачем проверять формат ошибок в API?',
      answers: [
        'Чтобы ускорить UI-анимации',
        'Чтобы клиенты могли стабильно обрабатывать ошибки',
        'Чтобы уменьшить размер CSS',
      ],
      correct: 1,
    },
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
    <div className="exam-shell">
      <div className="exam-card">
        <div className="exam-header">
          <span className="pill">Экзамен</span>
          <h1>Экзамен по тестированию</h1>
          <p>Проверь знания по базовым темам: HTML, Git и тест-дизайн.</p>
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
          <button className="btn btn-primary exam-submit" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Exam;
