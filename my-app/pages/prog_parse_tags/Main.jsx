import React from 'react';
import {useState, useEffect} from 'react';


function Main() {
            function handleParseButtonClick() {
              const data = {
                yandex: isYandexChecked ? yandexInputValue : '',
                google: isGoogleChecked ? googleInputValue : ''
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
            const [isYandexChecked, setIsYandexChecked] = useState(false);
            const [isGoogleChecked, setIsGoogleChecked] = useState(false);
            const [yandexInputValue, setYandexInputValue] = useState('');
            const [googleInputValue, setGoogleInputValue] = useState('');

            function handleYandexCheckboxChange(event) {
                setIsYandexChecked(event.target.checked);
            }

            function handleGoogleCheckboxChange(event) {
                setIsGoogleChecked(event.target.checked);
            }

        useEffect(() => {
        const yandexInput = document.querySelector('#Yandex input[type="text"]');
        const googleInput = document.querySelector('#google input[type="text"]');

        if (isYandexChecked) {
            yandexInput.disabled = false;
          } else {
            yandexInput.disabled = true;
          }
          
          if (isGoogleChecked) {
            googleInput.disabled = false;
          } else {
            googleInput.disabled = true;
          }

        }, [isYandexChecked, isGoogleChecked]);
    return (
        <div id='main'>
            <div id="header">
                <h1 className="headerMain">Парсим тэги</h1>
            </div>
            <div id="body">
                <div id="table parce from yandex and google">
                    <div id='header_table'>
                        <h3>Выбери источник</h3>
                    </div>
                    <div id='search_block'>
                        <div id="Yandex">
                            <h5>WordStat from Yandex:</h5>
                            <div className='inputYandex'>
                                <input type="text" disabled={!isYandexChecked} value={yandexInputValue} onChange={(event) => setYandexInputValue(event.target.value)} />
                                <input type="checkbox" name="" id="" onChange={handleYandexCheckboxChange} />
                            </div>
                        </div>
                        <div id="google">
                            <h5>Trends.google from Google:</h5>
                            <div className='inputGoogle'>
                                <input type="text" disabled={!isGoogleChecked} value={googleInputValue} onChange={(event) => setGoogleInputValue(event.target.value)} />
                                <input type="checkbox" name="" id="" onChange={handleGoogleCheckboxChange} />
                            </div>
                        </div>
                        <div id="search">
                            <button onClick={handleParseButtonClick}>Click</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Main;