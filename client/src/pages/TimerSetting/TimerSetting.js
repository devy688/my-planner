import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePomodoroSettingAsync } from '../../redux/pomodoroSettingSlice';
import './TimerSetting.css';

const ActionTypes = Object.freeze({
    FOCUS: 'focus',
    SHORT_BREAK: 'short_break',
    LONG_BREAK: 'long_break',
    LONG_BREAK_INTERVAL: 'long_break_interval',
});

export default function TimerSetting() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const pomodoroSetting = useSelector(
        (state) => state.pomodoroSetting.pomodoroSetting
    );
    const timerData = pomodoroSetting[0];

    const convertTime = (time) => {
        let beforeConvert = time / 60;
        return beforeConvert.toString().padStart(2, '0');
    };

    const [timer, setTimer] = useState({
        focusTime: convertTime(timerData.focusTime),
        shortBreakTime: convertTime(timerData.shortBreakTime),
        longBreakTime: convertTime(timerData.longBreakTime),
        longBreakInterval: timerData.longBreakInterval,
    });

    const handlePlus = (actionType) => {
        let copied = { ...timer };

        switch (actionType) {
            case ActionTypes.FOCUS:
                copied.focusTime++;
                if (copied.focusTime >= 60) {
                    copied.focusTime = '60'.padStart(2, '0');
                } else {
                    copied.focusTime = String(copied.focusTime).padStart(
                        2,
                        '0'
                    );
                }
                setTimer(copied);
                break;
            case ActionTypes.SHORT_BREAK:
                copied.shortBreakTime++;
                if (copied.shortBreakTime >= 60) {
                    copied.shortBreakTime = '60'.padStart(2, '0');
                } else {
                    copied.shortBreakTime = String(
                        copied.shortBreakTime
                    ).padStart(2, '0');
                }
                setTimer(copied);
                break;
            case ActionTypes.LONG_BREAK:
                copied.longBreakTime++;
                if (copied.longBreakTime >= 60) {
                    copied.longBreakTime = '60'.padStart(2, '0');
                } else {
                    copied.longBreakTime = String(
                        copied.longBreakTime
                    ).padStart(2, '0');
                }
                setTimer(copied);
                break;
            case ActionTypes.LONG_BREAK_INTERVAL:
                copied.longBreakInterval++;
                if (copied.longBreakInterval >= 10) {
                    copied.longBreakInterval = '10'.padStart(2, '0');
                }
                setTimer(copied);
                break;
            default:
                console.log('handlePlus error');
        }
    };

    const handleMinus = (actionType) => {
        let copied = { ...timer };

        switch (actionType) {
            case ActionTypes.FOCUS:
                copied.focusTime--;
                if (copied.focusTime <= 1) {
                    copied.focusTime = '1'.padStart(2, '0');
                } else {
                    copied.focusTime = String(copied.focusTime).padStart(
                        2,
                        '0'
                    );
                }
                setTimer(copied);
                break;
            case ActionTypes.SHORT_BREAK:
                copied.shortBreakTime--;
                if (copied.shortBreakTime <= 1) {
                    copied.shortBreakTime = '1'.padStart(2, '0');
                } else {
                    copied.shortBreakTime = String(
                        copied.shortBreakTime
                    ).padStart(2, '0');
                }
                setTimer(copied);
                break;
            case ActionTypes.LONG_BREAK:
                copied.longBreakTime--;
                if (copied.longBreakTime <= 1) {
                    copied.longBreakTime = '1'.padStart(2, '0');
                } else {
                    copied.longBreakTime = String(
                        copied.longBreakTime
                    ).padStart(2, '0');
                }
                setTimer(copied);
                break;
            case ActionTypes.LONG_BREAK_INTERVAL:
                copied.longBreakInterval--;
                if (copied.longBreakInterval <= 2) {
                    copied.longBreakInterval = '2';
                }
                setTimer(copied);
                break;
            default:
                console.log('handleMinus error');
        }
    };

    const handleResetSetting = () => {
        const originalSetting = {
            focusTime: convertTime(timerData.focusTime),
            shortBreakTime: convertTime(timerData.shortBreakTime),
            longBreakTime: convertTime(timerData.longBreakTime),
            longBreakInterval: timerData.longBreakInterval,
        };

        setTimer(originalSetting);
    };

    const handleCheckSetting = () => {
        dispatch(updatePomodoroSettingAsync({ userId: user._id, timer }));
    };

    return (
        <div className='timer-setting-container'>
            <div className='timers'>
                <div className='timer focus-timer'>
                    <span className='time'>{timer.focusTime} : 00</span>
                    <div className='min-sec-text'>
                        <span>분</span>
                        <span>초</span>
                    </div>
                </div>
                <div className='timer short-break-timer'>
                    <span className='time'>{timer.shortBreakTime} : 00</span>
                    <div className='min-sec-text'>
                        <span>분</span>
                        <span>초</span>
                    </div>
                </div>
                <div className='timer long-break-timer'>
                    <span className='time'>{timer.longBreakTime} : 00</span>
                    <div className='min-sec-text'>
                        <span>분</span>
                        <span>초</span>
                    </div>
                </div>
            </div>
            <div className='setting'>
                <div className='setting-item focus-time'>
                    <span className='title'>집중 시간</span>
                    <div className='control'>
                        <button
                            className='minus operator'
                            onClick={() => {
                                handleMinus(ActionTypes.FOCUS);
                            }}
                        >
                            -
                        </button>
                        <span className='time'>{timer.focusTime}</span>
                        <button
                            className='plus operator'
                            onClick={() => {
                                handlePlus(ActionTypes.FOCUS);
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='setting-item short-break-time'>
                    <span className='title'>휴식 시간</span>
                    <div className='control'>
                        <button
                            className='minus operator'
                            onClick={() => {
                                handleMinus(ActionTypes.SHORT_BREAK);
                            }}
                        >
                            -
                        </button>
                        <span className='time'>{timer.shortBreakTime}</span>
                        <button
                            className='plus operator'
                            onClick={() => {
                                handlePlus(ActionTypes.SHORT_BREAK);
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='setting-item long-break-time'>
                    <span className='title'>긴 휴식 시간</span>
                    <div className='control'>
                        <button
                            className='minus operator'
                            onClick={() => {
                                handleMinus(ActionTypes.LONG_BREAK);
                            }}
                        >
                            -
                        </button>
                        <span className='time'>{timer.longBreakTime}</span>
                        <button
                            className='plus operator'
                            onClick={() => {
                                handlePlus(ActionTypes.LONG_BREAK);
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='setting-item long-break-interval'>
                    <span className='title'>긴 휴식 전환 간격</span>
                    <div className='control'>
                        <button
                            className='minus operator'
                            onClick={() => {
                                handleMinus(ActionTypes.LONG_BREAK_INTERVAL);
                            }}
                        >
                            -
                        </button>
                        <span className='time'>{timer.longBreakInterval}</span>
                        <button
                            className='plus operator'
                            onClick={() => {
                                handlePlus(ActionTypes.LONG_BREAK_INTERVAL);
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <button
                    className='reset'
                    onClick={() => {
                        handleResetSetting();
                    }}
                >
                    리셋
                </button>
                <button
                    className='check'
                    onClick={() => {
                        handleCheckSetting();
                    }}
                >
                    확인
                </button>
            </div>
        </div>
    );
}
