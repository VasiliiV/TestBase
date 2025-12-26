import React from "react";

function NameTaskModal({ onClose }) {
    return (
        <div className="training-modal__backdrop" onClick={onClose}>
            <div className="training-modal" onClick={(event) => event.stopPropagation()}>
                <div className="training-modal__header">
                    <div>
                        <span className="pill">Практика</span>
                        <h2>Проверка имени и базы данных</h2>
                    </div>
                    <button className="btn btn-ghost" type="button" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
                <div className="training-modal__body">
                    <p>
                        Цель — потренироваться читать запросы в DevTools и сверять данные с БД.
                    </p>
                    <ol>
                        <li>В блоке “Тестовые поля” активируй чекбокс “Имя” и введи значение.</li>
                        <li>Нажми “Сохранить” и в DevTools → Network проверь POST `/api/click`.</li>
                        <li>Нажми “Показать имя” в профиле — значение должно отобразиться.</li>
                        <li>Проверь запись в базе данных `sqlite/parsetags.db` в таблице `tags`.</li>
                    </ol>
                    <div className="training-modal__hint">
                        Пример запроса к базе:
                        <pre>
                            <code>SELECT name, age FROM tags ORDER BY id DESC LIMIT 1;</code>
                        </pre>
                    </div>
                    <p>
                        Если заметишь проблемы в UI/UX — смело описывай и заводи баг-репорт через
                        “Новый баг-репорт”.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NameTaskModal;
