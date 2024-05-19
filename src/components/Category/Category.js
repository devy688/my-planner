import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './Category.css';

export default function Category() {
    let data = [
        {
            id: 0,
            title: 'workout',
            lists: [
                {
                    id: '0-1',
                    name: '런닝하기',
                    isCompleted: false,
                },
            ],
            color: 'blue',
        },
        {
            id: 1,
            title: 'coding',
            lists: [
                {
                    id: '1-1',
                    name: '코딩애플 강의듣기',
                    isCompleted: true,
                },
                {
                    id: '1-2',
                    name: '프로그래머스 문제 풀기',
                    isCompleted: false,
                },
            ],
            color: 'red',
        },
        {
            id: 2,
            title: 'daily',
            lists: [],
            color: 'green',
        },
    ];

    const [categories, setCategories] = useState(data);
    const [categoryId, setCategoryId] = useState('');
    const [listId, setListId] = useState('');

    const [showAddTodoInput, setShowAddTodoInput] = useState(false);
    const [newTodo, setNewTodo] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [updateTodoText, setUpdateTodoText] = useState('');

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

    const addNewTodo = (categoryId) => {
        if (!newTodo || newTodo === '' || newTodo.trim() === '') {
            alert('유효한 값을 입력하세요.');
            return;
        }

        const copied = [...categories];

        let id = Date.now();
        const todo = {
            id: id,
            name: newTodo,
            isCompleted: false,
        };

        // 이미 추가한 name의 경우를 체크하여 existed 변수에 저장
        const isExisted = copied.some((category) => {
            if (category.id === categoryId) {
                return category.lists.some((list) => list.name === newTodo);
            }
            return false;
        });

        // 이미 존재하는 경우 경고창을 띄우고 추가하지 않음
        if (isExisted) {
            alert('이미 등록한 할 일 입니다.');
        } else {
            copied.forEach((category) => {
                if (category.id === categoryId) {
                    category.lists.push(todo);
                }
            });
        }

        setCategories(copied);
        setNewTodo('');
    };

    const updateTodo = (categoryId, listId) => {
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
    };

    const deleteTodo = (categoryId, listId) => {
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
    };

    const startPoromodo = () => {};

    return (
        <div className='category-list'>
            {categories.map((category) => (
                <div className='category' key={category.id}>
                    <button
                        className='category-header'
                        onClick={() => {
                            addTodoInput(category.id);
                        }}
                    >
                        <span className={`title ${category.color}`}>
                            {category.title}
                        </span>
                        <Icon icon='ri:add-line' className='icon plus' />
                    </button>
                    <div className='item-list-container'>
                        <ul className='item-list'>
                            {category.lists.map((list) => (
                                <li
                                    className='todo-item-container'
                                    key={list.id}
                                >
                                    <div className='todo-item'>
                                        <input
                                            type='checkbox'
                                            id={list.name}
                                            name={list.name}
                                            className={`check-box ${category.color}`}
                                        />
                                        {isEditing &&
                                        category.id === categoryId &&
                                        list.id === listId ? (
                                            <input
                                                type='text'
                                                className={`todo-text-input isEditing ${category.color}`}
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
                                                            list.id
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
                                                startPoromodo();
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
                                    type='text'
                                    className={`add-todo-input ${category.color}`}
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
