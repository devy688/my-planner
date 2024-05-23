import './TotalTimeSummary.css';

export default function TotalTimeSummary({ todoData }) {
    return (
        <div className='total-time-summary'>
            <ul className='summary-list'>
                {todoData.map((todo, index) => {
                    return (
                        <li className='item' key={index}>
                            <span className={`title ${todo.color}`}>
                                {todo.title}
                            </span>
                            {todo.totalPomodoroTime > 0 ? (
                                <span className='time'>
                                    {Math.floor(todo.totalPomodoroTime / 60)}
                                    시간 {todo.totalPomodoroTime % 60}분
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
