import React, { useRef, useState } from 'react'
import Header from '../../../components/User/Header/Header'
import Footer from '../../../components/User/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../store/User/userdataSlice';
import { changeDetails } from '../../../server/User/userDetail';

const Profile = () => {
    const [popup, setPopup] = useState('')
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.userData);
    const { access } = useSelector((state) => state.usertoken);

    // initial data for state
    const initialData = {
        name: userData?.name || '',
        email: userData?.email || '',
        address: userData?.address || '',
        designation: userData?.designation || '',
    };
    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    };

    // change submit function
    const handleAllChange = () => {
      
        console.log("dssdff")
        changeDetails(data, access)
            .then((response) => {

                console.log(response, "response message")
                setPopup("Updated successfully");

                if (response.userId) {
                    console.log(response)
                    dispatch(updateUser(response))
                }
            }).catch((error) => {
                setPopup('update successful')
            })
    }

    return (

        <div>
            <Header/>

            <div className='px-4'>
                <h3 className='my-2 text-lg font-bold'>Profile</h3>
            </div>

        <div className='flex'>

            <div className='px-5 m-5 py-5 flex rounded-lg w-full bg-[#EEEAF5] shadow-lg'>
            
                <div className='flex lg:flex-col-reverse shadow-lg  text-white bg-[#ae8bec] mx-auto box-border 
                py-8 max-h-max w-[80%]  px-10 rounded-lg relative'
                >
                    
                    <div className=' w-9/12 lg:w-full capitalize'>


                        <div className='flex justify-between space-x-3   p-2 '>
                            <h3 className=' font-semibold  '>Name:</h3>
                            <input
                                className=" text-black rounded-md w-[50%] border px-3 py-1 shadow-lg"
                                value={data?.name} onChange={handleChange} type='text' name='name'
                            />
                        </div>
                        <div className='flex justify-between  space-x-3   p-2'>
                            <h3 className=' font-semibold'>email:</h3>

                            <input className=" text-black rounded-md w-[50%] border px-3 py-1 shadow-lg"
                                value={data.email} onChange={handleChange} type='email' name='email'
                            />
                        </div>
                        <div className='flex justify-between  space-x-3  p-2'>
                            <h3 className=' font-semibold'>Address:</h3>
                            <input className="text-black rounded-md w-[50%] border px-3 py-1 shadow-lg"
                                value={data.address} onChange={handleChange} type='text' name='address'
                            />
                        </div>
                        {userData?.role === 'MANAGER' ? (<div className='flex justify-between  space-x-3  p-2'>
                            <h3 className=' font-semibold'>Designation:</h3>
                            <input
                                className=" text-black rounded-md w-[50%] border px-3 py-1 shadow-lg"
                                value={data.designation} onChange={handleChange} type='text' name='designation'
                            />

                        </div>) : (<div className='flex justify-between  space-x-3  p-2'>
                            <h3 className=' font-semibold'>Designation:</h3>
                            <p className='w-[50%]' >{data.designation} </p>
                        </div>)}
                        <div className='flex justify-between  space-x-3  p-2'>
                            <h3 className=' font-semibold'>Role:</h3>
                            <p className='w-[50%]'>{userData?.role} </p>
                        </div>
                        <div className='flex justify-between space-x-3  p-2'>
                            <h3 className=' font-semibold'>Joined On:</h3>
                            <p className='w-[50%]'>{new Date(userData?.joinedAt).toLocaleString()} </p>
                        </div>

                        <div className='flex justify-between  space-x-3  p-2'>
                            <h3 className=' font-semibold'>Workspace:</h3>
                            <p className='w-[50%]'>{userData?.companyName} </p>
                        </div>

                        <button
                            className='bg-[#ffffff] text-black font-bold w-full my-3 rounded p-2 shadow-lg'
                            onClick={handleAllChange} >Save Changes
                        </button>

                        <p className='text-app-green text-center'> {popup}</p>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer/>
        </div>
    )
}

export default Profile