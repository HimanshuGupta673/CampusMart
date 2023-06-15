import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, removeCartItem } from '../../redux/actions';
import moment from 'moment';
import { useContext } from 'react';
import { AccountContext } from '../Context/AccountProvider'

function Cart() {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const {user} = useContext(AccountContext);
  const getCart = () => {
    return cartItems.filter(item => item.email === user);
  };

  if (getCart().length === 0) {
    return <div className='cart mt-20 text-center min-h-[78.4vh]'>Cart is empty.</div>;
  }
  
  const deleteItem = (id) => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className='cart mt-20 w-[80%] md:w-[50%] mx-auto border-2 bg-zinc-200 px-11 min-h-screen h-auto mb-10' style={{ minHeight: '72.79vh' }}>
      <h1 className='text-3xl font-bold mb-6 flex justify-center'>Cart Items</h1>
      {getCart().map((item, index) => (
        <div key={item._id} className='flex md:flex-row items-center mb-4 border-b-2'>
          <img src={`http://localhost:8000/${item.path}`} alt={item.title} className='w-32 h-32 object-cover rounded-md mb-4 md:mr-4 mr-4' />
          <div className='flex flex-col md:flex-row items-center justify-between w-full'>
            <p className='text-base mb-2 md:mb-0 md:mr-4'>Listed on: {moment(item.posted).format('DD-MM-YYYY')}</p>
            <p className='text-base mb-2 md:mb-0 md:mr-4'>Price: {item.price}</p>
            <button onClick={() => deleteItem(item._id)} className='bg-red-500 text-white px-2 py-1  rounded'>
              Delete
            </button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Cart;
