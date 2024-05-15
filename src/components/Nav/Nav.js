import { useNavigate } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
    const navigate = useNavigate();

    return (
        <nav className='nav'>
            <li
                className='list'
                onClick={() => {
                    navigate('/todo');
                }}
            >
                할 일
            </li>
            <li
                className='list'
                onClick={() => {
                    navigate('/todo/goals');
                }}
            >
                목표 관리
            </li>
            <li
                className='list'
                onClick={() => {
                    navigate('/todo/timer-setting');
                }}
            >
                타이머 셋팅
            </li>
            <li
                className='list'
                onClick={() => {
                    navigate('/todo/timetable');
                }}
            >
                타임 테이블
            </li>
            <li
                className='list'
                onClick={() => {
                    navigate('/todo/my-account');
                }}
            >
                내 계정
            </li>
        </nav>
    );
}
