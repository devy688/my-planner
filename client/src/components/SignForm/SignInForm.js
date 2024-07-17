import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/userSlice';
import { setGoals } from '../../redux/goalsSlice';
import { setPomodoroSetting } from '../../redux/pomodoroSettingSlice';
import { setSelectedDateForPomodoro } from '../../redux/selectedDateSlice';

export default function SignInForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        try {
            const response = await axios.post('/api/auth/sign-in', {
                email,
                password,
            });
            console.log('axios /sign-in >>> ', response.data.message);
            dispatch(setUser(response.data.user));
            dispatch(setGoals(response.data.goals));
            dispatch(setPomodoroSetting(response.data.pomodoroSetting));
            dispatch(setSelectedDateForPomodoro(new Date()));

            navigate('/todo/list');
        } catch (error) {
            console.error('error >>> ', error);
            alert('로그인 중 에러가 발생하였습니다.');
        }
    };

    const handleGoogleLogin = async () => {
        window.location.href = 'http://localhost:5001/api/auth/google';
    };

    const handleGithubLogin = async () => {
        const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;
    };

    return (
        <div className='form-container sign-in-container'>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <div className='sign-in-text'>Sign In</div>
                <div className='social-login'>
                    <div className='description'>
                        Login using social networks
                    </div>
                    <div className='icons'>
                        <img
                            src='images/google.png'
                            className='google'
                            alt='google-login'
                            onClick={handleGoogleLogin}
                        ></img>
                        <img
                            src='images/github.png'
                            className='github'
                            alt='github-login'
                            onClick={handleGithubLogin}
                        ></img>
                    </div>
                </div>

                <div className='division-line'>
                    <div className='left'></div>
                    <span className='center'>OR</span>
                    <div className='right'> </div>
                </div>

                <div className='email-login'>
                    <input
                        type='email'
                        name='email'
                        className='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        name='password'
                        className='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type='submit' className='sign-in-button'>
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}
