import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('list');

    const handleActiveItem = (itemName) => {
        setActiveItem(itemName);
    };

    return (
        <nav className='nav'>
            <li
                className={`list ${activeItem === 'list' ? 'active' : ''}`}
                onClick={() => {
                    navigate('/todo/list');
                    handleActiveItem('list');
                }}
            >
                할 일
            </li>
            <li
                className={`list ${activeItem === 'goals' ? 'active' : ''}`}
                onClick={() => {
                    navigate('/todo/goals');
                    handleActiveItem('goals');
                }}
            >
                목표 관리
            </li>
            <li
                className={`list ${
                    activeItem === 'timer-setting' ? 'active' : ''
                }`}
                onClick={() => {
                    navigate('/todo/timer-setting');
                    handleActiveItem('timer-setting');
                }}
            >
                타이머 셋팅
            </li>
            <li
                className={`list ${activeItem === 'timetable' ? 'active' : ''}`}
                onClick={() => {
                    navigate('/todo/timetable');
                    handleActiveItem('timetable');
                }}
            >
                타임 테이블
            </li>
            <li
                className={`list ${
                    activeItem === 'my-account' ? 'active' : ''
                }`}
                onClick={() => {
                    navigate('/todo/my-account');
                    handleActiveItem('my-account');
                }}
            >
                내 계정
            </li>
        </nav>
    );
}
