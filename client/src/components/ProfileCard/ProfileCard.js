import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { setUser, clearUser } from '../../redux/userSlice';
import './ProfileCard.css';

export default function ProfileCard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            dispatch(clearUser());
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        const socialLogin = getCookie('socialLogin');

        if (socialLogin) {
            async function fetchUser() {
                try {
                    const response = await axios.get(
                        `/api/auth/${socialLogin}/user`
                    );
                    const user = response.data;

                    dispatch(setUser(user));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    navigate('/login');
                } finally {
                    setLoading(false);
                }
            }
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [dispatch, navigate]);

    if (loading) {
        return <div className='profile-card loading'>Loading...</div>;
    }

    return (
        <div className='profile-card'>
            <img
                src={
                    user.profileImage ||
                    process.env.PUBLIC_URL + '/images/cat.png'
                }
                alt='avatar'
                className='avatar'
            />
            <div className='info'>
                <span className='user-name'>{user.nickname || user.name}</span>
            </div>
            <Icon
                icon='material-symbols:logout'
                className='icon logout'
                onClick={handleLogout}
            />
        </div>
    );
}
