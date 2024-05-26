import './TimeTable.css';

export default function TimeTable() {
    const hours = Array.from({ length: 24 }, (_, i) => (i + 6) % 24); // 06시부터 05시까지

    return (
        <div className='timetable'>
            {hours.map((hour, index) => (
                <div className='timetable-row' key={index}>
                    <div className='timetable-hour'>
                        {String(hour).padStart(2, '0')}
                    </div>
                    {[...Array(6)].map((_, i) => (
                        <div className='timetable-cell' key={i}></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
