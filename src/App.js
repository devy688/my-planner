import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignInForm from './components/SignForm/SignInForm';
import SignUpForm from './components/SignForm/SignUpForm';
import Todo from './pages/Todo';
import List from './components/List/List';

function App() {
    let [type, setType] = useState('sign-in');

    const handleClick = (text) => {
        if (text !== type) {
            setType(text);
            return;
        }
    };

    const containerClass =
        'container ' + (type === 'sign-up' ? 'right-panel-active' : '');

    return (
        <div className='App'>
            <div className={containerClass} id='container'>
                <Routes>
                    <Route
                        path='/login'
                        element={
                            <>
                                <SignInForm />
                                <SignUpForm />
                                <div className='overlay-container'>
                                    <div className='overlay'>
                                        <div className='overlay-panel overlay-left'>
                                            <div className='title'>
                                                Welcome Back!
                                            </div>
                                            <div className='description'>
                                                Enter your personal details
                                                <br />
                                                to use my planner
                                            </div>
                                            <button
                                                className='white-button'
                                                id='sign-in'
                                                onClick={() => {
                                                    handleClick('sign-in');
                                                }}
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                        <div className='overlay-panel overlay-right'>
                                            <div className='title'>
                                                New Here?
                                            </div>
                                            <div className='description'>
                                                Register with your personal
                                                details <br />
                                                to use my planner
                                            </div>
                                            <button
                                                className='white-button'
                                                id='sign-up'
                                                onClick={() => {
                                                    handleClick('sign-up');
                                                }}
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    />
                    <Route path='/todo' element={<Todo />}>
                        <Route path='list' element={<List />} />
                        <Route path='goals' element={<div>goals</div>} />
                        <Route
                            path='timer-setting'
                            element={<div>timer-setting</div>}
                        />
                        <Route
                            path='timetable'
                            element={<div>timetable</div>}
                        />
                        <Route
                            path='my-account'
                            element={<div>my-account</div>}
                        />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
