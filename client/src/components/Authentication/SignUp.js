import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { authenticateSignUp } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
function SignUp() {

  const signupInitialValues = {
    email: '',
    password: ''
  };

  const [signup, setSignup] = useState(signupInitialValues)
  const [passShow, setPassShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()
  const generateError = (error) => {
    toast.error(error, {
      position: "top-center",
    }
    );
  }

  const signUpUser = async (e) => {
    e.preventDefault();
  
    if (signup.email === '' || !signup.email.includes("@")) {
      toast.error("Enter a valid email");
    } else if (signup.password === '') {
      toast.error("Enter your password");
    } else if (signup.password.length < 8) {
      toast.error("Password must contain at least 8 characters");
    } else {
      setIsLoading(true);
  
      try {
        const response = await authenticateSignUp(signup);
        const data = await response.data;
        // console.log(signup, "in frontend signup values");
        console.log(response.data.email, "in signup");
  
        setIsLoading(false);
  
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          if (password) generateError(password);
        } else {
          navigate(`/optVerification?email=${data.email}`);
          toast.success('OTP Sent Successfully', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "colored",
          });
          setSignup(signupInitialValues);
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        toast.error("Sign up failed. Please try again.");
        setIsLoading(false);
      }
    }
  };
  


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {isLoading && <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} ><Loader /></div>}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[75.4vh] min-h-[89vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a new account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" value={signup.email} onChange={(e) => onInputChange(e)} id="email" autoComplete="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                <p className="text-white font-serif ml-2 pt-2" style={{ fontSize: '10px' }}>
                  Please provide a valid email for further OTP verification!
                </p>

              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className='flex relative'>
                  <input type={!passShow ? "password" : "text"} value={signup.password} onChange={(e) => onInputChange(e)} name="password" id="password" autoComplete="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <div className='absolute right-2 top-2 cursor-pointer' onClick={() => setPassShow(!passShow)}><box-icon type='solid' name='show'></box-icon></div>
                </div>
              </div>
              <button type="submit" onClick={(e) => signUpUser(e)} className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400">Sign Up</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
