import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getItemDetails } from '../../redux/actions'
import moment from 'moment'
function ItemInfo() {

  const { id } = useParams()
  const item = useSelector(state => state.itemDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    if (item && id !== item.id) {
      dispatch(getItemDetails(id))
    }
  }, [dispatch, id])

  return (
    <div className='itemInfoBody h-full min-h-[70vh] my-20 bg-[#eff1f3]'>
  <div className="itemInfoBodyIn mx-5 md:flex">
    
    <div className='flex md:w-7/12 my-1'>
      <img className='h-4/5 w-4/5 mx-auto my-3' src={`http://localhost:8000/${item.path}`} alt="error" />
    </div>

    <div className=' bg-[#F9F9F9] p-8 relative overflow-x-auto md:w-5/12'>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className='border-b border-gray-300 dark:border-gray-700'>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">Seller</th>
            <td className='px-6 py-4'><strong>{item.sellerName}</strong></td>
          </tr>
          <tr className='border-b border-gray-300 dark:border-gray-700'>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">Price</th>
            <td className='px-6 py-4'>₹<strong>{item.price}</strong></td>
          </tr>
          <tr className='border-b border-gray-300 dark:border-gray-700'>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">Category</th>
            <td className='px-6 py-4'><strong>{item.selectItem?item.selectItem:item.category}</strong></td>
          </tr>
          <tr className='border-b border-gray-300 dark:border-gray-700'>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">Uploaded On</th>
            <td className='px-6 py-4'><strong>{ moment(item.createdAt).format('DD-MM-YYYY')}</strong></td>
          </tr>
          <tr className='border-b border-gray-300 dark:border-gray-700'>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">Contact No</th>
            <td className='px-6 py-4'><strong>{item.contactNo}</strong></td>
          </tr>
          <tr className='border-b border-gray-300 dark:border-gray-700'>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">Contact Details</th>
            <td className='px-6 py-4 '><strong>{item.contactDetails?item.contactDetails:"Not Provided"}</strong></td>
          </tr>
          <tr className='border-b border-gray-300 dark:border-gray-700'>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">Product description</th>
            <td className='px-6 py-4'><strong>{item.productDetails}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

  )
}

export default ItemInfo

