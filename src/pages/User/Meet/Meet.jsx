import React, { useEffect, useState } from 'react'
import Header from '../../../components/User/Header/Header'
import Footer from '../../../components/User/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import CreateMeeting from '../../../components/Meet/CreateMeeting';
import { useNavigate } from 'react-router-dom'

import { MdDelete } from "react-icons/md";
import DeletePopup from '../../../components/User/PopUp/DeletePopup';

const Meet = () => {

    const access = useSelector(state => state.usertoken.access)
    const userData = useSelector(state => state.userData)
    const meetingData = useSelector(state => state.meetingData)
    const [meetingState, setMeetingState] = useState([])
    const dispatch = useDispatch()
    const currentDate = new Date()
    const [showform, setShowform] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (meetingData) {
            setMeetingState(meetingData)
        }
    }, [meetingData])

    // joing meeting when clicking button
    const handleJoin = (roomId) => {
        navigate(`/meeting/${roomId}`);
    }


    return (
        <div>
            <Header />

            <div className='px-4'>
                <h3 className='my-2 text-lg font-bold'>Meeting</h3>
            </div>

            <div className='px-4 m-3 py-2 flex rounded-lg justify-end bg-[#EEEAF5] shadow-lg' >
                <div className='mx-6'>
                    <button onClick={() => setShowform(true)}
                        className='bg-[#ffffff] text-sm shadow-lg text-center
                 text-black px-3 py-2 rounded'>
                        Create a new meeting
                        <span className='font-bold text-lg ml-2 px-1.5 py-0.5 bg-[#43247c] text-white rounded-lg shadow-lg'>+
                        </span>
                    </button>
                </div>
            </div>

            <div className=''>

                <div className='m-3 bg-app-light-bg max-h-fit rounded-lg shadow-lg'>
                    <div className='w-full  px-2 py-4'>
                        <div className='w-[100%] rounded-lg bg-[#ae8bec] p-4 shadow-lg'>
                            <p className='text-white p-2 text-xl font-semibold mb-5'> Meetings</p>
                            {meetingState && meetingState?.length > 0 && meetingState.map((meet) => (
                                (
                                    <div key={meet.id} className='flex align-bottom justify-between   bg-[#865fc8] p-4 mb-3 rounded-lg shadow-lg'>
                                        <div className=' text-white m-auto'>
                                            
                                                <p className=' text-lg font-normal'><span>Room ID: {meet.roomId}</span></p>
                                                <p className=' text-lg font-normal'><span>Description: {meet.description}</span></p>
                                           
                                        </div>
                                        <div className=' text-white m-auto'>
                                        
                                            <p className='pt-1 text-sm font-medium'>Starts: {new Date(meet.startingTime).toLocaleString()}</p>
                                            <p className='pt-1 text-sm font-medium'>Expires: {new Date(meet.expirationTime).toLocaleString()}</p>
                                   
                                        </div>
                                        <div className='m-auto'>
                                            {new Date() >= new Date(meet.startingTime) ? (
                                                <div className='text-center  '>
                                                    <button
                                                        className='bg-white px-3 py-1  rounded-lg shadow-lg'

                                                        onClick={() => handleJoin(meet.roomId)} key={meet.id}>
                                                        Join now
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className='bg-black px-3 py-1 text-white rounded-lg'>Not yet started</p>
                                            )}
                                        </div>
                                        {userData?.role === 'MANAGER' &&

                                            <div className='pt-1 m-auto'>

                                                <button>
                                                    <MdDelete onClick={(e) => setShowModal(true)} color='firebrick' size={'35px'} />
                                                </button>
                                                {showModal &&
                                                    <DeletePopup type={'meeting'} access={access} id={meet.id}
                                                        closeModal={() => setShowModal(false)} />
                                                }
                                            </div>
                                        }
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                </div>
                {showform && <CreateMeeting closeModal={() => setShowform(false)} />}

            </div>

            <Footer />


        </div>
    )
}

export default Meet