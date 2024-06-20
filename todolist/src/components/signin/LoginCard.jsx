import React, { useEffect, useState, useRef } from 'react'
// import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'; 
import userInfoAtom from '../../recoil/userInfoAtom';

const LoginCard = () => {
    //Global variables
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom)
    //variables
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    //functions

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Username is: ",usernameRef?.current?.value);
        console.log("Password is: ",passwordRef?.current?.value);

        const userCredentials = {
            username: usernameRef?.current?.value,
            password: passwordRef?.current?.value,
        }

        fetch('http://127.0.0.1:8000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
            if(data?.message === "Successfully logined"){
                localStorage.setItem('userStatus',true);
                setUserInfo(true);
            }else {
                localStorage.setItem('userStatus',false);
            }
        }).catch((error) => {console.log("Error", error);});
    };
    
    return (
        <div>
            <div className='login-card-container'>
                <div>
                    <h1 className='login-heading'>ToDoX</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <input type="text" className='login-inputs' placeholder='Username' ref={usernameRef} />
                    <input type="password" className='login-inputs' placeholder='Password' ref={passwordRef} />
                    {/* <Link to="/" className='login-link'>
                        <button type='submit' className='login-button'>Login</button>
                    </Link> */}
                    <button className='login-button' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginCard
