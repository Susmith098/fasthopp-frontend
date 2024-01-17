import React, { useState } from 'react'
import Header from '../../../components/User/Header/Header'
import Footer from '../../../components/User/Footer/Footer'
import Broadcast from '../../../components/Notification/Broadcast'
import { useSelector } from 'react-redux'


const Notification = () => {
    const notificationData = useSelector(state => state.notification.broadcast);

    return (
        <div>
            <Header />

            <div className='px-4'>
                <h3 className='my-2 text-lg font-bold'>Notifications</h3>
            </div>
            <div className='m-3 p-1 bg-app-light-bg max-h-fit rounded-lg shadow-lg'>
            <div>
            {notificationData && notificationData.length > 0 ? (
                                <div className='bg-[#c0a4f0] shadow-lg rounded-lg my-5 text-center p-1'>
                                    <Broadcast />
                                </div>
                            ) : (
                                <div className='bg-[#b795f1] shadow-lg rounded-lg my-5 text-center p-4'>
                                    <p>No notifications!</p>
                                </div>
                            )}
                
            </div>
            </div>

            <Footer />
        </div>
    )
}

export default Notification