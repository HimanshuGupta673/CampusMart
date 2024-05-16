import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { resetPassword } from '../../redux/actions';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../Loader/Loader';
function ResetPassword() {
  const loginInitialValues = {
    password: '',
    confirm_password: ''
  };
  const [password, setPassword] = useState(loginInitialValues)
  const [passShow, setPassShow] = useState(false)
  const [cpassShow, csetPassShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();
  const { email } = queryString.parse(location.search);


  console.log(email,"in reset-password")

  const onValueChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }
  const submitPassword = async (e) => {
    e.preventDefault();
    if (password.password !== password.confirm_password) {
      toast.error('Password and Confirm Password fields do not match', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
      });
    } else {
      setIsLoading(true)
      const done = await resetPassword({ email, password: password.password });
      setIsLoading(false)
      if (done) {
        toast.success('Password updated successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      } else {
        toast.error('Password update failed', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          navigate('/forgot-password')
        }, 1000);
      }
    }
  }
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[75.4vh] sm:h-[89vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className="flex relative">
                  <input type={!passShow ? "password" : "text"} name="password" value={password.password} onChange={(e) => onValueChange(e)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" />
                  <div className='absolute right-2 top-2 cursor-pointer' onClick={() => setPassShow(!passShow)}><box-icon type='solid' name='show'></box-icon></div>
                </div>
              </div>
              <div>
                <label htmlFor="Confirm_Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <div className="flex relative">
                  <input type={!cpassShow ? "password" : "text"} name="confirm_password" value={password.confirm_password} onChange={(e) => onValueChange(e)} id="Confirm_Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" />
                  <div className='absolute right-2 top-2 cursor-pointer' onClick={() => csetPassShow(!cpassShow)}><box-icon type='solid' name='show'></box-icon></div>
                </div>
              </div>
              <button type="submit" onClick={(e) => submitPassword(e)} className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
