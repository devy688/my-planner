// import { useState } from 'react';

export default function SignInForm() {
    const handleOnSubmit = () => {
        console.log('submit!');
    };

    return (
        <div className='form-container sign-in-container'>
            <form className='sign-in-form' onSubmit={handleOnSubmit}>
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
                        ></img>
                        <img
                            src='images/github.png'
                            className='github'
                            alt='github-login'
                        ></img>
                        <img
                            src='images/kakao-talk.png'
                            className='kakao-talk'
                            alt='kakao-talk-login'
                        ></img>
                    </div>
                </div>

                <div className='division-line'>
                    <div className='left'></div>
                    <span className='center'>OR</span>
                    <div className='right'> </div>
                </div>

                <div className='email-login'>
                    <input type='email' className='email' placeholder='Email' />
                    <input
                        type='password'
                        className='password'
                        placeholder='Password'
                    />
                    <button className='sign-in-button'>Sign In</button>
                </div>
            </form>
        </div>
    );
}
