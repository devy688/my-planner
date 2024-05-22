// import { useState } from 'react';
import './TimerSetting.css';

export default function TimerSetting() {
    // 타이머 임시 데이터
    let timerData = {
        id: 1,
        userId: 101,
        focusTime: 1500,
        shortBreakTime: 300,
        longBreakTime: 900,
        longBreakInterval: 4,
    };

    let convertTime = (time) => {
        let beforeConvert = time / 60;
        return beforeConvert.toString().padStart(2, '0');
    };

    let focusTime = convertTime(timerData.focusTime);
    let shortBreakTime = convertTime(timerData.shortBreakTime);
    let longBreakTime = convertTime(timerData.longBreakTime);

    return (
        <div className='timer-setting-container'>
            <div className='timers'>
                <div className='timer focus-timer'>
                    <span className='time'>{focusTime} : 00</span>
                    <div className='min-sec-text'>
                        <span>분</span>
                        <span>초</span>
                    </div>
                </div>
                <div className='timer short-break-timer'>
                    <span className='time'>{shortBreakTime} : 00</span>
                    <div className='min-sec-text'>
                        <span>분</span>
                        <span>초</span>
                    </div>
                </div>
                <div className='timer long-break-timer'>
                    <span className='time'>{longBreakTime} : 00</span>
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
                        <button className='minus operator'>-</button>
                        <span className='time'>{timerData.focusTime / 60}</span>
                        <button className='plus operator'>+</button>
                    </div>
                </div>
                <div className='setting-item short-break-time'>
                    <span className='title'>휴식 시간</span>
                    <div className='control'>
                        <button className='minus operator'>-</button>
                        <span className='time'>
                            {timerData.shortBreakTime / 60}
                        </span>
                        <button className='plus operator'>+</button>
                    </div>
                </div>
                <div className='setting-item long-break-time'>
                    <span className='title'>긴 휴식 시간</span>
                    <div className='control'>
                        <button className='minus operator'>-</button>
                        <span className='time'>
                            {timerData.longBreakTime / 60}
                        </span>
                        <button className='plus operator'>+</button>
                    </div>
                </div>
                <div className='setting-item long-break-interval'>
                    <span className='title'>긴 휴식 전환 간격</span>
                    <div className='control'>
                        <button className='minus operator'>-</button>
                        <span className='time'>
                            {timerData.longBreakInterval}
                        </span>
                        <button className='plus operator'>+</button>
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <button className='reset'>리셋</button>
                <button className='check'>확인</button>
            </div>
        </div>
    );
}
