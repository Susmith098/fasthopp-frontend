import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../../server/User/userRegister'
import { Success } from '../../store/User/authSlice'
import { userSchema } from '../../Validations/RegisterValidation';
import { ValidationError } from 'yup'
import { addNewUser } from '../../store/User/userslistSlice'
import { setLoading } from '../../store/Loading/loadingSlice'
import Loading from '../Loading'
import { IoIosCloseCircle } from "react-icons/io";


const userRegistration = ({ closeModal }) => {
    const userData = useSelector(state => state.userData)
    const access = useSelector(state => state.usertoken.access)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const load = useSelector(state => state.loading)

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            email: email,
            companyName: userData?.companyName,
            password: password,
        }

        if (
            name && email && userData?.companyName && password
        ) {
            try {
                await userSchema.validate(formData)
                const registrationResponse = await userRegister(
                    name, email, userData?.companyName,
                    password, access
                )
                if (registrationResponse.userId) {
                    console.log(registrationResponse, "from user register")
                    dispatch(setLoading(true))
                    dispatch(addNewUser(registrationResponse))
                    dispatch(Success(registrationResponse))
                    dispatch(setLoading(false))
                    closeModal()
                } else {
                    setError('Registration Failed, please check all details and try again')
                }
            } catch (error) {
                if (error instanceof ValidationError) {
                    setError(error.message)
                } else {
                    setError('Something went wrong, please try again');
                }
            }
        } else {
            setError("Please fill all details")
        }
    }

    return (
        <div>
            <div className=' absolute !w-[100%]  bg-app-bg rounded-lg'>
                <div className='overlay '>
                {load && <Loading/>}
                    <div className='modal-content '>
                    
                        <button className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] flex justify-center items-center mt-4 rounded-full' onClick={closeModal}><IoIosCloseCircle /></button>
                        <form className=" capitalize shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
                            <p className='uppercase text-center font-semibold'>Register new user</p>

                            <div className="mb-2">
                                <input value={name} onChange={(e) => setName(e.target.value)} required className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" id="name" type="text" placeholder="Name" />
                            </div>
                            <div className="mb-2">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" id="email" type="email" placeholder="Email" required />
                            </div>
                            <div className="my-4 flex ">
                                <h3 className='font-bold round p-2'>Workspace: </h3>
                                <p className='p-2  text-gray-400  font-medium rounded-sm'>{userData?.companyName}</p>
                            </div>

                            <div className="mb-2">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mt-2" id="password" type="password" placeholder='Password' />
                            </div>
                            <div className="mb-2">
                                <p className='text-[#952e2e]'></p>
                            </div>
                            <div className="flex items-center justify-center">
                                <button onClick={handleRegistrationSubmit} className=" bg-[#ae8bec] shadow-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="button" >
                                    Regsiter
                                </button>
                            </div>
                            <p className='text-[#da4646]'>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default userRegistration