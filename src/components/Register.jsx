import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase.init';

const Register = () => {
    const handleRegister = (event) =>{
        event.preventDefault();
        // console.log(event.target.email.value)
        // console.log(event.target.password.value)
        const email = event.target.email.value;
        const password = event.target.password.value
        console.log(email, password)

        // create user with email and password
        createUserWithEmailAndPassword(auth,email, password )
        .then(result =>{
            console.log(result.user)
        })
        .catch(error => console.log('ERROR', error))

    }
    return (
        <div className='max-w-lg mx-auto'>
            <h2 className="text-4xl my-8">Register</h2>

            <form onSubmit={handleRegister}>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="email" name='email' className="grow" placeholder="Username" />
                </label>
                <label className="input input-bordered flex items-center my-5 gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" name='password' className="grow" placeholder='Password' />
                </label>
                <button className="btn btn-accent btn-block">Login</button>
            </form>
        </div>
    );
};

export default Register;