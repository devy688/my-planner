import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import './TodoForm.css';

export default function TodoForm(props) {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [listId, setListId] = useState('');

    const [showAddTodoInput, setShowAddTodoInput] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const [newTodo, setNewTodo] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [updateTodoText, setUpdateTodoText] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const goals = useSelector((state) => state.goals.goals);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('/api/lists/read', {
                    userId: user._id,
                    goals: [...goals].sort((a, b) => (a._id > b._id ? 1 : -1)),
                    date: props.selectedDate,
                });
                console.log(
                    'axios /api/lists/read >>> ',
                    response.data.message
                );

                setCategories(response.data.goalsWithLists);
            } catch (error) {
                console.error('error >>> ', error);
                alert('/api/list/read 호출 중 에러가 발생하였습니다.');
            }
        }

        fetchData();
        setShowAddTodoInput(false);
        setIsEditing(false);
    }, [dispatch, goals, props.selectedDate, user._id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showAddTodoInput &&
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setShowAddTodoInput(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showAddTodoInput]);

    const addTodoInput = (categoryId) => {
        setIsEditing(false);
        setCategoryId(categoryId);

        // 이미 추가 중인 상태일 경우
        if (showAddTodoInput) {
            return;
        }

        setShowAddTodoInput(true);
        setNewTodo('');
    };

    const addNewTodo = async (categoryId) => {
        if (!newTodo || newTodo === '' || newTodo.trim() === '') {
            alert('유효한 값을 입력하세요.');
            return;
        }

        const copied = [...categories];
        const isExisted = copied.some((category) => {
            if (category.id === categoryId) {
                return category.lists.some((list) => list.name === newTodo);
            }
            return false;
        });

        if (isExisted) {
            alert('이미 등록한 할 일 입니다.');
        } else {
            try {
                const response = await axios.post('/api/lists/register', {
                    userId: user._id,
                    goalId: categoryId,
                    name: newTodo,
                    date: props.selectedDate,
                });
                console.log(
                    'axios /api/lists/register >>> ',
                    response.data.message
                );

                copied.forEach((category) => {
                    if (category.id === categoryId) {
                        category.lists.push(response.data.newList);
                    }
                });
                setCategories(copied);
                setNewTodo('');
            } catch (error) {
                console.error('error >>> ', error);
                alert('/api/lists/register 호출 중 에러가 발생하였습니다.');
            }
        }
    };

    const updateTodo = async (categoryId, listId, text) => {
        try {
            const response = await axios.post('/api/lists/update', {
                userId: user._id,
                goalId: categoryId,
                listId,
                name: updateTodoText || text,
            });
            console.log('axios /api/lists/update >>> ', response.data.message);

            const copied = [...categories];
            copied.forEach((category) => {
                if (category.id === categoryId) {
                    category.lists.forEach((list) => {
                        if (list.id === listId) {
                            list.name = updateTodoText;
                        }
                    });
                }
            });

            setCategories(copied);
            setIsEditing(false);
        } catch (error) {
            console.error('error >>> ', error);
            alert('/api/lists/update 호출 중 에러가 발생하였습니다.');
        }
    };

    const deleteTodo = async (categoryId, listId) => {
        try {
            const response = await axios.post('/api/lists/delete', {
                userId: user._id,
                goalId: categoryId,
                listId,
            });
            console.log('axios /api/lists/delete >>> ', response.data.message);

            let copied = [...categories];
            copied.forEach((category) => {
                if (category.id === categoryId) {
                    category.lists.forEach((list, index) => {
                        if (list.id === listId) {
                            category.lists.splice(index, 1);
                        }
                    });
                }
            });
            setCategories(copied);
            props.handleTodoUpdate();
        } catch (error) {
            console.error('error >>> ', error);
            alert('/api/lists/delete 호출 중 에러가 발생하였습니다.');
        }
    };

    const handleCheckboxChange = async (e, categoryId, listId) => {
        try {
            const response = await axios.post('/api/lists/update-complete', {
                userId: user._id,
                goalId: categoryId,
                listId,
                isCompleted: !e.target.checked,
            });
            console.log(
                'axios /api/lists/update-complete >>> ',
                response.data.message
            );

            const copied = [...categories];
            copied.forEach((category) => {
                if (category.id === categoryId) {
                    category.lists.forEach((list) => {
                        const id = list.id || list._id;
                        if (id === listId) {
                            list.isCompleted = !e.target.checked;
                        }
                    });
                }
            });
            setCategories(copied);
            props.handleTodoUpdate();
        } catch (error) {
            console.error('error >>> ', error);
            alert('/api/lists/update-complete 호출 중 에러가 발생하였습니다.');
        }
    };

    const startPoromodo = (categroyId) => {
        props.handlePomodoroLayer(true);
        props.handleGoalId(categroyId);
    };

    return (
        <div className='category-list' ref={containerRef}>
            {categories.map((category) => (
                <div className='category' key={category.id}>
                    <button
                        className='category-header'
                        onClick={() => {
                            addTodoInput(category.id);
                        }}
                    >
                        <span
                            className='title'
                            style={{
                                color: category.color,
                            }}
                        >
                            {category.title}
                        </span>
                        <Icon icon='ri:add-line' className='icon plus' />
                    </button>
                    <div className='item-list-container'>
                        <ul className='item-list'>
                            {category.lists.map((list) => (
                                <li
                                    className='todo-item-container'
                                    key={list.id || list._id}
                                >
                                    <div className='todo-item'>
                                        <input
                                            type='checkbox'
                                            id={list.name}
                                            name={list.name}
                                            className='check-box'
                                            onChange={(e) => {
                                                handleCheckboxChange(
                                                    e,
                                                    category.id,
                                                    list.id || list._id
                                                );
                                            }}
                                            checked={list.isCompleted}
                                            style={{
                                                accentColor: list.isCompleted
                                                    ? category.color
                                                    : '#000',
                                            }}
                                        />
                                        {isEditing &&
                                        category.id === categoryId &&
                                        list.id === listId ? (
                                            <input
                                                type='text'
                                                className={`todo-text-input isEditing`}
                                                style={{
                                                    borderBottom: `1px solid ${category.color}`,
                                                }}
                                                value={updateTodoText}
                                                onChange={(e) => {
                                                    setUpdateTodoText(
                                                        e.target.value
                                                    );
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        updateTodo(
                                                            category.id,
                                                            list.id || list._id,
                                                            e.target.value
                                                        );
                                                    }
                                                }}
                                                autoFocus
                                            />
                                        ) : (
                                            <input
                                                type='text'
                                                className='todo-text-input'
                                                value={list.name}
                                                disabled
                                            />
                                        )}
                                    </div>
                                    <div className='icons'>
                                        <Icon
                                            icon='mingcute:play-fill'
                                            className='icon play'
                                            onClick={() => {
                                                startPoromodo(category.id);
                                            }}
                                        />
                                        <Icon
                                            icon='icon-park-outline:write'
                                            className='icon update'
                                            onClick={() => {
                                                setShowAddTodoInput(false);
                                                setCategoryId(category.id);
                                                setListId(list.id);
                                                setUpdateTodoText(list.name);
                                                setIsEditing(true);
                                            }}
                                        />
                                        <Icon
                                            icon='material-symbols:delete-outline'
                                            className='icon delete'
                                            onClick={() => {
                                                deleteTodo(
                                                    category.id,
                                                    list.id
                                                );
                                            }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {showAddTodoInput && category.id === categoryId ? (
                            <div className='add-todo-container'>
                                <input
                                    type='checkbox'
                                    className='check-box add-todo-checkbox'
                                    disabled
                                />
                                <input
                                    ref={inputRef}
                                    type='text'
                                    className='add-todo-input'
                                    style={{
                                        borderBottom: `1px solid ${category.color}`,
                                    }}
                                    onInput={(e) => {
                                        setNewTodo(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === 'Enter' &&
                                            !e.nativeEvent.isComposing
                                        ) {
                                            addNewTodo(category.id);
                                        }
                                    }}
                                    value={newTodo || ''}
                                    autoFocus
                                />
                                <Icon
                                    icon='ic:baseline-check'
                                    className='icon check'
                                    onClick={() => {
                                        addNewTodo(category.id);
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
}
