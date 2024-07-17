import { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import TodoForm from '../../components/TodoForm/TodoForm';
import './List.css';

export default function List({ handlePomodoroLayer, handleGoalId }) {
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
                    handlePomodoroLayer={handlePomodoroLayer}
                />
            </div>
            <div className='task-list-layout'>
                <div className='todo-form'>
                    <TodoForm
                        selectedDate={selectedDate}
                        handleTodoUpdate={handleTodoUpdate}
                        handlePomodoroLayer={handlePomodoroLayer}
                        handleGoalId={handleGoalId}
                    />
                </div>
            </div>
        </div>
    );
}
