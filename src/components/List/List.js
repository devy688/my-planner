import { useState } from 'react';
import RenderHeader from '../../components/Calendar/RenderHeader';
import RenderDays from '../../components/Calendar/RenderDays';
import RenderCells from '../../components/Calendar/RenderCells';
import Category from '../../components/Category/Category';
import { addMonths, subMonths } from 'date-fns';
import './List.css';

export default function List() {
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
    };

    return (
        <div className='todo-container'>
            <div className='task-calendar-layout'>
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
            </div>
            <div className='task-list-layout'>
                <div className='todo-form'>
                    <Category />
                </div>
            </div>
        </div>
    );
}
