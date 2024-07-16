import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Pomodoro from './components/Pomodoro/Pomodoro';
import SignInForm from './components/SignForm/SignInForm';
import SignUpForm from './components/SignForm/SignUpForm';
import Todo from './pages/Todo/Todo';
import List from './pages/List/List';
import Goals from './pages/Goals/Goals';
import TimerSetting from './pages/TimerSetting/TimerSetting';
import ActivityLog from './pages/ActivityLog/ActivityLog';
import MyAccount from './pages/MyAccount/MyAccount';

function App() {
    let todoData = [
        {
            id: 0,
            title: 'workout',
            lists: [
                {
                    id: '0-1',
                    name: '런닝하기',
                    isCompleted: false,
                    pomodoroTime: 30,
                },
            ],
            color: 'blue',
            totalPomodoroTime: 30,
        },
        {
            id: 1,
            title: 'coding',
            lists: [
                {
                    id: '1-1',
                    name: '코딩애플 강의듣기',
                    isCompleted: true,
                    pomodoroTime: 50,
                },
                {
                    id: '1-2',
                    name: '프로그래머스 문제 풀기',
                    isCompleted: false,
                    pomodoroTime: 25,
                },
            ],
            color: 'red',
            totalPomodoroTime: 75,
        },
        {
            id: 2,
            title: 'daily',
            lists: [],
            color: 'green',
            totalPomodoroTime: 0,
        },
    ];

    const [type, setType] = useState('sign-in');
    const [pomodoroLayer, setPomodoroLayer] = useState(false);
    const [taskId, setTaskId] = useState('');

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
            {pomodoroLayer ? (
                <Pomodoro setPomodoroLayer={setPomodoroLayer} taskId={taskId} />
            ) : null}
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
                        <Route
                            path='list'
                            element={
                                <List
                                    handlePomodoroLayer={setPomodoroLayer}
                                    handleTaskId={setTaskId}
                                />
                            }
                        />
                        <Route path='goals' element={<Goals />} />
                        <Route
                            path='timer-setting'
                            element={<TimerSetting />}
                        />
                        <Route
                            path='activity-log'
                            element={<ActivityLog todoData={todoData} />}
                        />
                        <Route path='my-account' element={<MyAccount />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
