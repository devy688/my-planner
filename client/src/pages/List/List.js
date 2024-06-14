import { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import TodoForm from '../../components/TodoForm/TodoForm';
import './List.css';

export default function List() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className='todo-container'>
            <div className='task-calendar-layout'>
                <Calendar onDateChange={handleDateChange} />
            </div>
            <div className='task-list-layout'>
                <div className='todo-form'>
                    <TodoForm selectedDate={selectedDate} />
                </div>
            </div>
        </div>
    );
}
