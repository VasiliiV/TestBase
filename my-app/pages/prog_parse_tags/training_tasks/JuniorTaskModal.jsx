import React from "react";

function JuniorTaskModal({ onClose }) {
    return (
        <div className="training-modal__backdrop" onClick={onClose}>
            <div className="training-modal" onClick={(event) => event.stopPropagation()}>
                <div className="training-modal__header">
                    <div>
                        <span className="pill">Junior QA</span>
                        <h2>Задания для джуна тестировщика</h2>
                    </div>
                    <button className="btn btn-ghost" type="button" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
                <div className="training-modal__body">
                    <p>Выбери 2–3 задания и оформи тест-кейсы/баги по результатам.</p>
                    <ul>
                        <li>API контракты: проверь `/api/tasks` и `/api/bags` на обязательные поля, типы и формат даты.</li>
                        <li>Негативные проверки: без токена должен быть `401`, удаление без `id` — `400`.</li>
                        <li>Миграции: убедись, что таблица `create_task` переехала в `task`, а старые записи попали в `bags`.</li>
                        <li>Дизайн тестов: используй эквивалентные классы и границы для полей “Имя” и “Возраст”.</li>
                        <li>Best practices: проверь идемпотентность GET, стабильность формата ошибок и коды статусов.</li>
                        <li>Изоляция данных: разные пользователи не видят чужие тест-кейсы/баги.</li>
                    </ul>
                    <p>
                        Если что-то не совпадает с ожиданиями или документацией — фиксируй дефекты в баг-репортах.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default JuniorTaskModal;
