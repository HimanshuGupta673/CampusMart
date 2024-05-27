import React, { useEffect } from 'react'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { getAllItems } from '../../redux/actions'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';
import Loader from '../Loader/Loader';
import { useContext } from 'react';
import { AccountContext } from '../Context/AccountProvider';

function Items() {
  const {user,setUser} = useContext(AccountContext)
  const [numItemsToShow, setNumItemsToShow] = useState(7);
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector(state => state.items)
  const categoryItem = useSelector(state => state.categoryItems)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(getAllItems());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setIsLoading(true);
    fetchData();
  }, [dispatch]);

  
  useEffect(() => {
    const usr = localStorage.getItem('login')
    if(!user){
      setUser(usr)
    }
  }, []);
  
  if (isLoading) {
    return <div className='flex justify-center items-center'>{<Loader/>}</div>
  }
  const getItems = () => {
    if (categoryItem.length !== 0) {
      return categoryItem.slice(0, numItemsToShow);
    } else {
      return items.slice(0, numItemsToShow);
    }
  };
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setNumItemsToShow(numItemsToShow + 7);
      setIsLoading(false);
    }, 1000); // Adjust the delay time as needed
  };


  return (
    <div className='itemsBody mx-auto mt-16 mb-20 px-[10%] min-h-[55vh]'>
      <div className="fresh text-3xl bg-[#eff1f3] font-serif text-center">
        <div className='fresh'>
          <h2>Welcome To CAMPUSmart , Your Online Campus Store : Fresh Recommendations</h2>
        </div>
      </div>



        <InfiniteScroll
          dataLength={numItemsToShow}
          next={handleLoadMore}
          hasMore={numItemsToShow < (categoryItem.length || items.length)}
          loader={isLoading && <div className='flex justify-center items-center'>{<Loader/>}</div>}
          scrollThreshold={0.8}
          style={{ overflow: 'visible' }}
        >
          <div className="itemsBodyIn grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  mt-3 mb-6">
          {items.length === 0 && (
            <div className=" mt-20 mx-auto "><h1 className='text-xl flex justify-center'>Loading...</h1></div>
          )}
          {getItems().map((item) => (
            <Item key={item._id} item={item} />
          ))}
          </div>
        </InfiniteScroll>
    </div>
  )
}

export default Items
