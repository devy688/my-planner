import { useState } from 'react';
import RenderHeader from './RenderHeader';
import RenderDays from './RenderDays';
import RenderCells from './RenderCells';
import { addMonths, subMonths } from 'date-fns';
import './Calendar.css';

export default function Calendar(props) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day) => {
        setSelectedDate(day);
        props.onDateChange(day);
    };

    return (
        <div className='calendar'>
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        </div>
    );
}
