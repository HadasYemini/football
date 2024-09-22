import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Header from '../components/Header';
import { useUsers } from '../context/UsersContext';


export default function register() {
    const [userName, setUserName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [userError, setUserError] = useState('');
    const [teamError, setTeamError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const { isUserExist, saveUser } = useUsers();

    const navigate = useNavigate();

    function isUserNameValid(name) {
        return name.length > 0
    }

    function isTeamNameValid(name) {
        const regex = /^[A-Z][a-z]*(\s[A-Za-z][a-z]*)*$/ // First word must be cpital letter
        // const regex = /^[A-Za-z][a-z]*(\s[A-Za-z][a-z]*)*$/ // first word not must be capital letter
        return regex.test(name);
    }

    function isPasswordValid(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,20}$/;
        return regex.test(password);
    }

    function onRegisterSubmit(e) {
        e.preventDefault();

        let valid = true;

        if (!isUserNameValid(userName)) {
            setUserError("please enter user name");
            valid = false;
        } else {
            setUserError('');
        }

        if (!isTeamNameValid(teamName)) {
            setTeamError("Team name must start with a capital letter and contain only English letters");
            valid = false;
        } else {
            setTeamError('');
        }

        if (!isPasswordValid(password)) {
            setPasswordError('Password must be between 8-20 characters and include a capital letter, small letter, number, and special character.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (passwordConfirm !== password) {
            setConfirmError('Passwords do not match');
            valid = false;
        } else {
            setConfirmError('');
        }


        if (valid) {
            if (!isUserExist(userName)) {
                saveUserAndNavigate()
            } else {
                alert('The user exists in the system')
            }
        }
    }

    function saveUserAndNavigate() {
        saveUser({ userName, teamName, password, players: [] })
        navigate('/');
    }

    return (
        <>
            <div className='flex justify-center items-center p-20'>
                <div className='flex flex-col space-y-20 border-solid border-black border-4 p-10'>
                    <Header className='' />
                    <form onSubmit={onRegisterSubmit} className='flex flex-col w-5/6 items-center'>
                        <div className='flex flex-row space-x-20 p-5 justify-start w-full'>
                            <div className='flex flex-col justify-end w-1/2'>
                                <p className='text-red-600 mb-2 flex-wrap flex-grow-0 w-60'>{userError}</p>
                                <input onChange={(e) => { setUserName(e.target.value), setUserError("") }} name='userName' type="text" placeholder='user name'
                                    className='border-solid border-2 border-black text-center flex-grow-0 w-60' />
                            </div>
                            <div className='flex flex-col justify-end w-1/2'>
                                <p className='text-red-600 mb-2 flex-wrap flex-grow-0 w-60'>{teamError}</p>
                                <input onChange={(e) => { setTeamName(e.target.value), setTeamError("") }} name='teamName' type="text" placeholder='team name'
                                    className='border-solid border-2 border-black text-center flex-grow-0 w-60' />
                            </div>
                        </div>

                        <div className='flex flex-row space-x-20 p-5 w-full'>
                            <div className='flex flex-col justify-end w-1/2'>
                                <p className='text-red-600 mb-2 flex-wrap flex-grow-0 w-60'>{passwordError}</p>
                                <input onChange={(e) => { setPassword(e.target.value), setPasswordError("") }} name='password' type="password" placeholder='password'
                                    className='border-solid border-2 border-black text-center flex-grow-0 w-60' />
                            </div>

                            <div className='flex flex-col justify-end w-1/2'>
                                <p className='text-red-600 mb-2 flex-wrap flex-grow-0 w-60'>{confirmError}</p>
                                <input onChange={(e) => { setPasswordConfirm(e.target.value), setConfirmError("") }} name='confirmPassword' type="password" placeholder='confirm password'
                                    className='border-solid border-2 border-black text-center flex-grow-0 w-60' />
                            </div>
                        </div>
                        <button type='submit' className='w-auto bg-blue-400 mt-10'>Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}
