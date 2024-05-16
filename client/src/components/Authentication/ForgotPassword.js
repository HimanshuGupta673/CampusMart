import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword, Otpverify} from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import moment from 'moment';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [res, setRes] = useState(null); // Updated: Initialize res as null
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false)
  const [remainingTime, setRemainingTime] = useState(180);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  
  

  const submitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    console.log(email,"forgot-password")
    const response = await forgotPassword(email);
    setIsLoading(false)
    setRes(response); // Updated: Set the response to res
    if (!response) {
      toast.error('User does not exist!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'colored',
      });
      navigate('/signup');
    } else {
      toast.success('OTP Sent Successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'colored',
      });
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    console.log(email,otp,"otp verify");
    const verify = await Otpverify({email,otp})
    setIsLoading(false)
    if (verify) {
      navigate(`/reset-password?email=${email}`)
    } else {
      toast.error('OTP verification failed', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'colored',
      });
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const duration = moment.duration(remainingTime, 'seconds');
    setMinutes(duration.minutes());
    setSeconds(duration.seconds());
  }, [remainingTime]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {isLoading && <div style={{position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',}} ><Loader/></div> }
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[80.4vh] sm:h-[89vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" autoComplete="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
              </div>
              <div>
                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verify OTP</label>
                <input type="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} id="otp" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div>
                <button type="submit" onClick={(e) => res ? verifyOtp(e) : submitEmail(e)} className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400">{res ? "Verify OTP" : "Send OTP"}</button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div>
          {res && (<span className='text-red-500 mt-1'> OTP expires in {minutes}:{String(seconds).padStart(2, '0')}</span>)}
      </div>
    </>
  )
}

export default ForgotPassword
