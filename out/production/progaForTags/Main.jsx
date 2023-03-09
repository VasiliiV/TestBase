import React from 'react';
import './style.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Main() {
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

            function handleParseButtonClick() {
              const data = {
                yandex: yandexInputValue,
                google: googleInputValue
              };
              fetch('/api/input', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then(response => {
                // handle response here
              })
              .catch(error => {
                // handle error here
              });
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
                            <button onClick={handleParseButtonClick}>Parse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Main;