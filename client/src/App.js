import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pomodoro from './components/Pomodoro/Pomodoro';
import SignInForm from './components/SignForm/SignInForm';
import SignUpForm from './components/SignForm/SignUpForm';
import Todo from './pages/Todo/Todo';
import List from './pages/List/List';
import Goals from './pages/Goals/Goals';
import TimerSetting from './pages/TimerSetting/TimerSetting';
import ActivityLog from './pages/ActivityLog/ActivityLog';
import MyAccount from './pages/MyAccount/MyAccount';
import './App.css';

function App() {
    const selectedDate = useSelector(
        (state) => state.selectedDate.selectedDate
    );
    const [type, setType] = useState('sign-in');
    const [pomodoroLayer, setPomodoroLayer] = useState(false);
    const [goalId, setGoalId] = useState('');

    const handleClick = (text) => {
        if (text !== type) {
            setType(text);
            return;
        }
    };

    const containerClass =
        'container ' +
        (type === 'sign-up' ? 'right-panel-active' : 'left-panel-active');

    const isSameDateForPomodoro = () => {
        let dateInRedux = new Date(selectedDate);
        let today = new Date();

        const isSameYear = dateInRedux.getFullYear() === today.getFullYear();
        const isSameMonth = dateInRedux.getMonth() === today.getMonth();
        const isSameDay = dateInRedux.getDate() === today.getDate();

        return isSameYear && isSameMonth && isSameDay;
    };

    return (
        <div className='App'>
            {pomodoroLayer && isSameDateForPomodoro() ? (
                <Pomodoro
                    handlePomodoroLayer={setPomodoroLayer}
                    goalId={goalId}
                />
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
                                    handleGoalId={setGoalId}
                                />
                            }
                        />
                        <Route path='goals' element={<Goals />} />
                        <Route
                            path='timer-setting'
                            element={<TimerSetting />}
                        />
                        <Route path='activity-log' element={<ActivityLog />} />
                        <Route path='my-account' element={<MyAccount />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
