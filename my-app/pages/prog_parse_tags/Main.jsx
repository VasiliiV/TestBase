import React from 'react';
import {useState} from 'react';
import { useRouter } from 'next/router';


function Main() {
            const [status, setStatus] = useState({ type: '', message: '' });
            function handleParseButtonClick() {
              setStatus({ type: '', message: '' });
              const token = localStorage.getItem('token');

              if (!token) {
                setStatus({ type: 'error', message: 'Token not found. Please sign in.' });
                return;
              }
            
              const data = {
                name: isNameChecked ? nameInputValue : '',
                age: isAgeChecked ? ageInputValue : ''
              };
              fetch('/api/click', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Add token to header
                }
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json(); // Handle response here
                })
                .then(data => {
                  console.log(data);
                  setStatus({ type: 'success', message: 'Data saved successfully.' });
                })
                .catch(error => {
                  // Handle error here
                  console.error('Request error:', error);
                  setStatus({ type: 'error', message: 'Error while sending data.' });
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

        const router = useRouter();  

        function exitClick() {
          router.push('/');  
    }
    return (
        <section className="dashboard-hero panel">
            <div className="dashboard-hero__top">
                <div>
                    <span className="pill">TestBase QA Lab</span>
                    <h1>QA training ground</h1>
                    <p className="dashboard-hero__subtitle">
                        Validate forms, log bugs, and write test cases — all in one place.
                    </p>
                </div>
                <button className="btn btn-ghost" onClick={exitClick}>Sign out</button>
            </div>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Test fields</h3>
                    <p>Enable checkboxes and verify how the inputs behave.</p>
                    <div className="field-row">
                        <div className="field-block">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter a name"
                                disabled={!isNameChecked}
                                value={nameInputValue}
                                onChange={(event) => setNameInputValue(event.target.value)}
                            />
                        </div>
                        <label className="toggle">
                            <input type="checkbox" onChange={handleYandexCheckboxChange} />
                            <span>Activate</span>
                        </label>
                    </div>
                    <div className="field-row">
                        <div className="field-block">
                            <label>Age</label>
                            <input
                                type="text"
                                placeholder="Enter an age"
                                disabled={!isAgeChecked}
                                value={ageInputValue}
                                onChange={(event) => setAgeInputValue(event.target.value)}
                            />
                        </div>
                        <label className="toggle">
                            <input type="checkbox" onChange={handleGoogleCheckboxChange} />
                            <span>Activate</span>
                        </label>
                    </div>
                    <div className="dashboard-actions">
                        <button className="btn btn-primary" onClick={handleParseButtonClick}>Save</button>
                        {status.message && (
                            <div className={`status-pill ${status.type === 'error' ? 'status-pill--error' : 'status-pill--success'}`} aria-live="polite">
                                {status.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="dashboard-card dashboard-guide">
                    <h3>How to use the sandbox</h3>
                    <ol>
                        <li>Generate data, save it, and verify the API response.</li>
                        <li>Create a test case or bug report with the panel on the right.</li>
                        <li>Compare expected vs. actual results and log defects.</li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
export default Main;
