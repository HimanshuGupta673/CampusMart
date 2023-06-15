import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCategoryItem } from '../../redux/actions'
function Categories() {
   const [selectCategory,setSelectCategory] = useState('')

   const dispatch = useDispatch()

   useEffect(()=>{
    dispatch(getCategoryItem(selectCategory))
   },[dispatch,selectCategory])

  return (
    <div className='categories mt-20 pl-1'>
  <div className="categoriesIn flex sm:bg-[#eff1f3] justify-evenly">
    <select value={selectCategory} onChange={(e) => setSelectCategory(e.target.value)} name="cars" id="cars" className='h-7 my-auto bg-[#eff1f3] cursor-pointer w-[60%] sm:w-auto'>
      <option disabled>Category</option>
      <option>All</option>
      <option>Cooler</option>
      <option>Cycle</option>
      <option>Electric Kettle</option>
      <option>Matress</option>
      <option>Calculator</option>
      <option>Mini Drafter</option>
    </select>
    <img className='h-8 w-6 sm:h-24 sm:w-16 sm:block mx-4' src='https://cdn-icons-png.flaticon.com/512/1670/1670775.png' alt="" />
    <img className='h-8 w-6 sm:h-24 sm:w-16 sm:block mx-4' src='https://i.pinimg.com/originals/27/b4/c8/27b4c85e32573950a26fbf685d6e2464.png' alt="" />
    <img className='h-8 w-6 sm:h-24 sm:w-16 sm:block mx-4' src='https://www.sughana.com/image/coircomfort.png' alt="" />
    <img className='h-8 w-6 sm:h-24 sm:w-16 sm:block mx-4' src='https://cdn.shopify.com/s/files/1/1252/7903/products/Canon_F-605G_Side_V2_580X580_a8a6cba8-7375-41e9-9303-8bcd8acdb827_512x512.png?v=1618681406' alt="" />
    <img className='h-8 w-6 sm:h-24 sm:w-16 sm:block mx-4' src='https://cdn.pixabay.com/photo/2022/09/11/21/05/books-7448036_1280.png' alt="" />
  </div>
</div>

  )
}

export default Categories
