import React, { useState } from 'react'
import { authenticateLogin } from '../../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AccountContext } from '../Context/AccountProvider';  //because in a project there may be a no.of context's
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
function LoginUser() {
  const navigate = useNavigate();
  const loginInitialValues = {
    email: '',
    password: ''
  };



  const {setUser } = useContext(AccountContext)
  const [isLoading,setIsLoading] = useState(false)

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const [login, setLogin] = useState(loginInitialValues)
  const [passShow, setPassShow] = useState(false)
  const generateError = (error) =>
    toast.error(error, {
      position: "top-center",
    });
    
  const loginUser = async (e) => {
    e.preventDefault();
    if (login.email === '' || !login.email.includes("@")) {
      toast.error("Enter valid email")
    } else if (login.password === '') {
      toast.error("Enter your password")
    } else {
      setIsLoading(true)
      const response = await authenticateLogin(login);
      setIsLoading(false)
      if (response) {
        if (response.status !== 201) {
          setUser(login.email);
          localStorage.setItem('login',login.email)
          setLogin(loginInitialValues);
          toast.success('login Successful!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "colored", 
          });
          setTimeout(()=>{
            navigate('/')
          },2000);
        } else {
          const { email, password } = response.data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        }
      }
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
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
      <section className=" mt-32 md:mt-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[75.4vh] sm:h-[89vh] lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" value={login.email} onChange={(e) => onValueChange(e)} id="email" autoComplete="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <div className='flex relative'>
                    <input type={!passShow ? "password" : "text"} value={login.password} onChange={(e) => onValueChange(e)} name="password" id="password" autoComplete="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div className='absolute right-2 top-2 cursor-pointer' onClick={() => setPassShow(!passShow)}><box-icon type='solid' name='show'></box-icon></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" checked readOnly aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline text-white">Forgot password?</Link>
                </div>
                <button type="submit" onClick={(e) => loginUser(e)} className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400">Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link to="/signUp" className='cursor-pointer underline text-blue-600'> Sign up </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginUser
