import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { clearUser } from '../../redux/userSlice';
import { clearGoals } from '../../redux/goalsSlice';
import './ProfileCard.css';

export default function ProfileCard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userInfo);

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            dispatch(clearUser());
            dispatch(clearGoals());
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className='profile-card'>
            <div className='user-section'>
                <img
                    src={
                        user?.profileImage ||
                        process.env.PUBLIC_URL + '/images/cat.png'
                    }
                    alt='avatar'
                    className='avatar'
                />
                <div className='info'>
                    <span className='user-name'>
                        {user?.nickname || user?.name || 'Guest'}
                    </span>
                </div>
            </div>
            <Icon
                icon='material-symbols:logout'
                className='icon logout'
                onClick={handleLogout}
            />
        </div>
    );
}
