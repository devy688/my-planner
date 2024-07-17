import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './TotalTimeSummary.css';

export default function TotalTimeSummary(props) {
    const user = useSelector((state) => state.user.userInfo);
    const goals = useSelector((state) => state.goals.goals);
    const [goalsWithTotalTimeSummary, setGoalsWithTotalTimeSummary] = useState(
        []
    );

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(
                    '/api/time-table/read/totalTimeSummary',
                    {
                        userId: user._id,
                        goals,
                        date: props.selectedDate,
                    }
                );

                setGoalsWithTotalTimeSummary(
                    response.data.goalsForTotalTimeSummary
                );
            } catch (error) {
                console.error('error >>> ', error);
                alert(
                    '/api/total-time-summary/read 호출 중 에러가 발생하였습니다.'
                );
            }
        }
        fetchData();
    });

    return (
        <div className='total-time-summary'>
            <ul className='summary-list'>
                {goalsWithTotalTimeSummary.map((goal, index) => {
                    return (
                        <li className='item' key={index}>
                            <span
                                className='title'
                                style={{ color: goal.color }}
                            >
                                {goal.title}
                            </span>
                            {goal.totalPomodoroTime > 0 ? (
                                <span className='time'>
                                    {Math.floor(goal.totalPomodoroTime / 3600)}
                                    시간 {(goal.totalPomodoroTime % 3600) / 60}
                                    분
                                </span>
                            ) : (
                                <span className='time'></span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
