import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router';
import { useUsers } from '../context/UsersContext';

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {isUserExist, setCurrentUser} = useUsers()

    const navigate = useNavigate();

    function validateUser() {
        const currentUser = isUserExist(userName);
        if (currentUser && currentUser.password === password) {
            setCurrentUser(currentUser)
            return true;
        }
        return false;
    }

    function onLoginSubmit(e) {
        e.preventDefault();

        if (validateUser()) {
            navigate('/team')
        } else {
            alert(`Username "${userName}" doesn't exist or the password doesn't match`);
        }
    }

    return (
        <div className='flex justify-center items-center p-20'>
            <div className='flex flex-col space-y-20 border-solid border-black border-4 p-10'>
                <Header title="Football Club Svcollage"/>
                <form onSubmit={onLoginSubmit} className='flex flex-col items-center space-y-10'>
                    <input 
                        onChange={(e) => setUserName(e.target.value)} 
                        name='userName' 
                        type="text" 
                        placeholder='User Name'
                        className='border-solid border-2 border-black text-center flex-grow-0 w-1/2 h-10' 
                    />
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        name='password' 
                        type="password" 
                        placeholder='Password'
                        className='border-solid border-2 border-black text-center flex-grow-0 w-1/2 h-10' 
                    />
                    <div className='flex justify-between w-1/2'>
                        <button type='submit' className='w-auto bg-yellow-200 pl-7 pr-7 border-solid border-1 border-black rounded-none'>
                            Login
                        </button>
                        <button 
                            type='button' 
                            className='w-auto bg-blue-400 rounded-none'
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
