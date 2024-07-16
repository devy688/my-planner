import { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import TodoForm from '../../components/TodoForm/TodoForm';
import './List.css';

export default function List({ handlePomodoroLayer, handleTaskId }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isTodoUpdated, setIsTodoUpdated] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTodoUpdate = () => {
        setIsTodoUpdated((prev) => !prev);
    };

    return (
        <div className='todo-container'>
            <div className='task-calendar-layout'>
                <Calendar
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    isTodoUpdated={isTodoUpdated}
                />
            </div>
            <div className='task-list-layout'>
                <div className='todo-form'>
                    <TodoForm
                        selectedDate={selectedDate}
                        handleTodoUpdate={handleTodoUpdate}
                        handlePomodoroLayer={handlePomodoroLayer}
                        handleTaskId={handleTaskId}
                    />
                </div>
            </div>
        </div>
    );
}
