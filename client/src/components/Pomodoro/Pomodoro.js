import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ActionTypes = Object.freeze({
    FOCUS: 'focus',
    SHORT_BREAK: 'short_break',
    LONG_BREAK: 'long_break',
});

export default function Pomodoro({ handlePomodoroLayer, goalId }) {
    const user = useSelector((state) => state.user.userInfo);
    const pomodoroSetting = useSelector(
        (state) => state.pomodoroSetting.pomodoroSetting
    )[0];

    const [timeRemaining, setTimeRemaining] = useState(
        // pomodoroSetting.focusTime
        5
    );
    const [mode, setMode] = useState(ActionTypes.FOCUS);
    const [background, setBackground] = useState('#94b2ec');

    // cycles: 집중 모드, 휴식 모드와 같은 하나의 싸이클
    // sessions: 긴 휴식까지 마쳤을 경우 1 세션
    const [cycles, setCycles] = useState(0);
    const [sessions, setSessions] = useState(0);

    const handleCancelPomodoro = () => {
        handlePomodoroLayer(false);
        setCycles(0);
        setMode(ActionTypes.FOCUS);
    };

    useEffect(() => {
        if (mode === ActionTypes.FOCUS) {
            setBackground('#94b2ec');
        } else if (mode === ActionTypes.SHORT_BREAK) {
            setBackground('#bad6ff');
        } else if (mode === ActionTypes.LONG_BREAK) {
            setBackground('#f1f1f1');
        }
    }, [mode]);

    const registerPomodoro = async (startTime, endTime) => {
        await axios.post('/api/pomodoro/register', {
            pomodoroSettingId: pomodoroSetting._id,
            date: new Date(),
            userId: user._id,
            goalId,
            startTime: startTime,
            endTime: endTime,
        });
    };

    useEffect(() => {
        let timer;
        if (timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            if (mode === ActionTypes.FOCUS) {
                let endTime = new Date();
                let nowTime = endTime.getTime();
                let focusedMinutes = Math.floor(pomodoroSetting.focusTime / 60);
                let focusedMinutesInMilliseconds = focusedMinutes * 60 * 1000;
                let startTime = new Date(
                    nowTime - focusedMinutesInMilliseconds
                );
                registerPomodoro(startTime, endTime);

                if (cycles < pomodoroSetting.longBreakInterval - 1) {
                    setMode(ActionTypes.SHORT_BREAK);
                    setTimeRemaining(pomodoroSetting.shortBreakTime);
                    setCycles(cycles + 1);
                } else {
                    setMode(ActionTypes.LONG_BREAK);
                    setTimeRemaining(pomodoroSetting.longBreakTime);
                    setCycles(0);
                    setSessions(sessions + 1);
                }
            } else {
                setMode(ActionTypes.FOCUS);
                setTimeRemaining(pomodoroSetting.focusTime);
            }
        }
    }, [timeRemaining, cycles, pomodoroSetting, sessions]);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, '0')} : ${String(
            seconds
        ).padStart(2, '0')}`;
    };

    return (
        <div className='pomodoro-layer'>
            <div
                className='timer'
                style={{
                    backgroundColor: background,
                }}
            >
                <span className='time'>{formatTime(timeRemaining)}</span>
                <div className='min-sec-text'>
                    <span>분</span>
                    <span>초</span>
                </div>
            </div>
            <div className='buttons'>
                <button className='cancel' onClick={handleCancelPomodoro}>
                    취소
                </button>
            </div>
        </div>
    );
}
