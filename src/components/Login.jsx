import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.init';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email,password)
        setSuccess(false)
        setLoginError('')
        // Login User
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if(!result.user.emailVerified){
                    setLoginError('Please verify your email address.')
                }
                else{
                    setSuccess(true)
                }
            })
            .catch(error => {
                console.log('ERROR', error.message)
                setLoginError(error.message)
            })

    }
    return (

        <div className="card py-3 mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold text-center">Login now</h1>
            <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPass ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />

                    <button type='button'
                        onClick={() => setShowPass(!showPass)}
                        className='btn btn-xs absolute right-2 top-12'>
                        {
                            showPass ? <FaEye /> : <FaEyeSlash />
                        }
                    </button>

                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            {
                success && <p className='text-green-600 text-center'>User Login Successfull</p>
            }
            {
                loginError && <p className='text-red-600 w-[99%] text-center'>{loginError}</p>
            }
            <p className='text-center'>New to this website? please <Link to="/signUp"><span className='text-blue-600 underline'>Sign Up</span></Link></p>
        </div>
    );
};

export default Login;