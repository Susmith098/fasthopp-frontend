import React, { useState } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 } from "uuid"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const VideoMeet = () => {
    const userData = useSelector(state => state.userData)
    const meetingData = useSelector(state => state.meetingData)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { roomID } = useParams()
    const location = useLocation()

    // zego credentials
    const appID = parseInt(import.meta.env.VITE_APP_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_APP_ZEGO_SERVER_SECRET;

    // creating new meeting
    const meetingUI = async (element) => {
        if (meetingData) {
            if (userData) {
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    serverSecret,
                    roomID,
                    v4(),
                    userData?.name,

                );

                try {
                    const zp = ZegoUIKitPrebuilt.create(kitToken);
                    zp.joinRoom({
                        container: element,
                        sharedLinks: [
                            {
                                'name': 'Copy Link',
                                'url': `http://localhost:5173/meeting/${roomID}`,
                            }
                        ],
                        scenario: {
                            mode: ZegoUIKitPrebuilt.VideoConference,
                        },
                        onLeaveRoom: (user) => {
                            navigate('/meeting')
                        },
                    })

                } catch (error) {
                    console.error('Error joining room:', error);
                }
            }

        }
    }

    return (
        <div
            className='bg-slate-800  w-full h-screen'
        >
            <div
                ref={meetingUI}
            >

            </div>
            <h3
                className=' uppercase text-center p-4 text-white'
            >
                {error}
            </h3>
        </div>
    )
}

export default VideoMeet