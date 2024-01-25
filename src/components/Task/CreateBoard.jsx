import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBoard } from '../../store/Task/BoardSlice'
import { setLoading } from '../../store/Loading/loadingSlice'
import Loading from '../Loading'
import { IoIosCloseCircle } from "react-icons/io";

const CreateBoard = ({ closeModal }) => {
    const access = useSelector(state => state.usertoken.access)
    const { userId, companyName, role } = useSelector(state => state.userData)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const load = useSelector(state => state.loading)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
console.log(access, '----', companyName)
    console.log(name, description)
// creating new cards with the given details
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (trimmedName && trimmedDescription) {
          
            if (access && companyName) {
                dispatch(setLoading(true))
                dispatch(createNewBoard({ access, companyName, userId, name: trimmedName, description: trimmedDescription })).then((res) => {
                    dispatch(setLoading(false))
                    closeModal()
                })
                .catch((error) => {
                    dispatch(setLoading(false))
                    setError('Error creating board')
                });
            }
        } else {
            setError('Please fill all details required')
        }
    }

    return (

        <div className='absolute top-16 right-44 lg:right-24 xl:right-32  md:right-36 sm:right-10 bg-app-bg rounded-lg w-[60%] xl:w-[50%] sm:w-[80%]'>
            <div className='overlay'>
                <div className='modal-content !rounded-lg '>
                    {load && <Loading/>}
                    <button className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] flex justify-center items-center mt-4 rounded-full' onClick={closeModal}><IoIosCloseCircle /></button>
                    <h3 className=' font-bold text-center'>CREATE BOARD</h3>
                    <form className=" px-4 py-4 mb-4 w-full">
                        <div className='mb-3'>
                            <input value={name} onChange={(e) => setName(e.target.value)} className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" name="name" type='text' placeholder='board name' />
                        </div>

                        <div className='mb-2 '>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" name='description' type='text' placeholder='description' />
                        </div>

                        

                        <div className='text-center mt-3 flex justify-center'>
                            <button onClick={handleSubmit} className=' bg-[#ae8bec] shadow-lg text-white w-full rounded-lg m-2 py-1 text-center'>CREATE</button>
                        </div>

                    </form>
                    <p>{error}</p>
                </div>
            </div>
        </div>
    )
}

export default CreateBoard