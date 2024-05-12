import { useState } from 'react';

export default function SignUpForm() {
    return (
        <div className='form-container sign-up-container'>
            <div className='sign-up-text'>Create Account</div>

            <div className='sign-up-form'>
                <input
                    type='text'
                    className='nickname'
                    placeholder='NickName'
                />
                <input type='email' className='email' placeholder='Email' />
                <input
                    type='password'
                    className='password'
                    placeholder='Password'
                />
                <input
                    type='password'
                    className='password-check'
                    placeholder='Password Check'
                />
                <button className='sign-up-button'>Sign Up</button>
            </div>
        </div>
    );
}
