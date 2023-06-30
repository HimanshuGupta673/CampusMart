import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { sellNewItem} from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';
import Loader from '../Loader/Loader';
import { useContext } from 'react';
import AccountProvider, { AccountContext } from '../Context/AccountProvider'
function Sell() {

    const sellItemInitialValues = {
        sellerName: '',
        category:'',
        productDetails: '',
        contactDetails:'',
        contactNo: '',
        price: '',
    };

    const {user} = useContext(AccountContext)
    const [sellItem,setsellItem] = useState({...sellItemInitialValues,email:user});
    const [selectItem,setSelectItem] = useState('');
    const [image,setImage] = useState('')
    const imageInputRef = useRef(null);   //-->to make the image input field empty after successfully sell an item
    const [isLoading,setIsLoading] = useState(false)

    const onInputChange = (e) =>{
        setsellItem({...sellItem,[e.target.name]: e.target.value})
    }

    const dispatch = useDispatch();

    const SellItem = (e)=>{
        
        e.preventDefault();
        if(sellItem.sellerName && sellItem.contactNo && sellItem.contactDetails && sellItem.email && sellItem.price && sellItem.productDetails && (sellItem.category || selectItem) && imageInputRef!=null){
                const formData = new FormData();
                formData.append('title', image.name);
                formData.append('file', image);
                formData.append('selectItem', selectItem);
                for (const key in sellItem) {
                    formData.append(key, sellItem[key]);
                }
                setIsLoading(true)
                const res = dispatch(sellNewItem(formData));
                setIsLoading(false)
              if(res){
                setsellItem(sellItemInitialValues);
                imageInputRef.current.value = ''
                setSelectItem('')
                toast.success('Your Item is On sale now', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "colored",
                  });
              }else{
                toast.error('failed to sell ', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    theme: "colored",
                  });
                }
            }else{
            toast.error('please fill the essential fields to sell your product', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
              });

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
        <div className='min-h-fit mb-20 mt-30 md:w-[40%] mx-4 sm:m-auto font-serif' >
            <div className=" justify-center mt-20">
                <div className="mb-4">
                    <div className="px-2">
                        <h3>Disclaimer:</h3>
                        <p className="mt-1 text-sm text-gray-600 font-serif text-justify">                      
                                Please provide as much information as possible about the item you wish to sell.Provide clear and detailed photos of the item, including any identifying marks or labels .Provide your contact information so that potential buyers can reach you with questions or to make an offer
                        </p>
                    </div>
                </div>
                <div className=" md:mt-0 md:col-span-2">
                    <form onSubmit={SellItem} encType="multipart/form-data" >
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Seller name* : </label>
                                    <input value={sellItem.sellerName} onChange={(e) => onInputChange(e)} type="text" name="sellerName" id="first_name" autoComplete="given-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />
                                </div>
                                 
                                <div className="col-span-6 sm:col-span-3 flex ">
                                    <label htmlFor="items" className="block text-sm font-medium text-gray-700">Category : </label>
                                    <select value={selectItem} onChange={(e)=> {setSelectItem(e.target.value)}} id="items" className='ml-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  p-1'>
                                        <option disabled ></option>
                                        <option >Cooler</option>
                                        <option >Cycle</option>
                                        <option >Electric Kettle</option>
                                        <option >Matress</option>
                                        <option >Calculator</option>
                                        <option >Mini Drafter</option>
                                    </select> 
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-red-400">
                                        If your item is not listed in category type mannually in a single word (Additional*) : 
                                    </label>
                                    <div className="mt-2">
                                        <input value={sellItem.category} onChange={(e) => onInputChange(e)} id="category" name="category" rows="3" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="eg : cycle"></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Product Details* : 
                                    </label>
                                    <div className="mt-2">
                                        <textarea value={sellItem.productDetails} onChange={(e) => onInputChange(e)} id="about" name="productDetails" rows="3" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="Tell something about your product"></textarea>
                                    </div>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="contact_no" className="block text-sm font-medium text-gray-700">Contact No.* </label>
                                    <input value={sellItem.contactNo} onChange={(e) => onInputChange(e)} type="text" name="contactNo" id="contact_no" autoComplete="given-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="contact_det" className="block text-sm font-medium text-gray-700">Contact Details* </label>
                                    <input value={sellItem.contactDetails} onChange={(e) => onInputChange(e)} type="text" name="contactDetails" id="contact_det" autoComplete="given-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />
                                </div>
                                   
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email*</label>
                                    <input disabled value={sellItem.email} type="email" name='email' id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="name@gmail.com"/>
                                </div> 

                                <div>
                                    <label htmlFor="price" className=" text-sm font-medium text-gray-700">
                                        Price* :
                                    </label>
                                    <div className="mt-2">
                                        <input value={sellItem.price} onChange={(e) => onInputChange(e)} className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' type="text" name='price' id='price' />
                                    </div>
                                </div>
                                <div>
                                    <input type="file" name='file' ref={imageInputRef} onChange={(e)=>setImage(e.target.files[0])} />
                                    <p style={{fontSize:"9px",color:'red'}}>Note:Please upload a horizontal image for better display</p>
                                </div>


                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type='submit' className=" inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Sell
                                </button>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sell
