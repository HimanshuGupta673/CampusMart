import React, { useState, useEffect } from 'react';
import { Otpverify, deleteUser } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';

function OtpVerify() {
  const location = useLocation();
  const { email } = queryString.parse(location.search);
  console.log(email)
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(email,otp ,"in frontend mail and otp value in otpverify")
    const verify = await Otpverify({ email, otp });
    setIsLoading(false);
    if (verify) {
      toast.success('Registration Successful', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'colored',
      });
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      await deleteUser(email);
      toast.error('Registration failed', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setTimeout(() => {
        navigate('/signup');
      }, 1000);
    }
  };
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
      {isLoading && (
        <div
          style={{
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
          }}
        >
          <Loader />
        </div>
      )}
      <div className="flex flex-col items-center justify-center h-[85.4vh] sm:h-[89vh]">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4">
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-2 font-medium">
              Enter OTP:
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="text-center text-red-500 mt-1">
            OTP expires in {minutes}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default OtpVerify;
