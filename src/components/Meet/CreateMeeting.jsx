import React, { useState } from 'react'
import { createMeetAxios } from '../../server/Meet/CreateMeeting'
import { useDispatch, useSelector } from 'react-redux'
import { updateMeetingData } from '../../store/Meet/MeetingSlice'
import { IoIosCloseCircle } from "react-icons/io";

const CreateMeeting = ({ closeModal }) => {
    const access = useSelector(state => state.usertoken.access)
    const { companyName, userId } = useSelector(state => state.userData)
    const [roomID, setRoomID] = useState('');
    const [description, setDescription] = useState('');
    const [startingtime, setStartingtime] = useState('');
    const [duration, setDuration] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleStartingTime = (e) => {
        const time = e.target.value + ":00"
        setDateTime(time)
        const timestamp = new Date(time).getTime() / 1000;
        setStartingtime(timestamp)
    }

    // access, userId, companyName, roomID, description, startingtime, duration

    const handleMeetingCreation = (e) => {
        e.preventDefault()
        if (roomID && description && startingtime && duration) {

            const selectedDateTime = new Date(dateTime).getTime() / 1000;
            const currentDateTime = new Date().getTime() / 1000;
            if (selectedDateTime < currentDateTime) {
                setError('Cannot create a meeting for a past date or time')
            }
            
            createMeetAxios(access, userId, companyName, roomID, description, startingtime, duration).then((response) => {
                dispatch(updateMeetingData(response))
                closeModal()
            })
                .catch((error) => {
                    setError('Error creating the meeting: ' + error.message);
                });
        } else {
            setError('Please fill all details')

        }


    }

    return (
        <div>
            <div className=' absolute !w-[100%]  bg-app-bg rounded-lg'>
                <div className='overlay '>
                    <div className='modal-content '>
                        <button className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] flex justify-center items-center mt-4 rounded-full' onClick={closeModal}><IoIosCloseCircle /></button>
                        <form>
                            <div className="mb-2 mt-1">
                                <input
                                    required value={roomID} onChange={(e) => setRoomID(e.target.value)}
                                    className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="room name" type="text"
                                    placeholder="Room name"
                                />
                            </div>
                            <div className="mb-2">
                                <input required
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                    className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="description"
                                    type="text" placeholder="Description"
                                />
                            </div>

                            <div className="mb-2">
                                <input
                                    value={dateTime || ''}
                                    onChange={handleStartingTime}
                                    className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline  mt-2"
                                    id="datetime"
                                    type="datetime-local"
                                    placeholder="Date and Time"
                                    min={new Date().toISOString().split(":", 2).join(":")}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    value={duration} onChange={(e) => setDuration(e.target.value)}
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 shadow-lg
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="duration"
                                    type="number" placeholder="Duration in minutes"
                                />
                            </div>
                            <div className='flex justify-center'><button onClick={handleMeetingCreation} className='bg-[#ae8bec] text-white rounded px-2 py-1 shadow-lg my-5'>CREATE MEETING</button></div>
                            <p>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMeeting