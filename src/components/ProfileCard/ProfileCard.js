import './ProfileCard.css';

export default function ProfileCard() {
    return (
        <div className='profile-card'>
            <img src='images/cat.png' alt='avatar' className='avatar' />
            <div className='info'>
                <span className='user-name'>devy</span>
            </div>
        </div>
    );
}
