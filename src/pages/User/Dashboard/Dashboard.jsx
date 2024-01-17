import React, { useEffect, useState } from 'react'
import Header from '../../../components/User/Header/Header'
import Footer from '../../../components/User/Footer/Footer'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CreateMeeting from '../../../components/Meet/CreateMeeting';
import CreateBoard from '../../../components/Task/CreateBoard';
import Broadcast from '../../../components/Notification/Broadcast'

export default function Dashboard() {

    const meetingData = useSelector(state => state.meetingData)
    const allboards = useSelector(state => state.boards)
    const [showForm, setShowForm] = useState(false)
    const [showMeeting, setShowMeeting] = useState(false)
    const [boardForm, setBoardForm] = useState(false)
    const [boardData, setBoardData] = useState([])
    const [meetingState, setMeetingState] = useState([])
    const navigate = useNavigate()
    const notificationData = useSelector(state => state.notification.broadcast);


    // getting all baords data from redux and updating board data state
    useEffect(() => {
        if (allboards) {
            setBoardData(allboards)
        }
    }, [allboards])


    // getting all meeting data from redux and updating meeting data state
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
        <>
            <Header />

            <div className='px-4'>
                <h3 className='my-2 text-lg font-bold'>Dashboard</h3>
            </div>

            <div className='m-3 bg-app-light-bg max-h-fit rounded-lg shadow-lg py-5'>

                <div className='flex p-14'>

                    <div className=' bg-white px-3 py-2 mx-3 rounded-lg  w-[45%] shadow-lg'>
                        <p className='text-xl font-semibold'>Meetings</p>

                        <div>
                            <div className='bg-app-bg text-center text-white w-full h-[40%] rounded-lg shadow-lg'>
                                <div className='mt-5'>
                                    <p className=' m-3 p-1'>Join a Meet Now</p>
                                </div>
                            </div>

                            <div>
                                {meetingState && meetingState?.length > 0 && meetingState.slice(0, 2).map((meet) => (
                                    (
                                        <div key={meet.id} className='flex justify-around shadow-lg bg-[#865fc8] p-4 mb-2 rounded-lg'>
                                            <div className='block text-white'>
                                                <p className=' px-1 text-sm font-bold'><span>Room ID: {meet.roomId}</span></p>
                                                <p className=' px-1 text-sm font-normal'><span>Description: {meet.description}</span></p>
                                                <br />
                                                <p className=' px-1 pt-1 text-xs font-medium'>Starts: {new Date(meet.startingTime).toLocaleString()}</p>
                                                <p className=' px-1 pt-1 text-xs font-medium'>Expires: {new Date(meet.expirationTime).toLocaleString()}</p>
                                            </div>
                                            <div className='m-auto'>
                                                {new Date() >= new Date(meet.startingTime) ? (
                                                    <div className='text-center  mt-2'>
                                                        <button
                                                            className='bg-white px-3 py-1 shadow-lg rounded-lg text-black'

                                                            onClick={() => handleJoin(meet.roomId)} key={meet.id}>
                                                            Join now
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p className='bg-black px-3 py-1 text-white rounded-lg'>Not yet started</p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>


                        </div>

                        <div className='bg-white w-full shadow-lg border rounded-lg  mt-5 mb-2 p-2 flex flex-col'>
                            <p className='2 text-center p-3'>Create a new Meet</p>
                            <div className='text-center mb-2'>
                                <button onClick={() => setShowMeeting(true)} className='align-middle text-white rounded-full px-3 pb-1 text-2xl bg-app-bg shadow-lg'>+</button>
                            </div>
                            <div className='flex justify-center mb-3'>
                                <Link to='/meeting'
                                    className='bg-[#a980ee] shadow-lg rounded-lg px-2 py-1 text-white' >
                                    View More
                                </Link>
                            </div>

                        </div>


                    </div>

                    <div className=' bg-white px-3 py-2 mx-3 rounded-lg  w-[50%] shadow-lg'>
                        <p className='text-xl font-semibold'>Notifications</p>
                        <div>
                            {notificationData && notificationData.length > 0 ? (
                                <div className='bg-[#c0a4f0] shadow-lg rounded-lg my-5 text-center p-1'>
                                    <Broadcast limit={3} />
                                </div>
                            ) : (
                                <div className='bg-[#b795f1] shadow-lg rounded-lg my-5 text-center p-4'>
                                    <p>No notifications!</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div >
                    <div className=' bg-white px-3 py-2 mx-16 rounded-lg  w-[90%] shadow-lg'>
                        <p className='text-xl font-semibold'>Boards</p>

                        <div className='bg-[#ae8bec] p-1 rounded-lg shadow-lg my-5'>
                            {boardData?.slice(0, 2).map((board) => (
                                <div key={board.id} className='flex justify-between m-2 rounded-lg bg-[#FFFFFF] p-4 shadow-lg'>
                                    <Link to={`/kanban-projects/${board.id}`} className='text-2xl hover:text-3xl font-bold'>
                                        <p>{board.name}</p>
                                        <p className='text-sm shadow-lg font-bold my-2 p-2 rounded-lg bg-[#dbcef1]'>{board.description}</p>
                                    </Link>
                                </div>
                            ))}
                            {boardData?.length === 0 && <p>No boards available</p>}
                        </div>


                    </div>
                </div>





                {showMeeting && <CreateMeeting closeModal={() => setShowMeeting(false)} />}
                {showForm && <Registraion closeModal={() => setShowForm(false)} />}
                {boardForm && <CreateBoard closeModal={() => setBoardForm(false)} />}

            </div>

            <Footer />
        </>
    )
}
