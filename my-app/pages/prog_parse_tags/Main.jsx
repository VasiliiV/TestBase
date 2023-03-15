import React from 'react';
import {useState, useEffect} from 'react';


function Main() {
            function handleParseButtonClick() {
              const data = {
                yandex: isNameChecked ? nameInputValue : '',
                google: isAgeChecked ? ageInputValue : ''
              };
              fetch('/api/click', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(response => {
                  // Обработка ответа здесь
                  console.log(response);
                })
                .catch(error => {
                  // Обработка ошибки здесь
                  console.error(error);
                });
            }
  
  

  //disable is input with click check-box
            const [isNameChecked, setIsYandexChecked] = useState(false);
            const [isAgeChecked, setIsGoogleChecked] = useState(false);
            const [nameInputValue, setYandexInputValue] = useState('');
            const [ageInputValue, setGoogleInputValue] = useState('');

            function handleYandexCheckboxChange(event) {
                setIsYandexChecked(event.target.checked);
            }

            function handleGoogleCheckboxChange(event) {
                setIsGoogleChecked(event.target.checked);
            }

        useEffect(() => {
        const nameInput = document.querySelector('#name input[type="text"]');
        const googleInput = document.querySelector('#age input[type="text"]');

        if (isNameChecked) {
            nameInput.disabled = false;
          } else {
            nameInput.disabled = true;
          }
          
          if (isAgeChecked) {
            googleInput.disabled = false;
          } else {
            googleInput.disabled = true;
          }

        }, [isNameChecked, isAgeChecked]);
    return (
        <div id='main'>
            <div id="header">
                <h1 className="headerMain">Test base for QA. Welcome!</h1>
            </div>
            <div id="body">
                <div id="">
                    <div id='header_table'>
                        <h3>Блок. Добавляй значения и ломай</h3>
                    </div>
                    <div id='name_block'>
                        <div id="name">
                            <h5>Внеси имя:</h5>
                            <div className='inputName'>
                                <input type="text" disabled={!isNameChecked} value={nameInputValue} onChange={(event) => setYandexInputValue(event.target.value)} />
                                <input type="checkbox" name="" id="" onChange={handleYandexCheckboxChange} />
                            </div>
                        </div>
                        <div id="age">
                            <h5>Внеси возраст:</h5>
                            <div className='inputAge'>
                                <input type="text" disabled={!isAgeChecked} value={ageInputValue} onChange={(event) => setGoogleInputValue(event.target.value)} />
                                <input type="checkbox" name="" id="" onChange={handleGoogleCheckboxChange} />
                            </div>
                        </div>
                        <div id="search">
                            <button onClick={handleParseButtonClick}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Main;