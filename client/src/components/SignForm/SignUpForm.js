import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { setPomodoroSetting } from '../../redux/pomodoroSettingSlice';
import axios from 'axios';

export default function SignUpForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: '',
        passwordCheck: '',
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

        const { nickname, email, password, passwordCheck } = formData;

        // 입력 유효성 검사 함수
        const validateInputs = () => {
            if (!nickname || !email || !password || !passwordCheck) {
                alert('모든 필드를 입력해주세요.');
                return false;
            }

            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            if (!emailRegex.test(email)) {
                alert('유효한 이메일 주소를 입력해 주세요.');
                return false;
            }

            if (password !== passwordCheck) {
                alert('패스워드가 일치하지 않습니다.');
                return false;
            }

            if (password.length < 5) {
                alert('패스워드는 최소 4자리 이상이어야 합니다.');
                return false;
            }

            return true;
        };

        if (!validateInputs()) {
            return;
        }

        try {
            const response = await axios.post('/api/auth/sign-up', {
                nickname,
                email,
                password,
            });
            console.log('axios /sign-up >>> ', response.data.message);
            dispatch(setUser(response.data.user));
            dispatch(setPomodoroSetting(response.data.pomodoroSetting));

            navigate('/todo/list');
        } catch (error) {
            console.error('error >>> ', error);
            alert('회원등록 중 에러가 발생하였습니다.');
        }
    };

    return (
        <div className='form-container sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <div className='sign-up-text'>Create Account</div>
                <input
                    type='text'
                    name='nickname'
                    className='nickname'
                    placeholder='NickName'
                    value={formData.nickname}
                    onChange={handleChange}
                />
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
                <input
                    type='password'
                    name='passwordCheck'
                    className='password-check'
                    placeholder='Password Check'
                    value={formData.passwordCheck}
                    onChange={handleChange}
                />
                <button type='submit' className='sign-up-button'>
                    Sign Up
                </button>
            </form>
        </div>
    );
}
