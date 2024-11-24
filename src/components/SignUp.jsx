import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = e => {
        e.preventDefault();
        // console.log(e.target.email.value)
        const email = e.target.email.value
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;
        // console.log(email, password, terms, name, photo)

        // reser error and status
        setErrorMessage('')
        setSuccess(false);

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage("At leastone uppercase, one lowercase, one number, one special character.");
            return;
        }
        if (!terms) {
            setErrorMessage('Please acpect our terms and conditions');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password should be 6 characters or longer');
            return;
        }

        // create user with email and password.
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true);

                // send verification email address 
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('Verification email sent');
                    })
                // update profile and photo url
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(result.user, profile)
                    .then(() => {
                        console.log('user profile updated', profile)
                    })
                    .catch((error) => {
                        console.log0('User profile error', error.message)
                    })

            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message)
                setSuccess(false);
            })



    }
    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold text-center">Sign Up Now</h1>
            <form onSubmit={handleSignUp} className="card-body my-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="text" name='photo' placeholder="photo url" className="input input-bordered" required />
                </div>
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
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="password"
                        className="input input-bordered" required />
                    <button onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute right-3 top-12'>
                        {
                            showPassword ? <FaEyeSlash /> : <FaEye />
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label justify-start cursor-pointer">
                        <input type="checkbox" name='terms' className="checkbox
                         checkbox-primary" />
                        <span className="label-text ml-2">Acccpect Our Trerms and Conditions</span>
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
            <p className='text-center m-2'>Already have an account? <Link to="/login"><span className='text-blue-600 underline'>Login</span></Link></p>
        </div>
    );
};

export default SignUp;