import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AccountContext } from '../Context/AccountProvider';
import { useNavigate } from 'react-router-dom';
import { getCategoryItem } from '../../redux/actions';
import { useDispatch } from 'react-redux';
function Header() {
  const navigate = useNavigate()
  const {user,setUser} =useContext(AccountContext) 
  const [category,setCategory] = useState('')
  const dispatch = useDispatch()
  const loginNavigate = ()=>{
    if(user){
      setUser('')
      localStorage.removeItem('login')
    }else{
      navigate('/login')
    }
  } 
  const onButtonclick = (e) =>{
    e.preventDefault();
    dispatch(getCategoryItem(category))
    setCategory('')
  }

  return (
    <div className="navbar  z-50 h-16 bg-[#eff1f3] fixed top-0 w-full font-serif">
  <div className="navIn flex justify-between pt-4 sm:px-10 md:px-20">
    <div className="flex items-center w-full md:w-auto">
      <div className="logo mx-4 text-2xl">
        <Link to="/">CAMPUSmart</Link>
      </div>
      <form action="" className="relative flex-grow hidden md:block">
        <input value={category} onChange={(e)=>setCategory(e.target.value)} type="text" className="w-full h-8 px-2 py-1 border border-black rounded-md" placeholder="Search for products..." />
        <button onClick={onButtonclick} className="absolute top-1 right-2 pb-2">
          <box-icon name='search'></box-icon>
        </button>
      </form>
    </div>
    <div className="flex items-center space-x-4 md:space-x-8">
      <Link to='/cart'><box-icon name='cart' ></box-icon></Link>
      <div onClick={loginNavigate}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full px-2 sm:px-4 py-1 w-min h-min sm:w-auto">
          {user?'LogOut':'Login'}
        </button>
      </div>
      <Link to='/sell'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full px-2 sm:px-4 py-1 w-min h-min sm:w-auto mr-1 sm:mr-0">
          Sell
        </button>
      </Link>
    </div>
  </div>
</div>

   

  )}

export default Header