import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAsync } from '../../redux/userSlice';
import imageCompression from 'browser-image-compression';
import './MyAccount.css';

export default function MyAccount() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const [imageSrc, setImageSrc] = useState('');
    const [initialImageSrc, setInitialImageSrc] = useState('');
    const [nickname, setNickname] = useState('');
    const [initialNickname, setInitialNickname] = useState('');
    const [file, setFile] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            if (user.profileImage === '/default-profile.png') {
                const defaultImage =
                    process.env.PUBLIC_URL + '/images/default-profile.png';
                setImageSrc(defaultImage);
                setInitialImageSrc(defaultImage);
            } else {
                setImageSrc(user.profileImage);
                setInitialImageSrc(user.profileImage);
            }
            setNickname(user.nickname);
            setInitialNickname(user.nickname);
        }
    }, [user]);

    const handleUpdatePhotobutton = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.1, // 이미지 최대 크기 0.1MB (100KB)
                    maxWidthOrHeight: 800, // 이미지 최대 너비 또는 높이
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(file, options);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result);
                    setFile(compressedFile);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Image compression error:', error);
            }
        } else {
            console.log('No file selected');
        }
    };

    const handleResetInfo = () => {
        setImageSrc(initialImageSrc);
        setNickname(initialNickname);
    };

    const handleSaveInfo = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', user._id);
        formData.append('nickname', nickname);

        dispatch(
            updateUserAsync({
                userId: user._id,
                nickname,
                formData,
            })
        );
    };

    return (
        <div className='my-account-container'>
            <div className='my-account-panel'>
                <div className='avatar-box'>
                    <img src={imageSrc} alt='avatar' className='avatar' />
                    <input
                        type='file'
                        accept='image/*'
                        className='update-photo-input'
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <button
                        className='update-photo'
                        onClick={handleUpdatePhotobutton}
                    >
                        사진 업데이트
                    </button>
                </div>
                <div className='info'>
                    <div className='nickname-box box'>
                        <span className='title'>닉네임</span>
                        <input
                            type='text'
                            className='nickname-input'
                            placeholder='NickName'
                            value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className='buttons'>
                    <button
                        className='reset'
                        onClick={() => {
                            handleResetInfo();
                        }}
                    >
                        리셋
                    </button>
                    <button
                        className='check'
                        onClick={() => {
                            handleSaveInfo();
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}
