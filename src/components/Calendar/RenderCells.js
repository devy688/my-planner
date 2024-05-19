import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    parse,
    format,
} from 'date-fns';
import './RenderCells.css';

export default function RenderCells({
    currentMonth,
    selectedDate,
    onDateClick,
}) {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;

            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    onClick={() => {
                        // onDateClick(parse(cloneDay));
                        onDateClick(cloneDay);
                    }}
                    key={day}
                >
                    <div className='day-icon'>
                        <div className='top'>
                            <div className='one-quarter'></div>
                            <div className='two-quarter'></div>
                        </div>
                        <div className='bottom'>
                            <div className='three-quarter'></div>
                            <div className='four-quarter'></div>
                        </div>
                    </div>
                    <span
                        className={`day-text ${
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'not-valid'
                                : ''
                        }`}
                    >
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }

        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        );
        days = [];
    }

    return <div className='body'>{rows}</div>;
}
