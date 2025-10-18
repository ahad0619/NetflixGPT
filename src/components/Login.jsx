import { useState, useRef } from "react"
import { isDataValid } from "../utils/isDataValid"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseSetup.js";
import Header from './Header.jsx'
import cover from '../assets/my_cover.jpg'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [signInForm, setSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState()
    const navigate = useNavigate()

    const toggleSignUpForm = () => setSignInForm(!signInForm)

    const email = useRef(null)
    const password = useRef(null)

    const validateData = () => {
        const message = isDataValid(email.current.value, password.current.value)
        setErrorMessage(message)
        if (message) return

        if (!signInForm) {
            // Sign Up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    console.log("User signed up:", userCredential.user)
                })
                .catch((error) => {
                    setErrorMessage(error.code + ":" + error.message)
                });
        } else {
            // Sign In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    console.log("User logged in:", userCredential.user)
                })
                .catch((error) => {
                    setErrorMessage(error.code + ":" + error.message)
                });
        }
    }

    return (
        <>
            <Header />
            <div className='relative w-full min-h-screen'>
                <img
                    src={cover}
                    alt="Background image"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-60"></div>

                <div className='absolute top-1/2 left-1/2 bg-black p-6 z-20 transform -translate-x-1/2 -translate-y-1/2
                                w-11/12 sm:w-96 rounded-md'>
                    <h1 className='text-white text-3xl sm:text-4xl font-bold mb-6 text-center'>
                        {signInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {!signInForm && (
                        <input
                            className='w-full text-white p-2 mb-4 border border-gray-400 rounded'
                            type="text"
                            placeholder='Name'
                        />
                    )}

                    <input
                        className='w-full text-white p-2 mb-4 border border-gray-400 rounded'
                        type="text"
                        placeholder='Email or mobile number'
                        ref={email}
                    />
                    <input
                        className='w-full text-white p-2 mb-4 border border-gray-400 rounded'
                        type="password"
                        placeholder='Password'
                        ref={password}
                    />
                    <button
                        className='w-full bg-red-600 text-white font-semibold py-2 mb-4 rounded hover:bg-red-700 transition-colors'
                        onClick={validateData}
                    >
                        {signInForm ? "Sign In" : "Sign Up"}
                    </button>
                    {errorMessage && <p className="text-red-600 mb-4 text-center">{errorMessage}</p>}

                    <div className='text-center text-white'>
                        <span>{signInForm ? "New User? " : "Already a user? "}</span>
                        <span className='cursor-pointer font-semibold underline' onClick={toggleSignUpForm}>
                            {signInForm ? "Sign Up" : "Sign In"}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
