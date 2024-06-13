import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { CirclePicker } from 'react-color';
import axios from 'axios';
import {
    setGoals,
    addGoal,
    updateGoal,
    deleteGoal,
} from '../../redux/goalsSlice';
import './Goals.css';

export default function Goals() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const goals = useSelector((state) => state.goals.goals);

    let [goalsData, setGoalsData] = useState(goals);
    let [goal, setGoal] = useState({
        id: '',
        title: '',
        color: '',
        isNew: true,
    });
    let [showGoalDetailPanel, setShowGoalDetailPanel] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post('/api/goals/read', {
                userId: user._id,
            });

            dispatch(setGoals(response.data.goals));
            setGoalsData(response.data.goals);
        }

        fetchData();
    }, [goalsData]);

    const handleCreateGoal = () => {
        setGoal({
            id: '',
            title: '',
            color: '',
            isNew: true,
        });
    };

    const handleEditGoal = (existingGoal) => {
        setGoal({
            ...existingGoal,
            isNew: false,
        });
    };

    const handleTitleChange = (event) => {
        setGoal((prevGoal) => ({
            ...prevGoal,
            title: event.target.value,
        }));
    };

    const handleColorChange = (color) => {
        setGoal((prevGoal) => ({
            ...prevGoal,
            color: color.hex,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (goal.isNew) {
            try {
                const { title, color } = goal;

                if (title && color) {
                    const response = await axios.post('/api/goals/register', {
                        userId: user._id,
                        title,
                        color,
                    });
                    dispatch(addGoal(response.data.newGoal));
                    setShowGoalDetailPanel(false);

                    setGoal({
                        id: '',
                        title: '',
                        color: '',
                        isNew: true,
                    });

                    console.log(
                        'axios /api/goals/register >>> ',
                        response.data.message
                    );
                } else {
                    alert('목표나 컬러가 빈 값입니다.');
                }
            } catch (error) {
                console.error('handleSubmit error >>> ', error);
                alert('목표 등록 중 에러가 발생하였습니다.');
            }
        } else {
            try {
                const { id, title, color } = goal;

                if (title && color) {
                    const response = await axios.post('/api/goals/update', {
                        userId: user._id,
                        id,
                        title,
                        color,
                    });
                    dispatch(updateGoal(response.data.updateSorted));
                    setShowGoalDetailPanel(false);

                    setGoal({
                        id: '',
                        title: '',
                        color: '',
                        isNew: true,
                    });

                    console.log(
                        'axios /api/goals/update >>> ',
                        response.data.message
                    );
                } else {
                    alert('목표나 컬러가 빈 값입니다.');
                }
            } catch (error) {
                console.error('handleSubmit error >>> ', error);
                alert('목표 수정 중 에러가 발생하였습니다.');
            }
        }
    };

    const handleDeleteGoal = async (event, goal) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/goals/delete', {
                userId: user._id,
                id: goal.id,
            });

            dispatch(deleteGoal(response.data.deleted));
            setShowGoalDetailPanel(false);

            setGoal({
                id: '',
                title: '',
                color: '',
                isNew: true,
            });

            console.log('axios /api/goals/delete >>> ');
        } catch (error) {
            console.error('handleDeleteGoal error >>> ', error);
            alert('목표 삭제 중 에러가 발생하였습니다.');
        }
    };

    return (
        <div className='goal-management-container'>
            <div className='goal-list-panel'>
                <ul className='goal-list'>
                    {goalsData.map((goal, index) => {
                        return (
                            <li key={goal._id} className='goal-item'>
                                <button
                                    className='category'
                                    onClick={() => {
                                        setShowGoalDetailPanel(true);
                                        handleEditGoal({
                                            id: goal._id,
                                            title: goal.title,
                                            color: goal.color,
                                        });
                                    }}
                                >
                                    <span
                                        className='title'
                                        style={{
                                            color: goal.color,
                                        }}
                                    >
                                        {goal.title}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className='add-goal-container'>
                    <button
                        className='category'
                        onClick={() => {
                            handleCreateGoal();
                            setShowGoalDetailPanel(true);
                        }}
                    >
                        <Icon icon='ri:add-line' className='icon plus' />
                    </button>
                </div>
            </div>
            <div className='division-line'></div>
            <form className='goal-detail-panel' onSubmit={handleSubmit}>
                {showGoalDetailPanel ? (
                    <>
                        <input
                            type='text'
                            name='title'
                            className='goal-input'
                            placeholder='목표 입력'
                            value={goal.title}
                            onChange={handleTitleChange}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                }
                            }}
                            style={{ borderBottomColor: goal.color }}
                        />
                        <div className='goal-color'>
                            <h2 className='title'>색상</h2>
                            <CirclePicker
                                className='color-picker'
                                name='color'
                                color={goal.color}
                                onChangeComplete={handleColorChange}
                            />

                            {goal.isNew ? (
                                <button
                                    className='left-button'
                                    onClick={() => {
                                        setGoal({
                                            id: '',
                                            title: '',
                                            color: '',
                                            isNew: true,
                                        });
                                        setShowGoalDetailPanel(false);
                                    }}
                                >
                                    취소
                                </button>
                            ) : (
                                <button
                                    className='left-button'
                                    onClick={(event) => {
                                        handleDeleteGoal(event, goal);
                                    }}
                                >
                                    삭제
                                </button>
                            )}

                            <button
                                type='submit'
                                className='check-button right-button'
                            >
                                확인
                            </button>
                        </div>
                    </>
                ) : null}
            </form>
        </div>
    );
}
