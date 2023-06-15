import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React from 'react';
import Categories from './components/Header/Categories';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header';
import ItemInfo from './components/Items/ItemInfo';
import Items from './components/Items/Items'
import Sell from './components/SellForm/Sell'
import LoginUser from './components/Authentication/LoginUser'
import SignUp from './components/Authentication/SignUp';
import AccountProvider from './components/Context/AccountProvider';
import ForgotPassword from './components/Authentication/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword';
import Cart from './components/Items/Cart';
import OtpVerify from './components/Authentication/OtpVerify';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
// import CategoryItems from './components/CategoryItems';
function App() {
  return (
     <React.Fragment>
      <AccountProvider>
        <Router>
          <Header />
              <Routes>
                  <Route path='/' element={
                    <React.Fragment>
                      <Categories/>
                      <Items/>
                    </React.Fragment>
                   }/>
                  <Route path='/Sell' element={<ProtectRoute Component ={Sell}/>}/>
                  <Route path='/cart' element={<ProtectRoute Component ={Cart}/>}/>
                  <Route path='/login' element={<LoginUser/>}/>
                  <Route path='/signUp' element={<SignUp/>}/>
                  <Route path='/optVerification' element={<OtpVerify/>}/>
                  <Route path='/ItemInfo/:id' element={<ItemInfo/> }/>
                  <Route path='/forgot-password' element={<ForgotPassword/> }/>
                  <Route path='/reset-password/:email' element={<ResetPassword/> }/>
              </Routes> 
          <Footer/>
        </Router>
        </AccountProvider>
     </React.Fragment>
  );
}

export default App;
