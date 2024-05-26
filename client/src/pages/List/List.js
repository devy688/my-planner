import Calendar from '../../components/Calendar/Calendar';
import TodoForm from '../../components/TodoForm/TodoForm';
import './List.css';

export default function List(props) {
    let { todoData } = props;

    return (
        <div className='todo-container'>
            <div className='task-calendar-layout'>
                <Calendar />
            </div>
            <div className='task-list-layout'>
                <div className='todo-form'>
                    <TodoForm todoData={todoData} />
                </div>
            </div>
        </div>
    );
}
