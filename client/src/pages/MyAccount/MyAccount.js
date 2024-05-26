import './MyAccount.css';

export default function MyAccount() {
    return (
        <div className='my-account-container'>
            <div className='my-account-panel'>
                <div className='avatar-box'>
                    <img
                        src={process.env.PUBLIC_URL + '/images/cat.png'}
                        alt='avatar'
                        className='avatar'
                    />
                    <button className='update-photo'>사진 업데이트</button>
                </div>
                <div className='info'>
                    <div className='nickname-box box'>
                        <span className='title'>닉네임</span>
                        <input
                            type='text'
                            className='nickname-input'
                            placeholder='NickName'
                            value='devy'
                        />
                    </div>
                    <div className='email-box box'>
                        <span className='title'>이메일</span>
                        <input
                            type='email'
                            className='email-input'
                            placeholder='devyoung688@gmail.com'
                            readOnly
                        />
                    </div>
                </div>
                <div className='buttons'>
                    <button className='reset'>리셋</button>
                    <button className='check'>저장</button>
                </div>
            </div>
        </div>
    );
}
