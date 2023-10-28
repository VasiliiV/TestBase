import React from 'react';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'; 


function Main() {

            function handleParseButtonClick() {
              const data = {
                name: isNameChecked ? nameInputValue : '',
                age: isAgeChecked ? ageInputValue : ''
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
            const [isNameChecked, setIsNameChecked] = useState(false);
            const [isAgeChecked, setIsAgeChecked] = useState(false);
            const [nameInputValue, setNameInputValue] = useState('');
            const [ageInputValue, setAgeInputValue] = useState('');

            function handleYandexCheckboxChange(event) {
                setIsNameChecked(event.target.checked);
            }

            function handleGoogleCheckboxChange(event) {
                setIsAgeChecked(event.target.checked);
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

        const router = useRouter();  // Инициализируйте router

        function exitClick() {
          router.push('/');  // Замените на путь к вашей странице регистрации
    }
    return (
        <div id='main'>
            <div id="header">
                <h1 className="headerMain">Test base for Junior QA. Welcome!</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10px'}}>
                 <button onClick={exitClick} style={{width: '110px', height: '41px'}}>Выход</button>
            </div>
            <div id="body">
                <div id="">
                    <div id='name_block'>
                        <div id="name">
                            <h5>Внеси имя:</h5>
                            <div className='inputName'>
                                <input type="text" id="enterValue" disabled={!isNameChecked} value={nameInputValue} onChange={(event) => setNameInputValue(event.target.value)} />
                                <input type="checkbox" name="" id="" onChange={handleYandexCheckboxChange} />
                            </div>
                        </div>
                        <div id="age">
                            <h5>Внеси возраст:</h5>
                            <div className='inputAge'>
                                <input type="text" id="enterValue" disabled={!isAgeChecked} value={ageInputValue} onChange={(event) => setAgeInputValue(event.target.value)} />
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