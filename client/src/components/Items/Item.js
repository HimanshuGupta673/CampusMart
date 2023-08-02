import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
function Item({ item }) {

  return (
    <Link to={`ItemInfo/${item._id}`}>
      <div className='itemBody shadow-lg bg-white rounded-md m-4 cursor-pointer transition duration-500 transform hover:scale-105'>
        <div>
          <img className='h-44 m-auto pt-4' src={`https://campusmart-lxbl.onrender.com/${item.path}`} alt="error" />
        </div>
        <div className='pl-6'>
          {/* <h5>Seller { item.sellerName}</h5> */}
          <h2 ><strong className='text-3xl'>₹{item.price}</strong>/only</h2>
          <h5 style={{color:'#878787'}}>{ moment(item.createdAt).format('DD-MM-YYYY')}</h5>
          <h5 style={{color:'#878787'}}>{ item.selectItem?item.selectItem:item.category}</h5>
          </div>
      </div>
    </Link>

  )
}

export default Item
