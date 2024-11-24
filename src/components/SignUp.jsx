import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase.init';

const SignUp = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const handleSignUp = e => {
        e.preventDefault();
        // console.log(e.target.email.value)
        const email = e.target.email.value
        const password = e.target.password.value
        // console.log(email, password)

        // reser error and status
        setErrorMessage('')
        setSuccess(false);

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage("At leastone uppercase, one lowercase, one number, one special character.");
            return;
          }
          
        if(password.length < 6){
            setErrorMessage('Password should be 6 characters or longer');
            return;
        }

        // create user with email and password.
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true);
            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message)
                setSuccess(false);
            })
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold ">Sign Up Now</h1>
            <form onSubmit={handleSignUp} className="card-body my-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                errorMessage && <p className='text-red-600 text-center'>{errorMessage}</p>
            }
            {
                success && <p className='text-green-500 text-center'>Sign Up is Successfull</p>
            }
        </div>
    );
};

export default SignUp;