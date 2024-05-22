import { useState } from 'react';
import { Icon } from '@iconify/react';
import { CirclePicker } from 'react-color';
import './Goals.css';

export default function Goals(props) {
    let [todoData, setTodoData] = useState(props.todoData);
    let [newGoal, setNewGoal] = useState('');
    let [afterDropTodo, setAfterDropTodo] = useState(props.todoData);
    let [showAddGoalInput, setShowAddGoalInput] = useState(false);
    let [showGoalDetailPanel, setShowGoalDetailPanel] = useState(false);
    let [dragIndex, setDragIndex] = useState('');

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('index', index);
        setDragIndex(index);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setTodoData(afterDropTodo);
    };

    const handleDragOver = (event, index) => {
        event.preventDefault();
        if (index !== dragIndex) {
            const newItems = [...todoData];
            const draggedItem = newItems[dragIndex];
            newItems.splice(dragIndex, 1);
            newItems.splice(index, 0, draggedItem);
            setAfterDropTodo(newItems);
        }
    };

    const addNewGoal = () => {
        setShowAddGoalInput(false);
    };

    return (
        <div className='goal-management-container'>
            <div className='goal-list-panel'>
                <ul className='goal-list'>
                    {todoData.map((todo, index) => {
                        return (
                            <li
                                key={todo.id}
                                className='goal-item'
                                draggable
                                onDragStart={(event) =>
                                    handleDragStart(event, index)
                                }
                                onDragOver={(event) => {
                                    handleDragOver(event, index);
                                }}
                                onDrop={(event) => handleDrop(event, index)}
                            >
                                <Icon
                                    icon='charm:menu-hamburger'
                                    className='icon menu-hamburger'
                                />
                                <button
                                    className='category'
                                    onClick={() => {
                                        setShowGoalDetailPanel(true);
                                    }}
                                >
                                    <span className={`title ${todo.color}`}>
                                        {todo.title}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className='add-goal-container'>
                    {showAddGoalInput ? (
                        <input
                            type='text'
                            className={`add-goal-input default`}
                            onInput={(e) => {
                                // setNewGoal(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (
                                    e.key === 'Enter' &&
                                    !e.nativeEvent.isComposing
                                ) {
                                    addNewGoal();
                                }
                            }}
                            // value={newGoal || ''}
                            autoFocus
                        />
                    ) : null}
                    <button
                        className='category'
                        onClick={() => {
                            setShowAddGoalInput(true);
                            setShowGoalDetailPanel(true);
                        }}
                    >
                        <Icon icon='ri:add-line' className='icon plus' />
                    </button>
                </div>
            </div>
            <div className='division-line'></div>
            <div className='goal-detail-panel'>
                {showGoalDetailPanel ? (
                    <>
                        <input
                            type='text'
                            className='goal-input'
                            placeholder='목표 입력'
                        />
                        <div className='goal-color'>
                            <h2 className='title'>색상</h2>
                            <CirclePicker className='color-picker' />
                            <button
                                className='delete-button'
                                onClick={() => {}}
                            >
                                삭제
                            </button>
                            <button className='check-button' onClick={() => {}}>
                                확인
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
