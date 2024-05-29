import { useSelector } from 'react-redux';
import './ProfileCard.css';

export default function ProfileCard() {
    const user = useSelector((state) => state.user.userInfo);

    return (
        <div className='profile-card'>
            <img
                src={process.env.PUBLIC_URL + '/images/cat.png'}
                alt='avatar'
                className='avatar'
            />
            <div className='info'>
                <span className='user-name'>{user.nickname}</span>
            </div>
        </div>
    );
}
