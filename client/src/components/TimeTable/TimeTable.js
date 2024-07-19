import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './TimeTable.css';

export default function TimeTable(props) {
    const user = useSelector((state) => state.user.userInfo);
    const [pomodoroWithGoalColor, setPomodoroWithGoalColor] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(
                    '/api/activity-log/time-table/read',
                    {
                        userId: user._id,
                        date: props.selectedDate,
                    }
                );
                setPomodoroWithGoalColor(response.data.pomodoroWithGoalColor);
            } catch (error) {
                console.error('error >>> ', error);
                alert(
                    '/api/activity-log/time-table/read 호출 중 에러가 발생하였습니다.'
                );
            }
        }
        fetchData();
    }, [props.selectedDate, user._id]);

    const hours = Array.from({ length: 24 }, (_, i) => {
        let value = (i + 5) % 12;
        if (value === 0) {
            return 12;
        }
        return value;
    });

    const getColorForMinuteCell = (hour, minute) => {
        for (const pomodoro of pomodoroWithGoalColor) {
            const start = new Date(pomodoro.startTime);
            const end = new Date(pomodoro.endTime);
            const startHour = start.getHours();
            const startMinute = start.getMinutes();
            const endHour = end.getHours();
            const endMinute = end.getMinutes();

            if (
                (hour > startHour && hour < endHour) ||
                (hour === startHour &&
                    minute >= startMinute &&
                    hour < endHour) ||
                (hour === endHour && minute < endMinute && hour > startHour) ||
                (hour === startHour &&
                    hour === endHour &&
                    minute >= startMinute &&
                    minute < endMinute)
            ) {
                return pomodoro.color;
            }
        }
        return '';
    };

    return (
        <div className='timetable'>
            {hours.map((hour, index) => (
                <div className='timetable-row' key={index}>
                    <div className='timetable-hour'>
                        {String(hour).padStart(2, '0')}
                    </div>
                    {[...Array(6)].map((_, i) => (
                        <div className='timetable-cell' key={i}>
                            {[...Array(10)].map((_, j) => {
                                const minute = i * 10 + j;
                                const color = getColorForMinuteCell(
                                    index + 5,
                                    minute
                                );
                                return (
                                    <div
                                        className='minute-cell'
                                        key={j}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
