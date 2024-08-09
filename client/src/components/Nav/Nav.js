import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './Nav.css';

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(
        location.pathname.split('/')[2]
    );

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
                <Icon
                    icon='icon-park-outline:list'
                    // className='icon '
                />
            </li>
            <li
                className={`list ${activeItem === 'goals' ? 'active' : ''}`}
                onClick={() => {
                    navigate('/todo/goals');
                    handleActiveItem('goals');
                }}
            >
                <Icon
                    icon='lucide:goal'
                    // className='icon '
                />
                {/* 목표 관리 */}
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
                <Icon
                    icon='material-symbols:timer-outline'
                    // className='icon '
                />
                {/* 타이머 셋팅 */}
            </li>
            <li
                className={`list ${
                    activeItem === 'activity-log' ? 'active' : ''
                }`}
                onClick={() => {
                    navigate('/todo/activity-log');
                    handleActiveItem('activity-log');
                }}
            >
                <Icon
                    icon='mdi:timetable'
                    // className='icon '
                />
                {/* 타임 테이블 */}
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
                <Icon
                    icon='mdi:account-outline'
                    // className='icon '
                />
                {/* 내 계정 */}
            </li>
        </nav>
    );
}
