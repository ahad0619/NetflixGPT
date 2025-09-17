import { useState, useRef } from "react"
import { isDataValid } from "../utils/isDataValid"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseSetup.js";
import myLogo from '../assets/my_logo.png'
import cover from '../assets/my_cover.jpg'

const Login = () => {
    const [signInForm, setSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState()
    const toggleSignUpForm = () => {
        setSignInForm(!signInForm)
    }
    const validateData = () => {
        const message = (isDataValid(email.current.value, password.current.value))
        setErrorMessage(message)
        if (message) return
        if (!signInForm) // sign up logic
        {

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // ...
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    setErrorMessage(errorCode + ":" + errorMessage)
                });

        }
        else {        // sign in logic
            signInWithEmailAndPassword(auth,email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    console.log("user logged in successfully ",user)

                })  
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Login failed:", errorCode, errorMessage)
                    setErrorMessage(errorCode + ":" + errorMessage)
                    
                });
        }
    }

    const email = useRef(null)
    const password = useRef(null)
    return (<>
        <div className='header relative mx-30'>
            <img
                className="z-10" src={myLogo}
                style={{ width: "180px", margin: "5px", position: "absolute" }}
                alt="Netflix logo" />
        </div>
        <div className='relative'>
            <img
                className='w-full'
                src={cover}
                alt="Background image" />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-00 opacity-60"> </div>

            <div className='signInBox absolute top-1/2 left-1/2
                  bg-black p-6 w-96 h-120 z-20  transform -translate-x-1/2 -translate-y-1/2 '>
                <h1
                    className='text-white text-4xl font-bold p-6'>
                    {signInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!signInForm && < input
                    className='border-gray-400 text-white p-2 border-1 mb-4 mx-6 py-2 w-72'
                    type="text"
                    placeholder='Name' />}
                <input
                    className='border-gray-400 text-white p-2 border-1 mb-4 mx-6 py-2 w-72'
                    type="text"
                    placeholder='Email or mobile number'
                    ref={email} />
                <input className='border-gray-400 text-white p-2 border-1 mb-4 mx-6 py-2 w-72'
                    type="password"
                    placeholder='Password'
                    ref={password} />
                <button
                    className='bg-red-600 p-2 w-72 mx-6 mb-4 text-white cursor-pointer font-semibold'
                    onClick={validateData}>
                    {signInForm ? "Sign In" : "Sign Up"}

                </button>
                <p className="text-red-600 mx-6 pb-2">{errorMessage}</p>
                <span
                    className='text-white m-1 ml-6 '>
                    {signInForm ? "New User?" : "Already a user?"}
                </span>
                <span
                    className='text-white cursor-pointer font-semibold '
                    onClick={toggleSignUpForm}>
                    {signInForm ? "Sign Up" : "Sign In"}
                </span>

            </div>
        </div>

    </>
    )
}

export default Login
