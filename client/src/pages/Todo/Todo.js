import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { setUser } from '../../redux/userSlice';
import { fetchGoals } from '../../redux/goalsSlice';
import { fetchPomodoroSetting } from '../../redux/pomodoroSettingSlice';
import { setSelectedDateForPomodoro } from '../../redux/selectedDateSlice';
import './Todo.css';

export default function Todo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.userInfo);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // 소셜 미디어 리덕스 스토어에 setUser
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

    // 소셜 미디어 리덕스 스토어에 fetchGoals, fetchPomodoroSetting
    useEffect(() => {
        const socialLogin = getCookie('socialLogin');

        if (socialLogin) {
            async function fetchData() {
                if (user?._id) {
                    await dispatch(fetchGoals(user._id));
                    await dispatch(fetchPomodoroSetting(user._id));
                    dispatch(setSelectedDateForPomodoro(new Date()));
                    setLoading(false);
                }
            }
            fetchData();
        } else {
            setLoading(false);
        }
    }, [dispatch, user?._id]);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='authenticated-container'>
            <Nav />
            <ProfileCard />
            <Outlet />
        </div>
    );
}
