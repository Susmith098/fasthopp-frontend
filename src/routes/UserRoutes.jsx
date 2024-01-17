import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "../pages/User/Dashboard/Dashboard";
import Kanban from "../pages/User/Kanban/Kanban";
import Meet from "../pages/User/Meet/Meet";
import Notification from "../pages/User/Notifications/Notification";
import { People } from "../pages/User/People/People";
import Profile from "../pages/User/Profile/Profile";

import Board from '../pages/User/Kanban/Board';
import VideoMeet from '../pages/User/Meet/VideoMeet';
import CreateMeeting from '../components/Meet/CreateMeeting';


const UserRoutes = ({ role }) => {
    return (
        <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            {/* <Route path='kanban-projects' element={<Kanban />} /> */}
            <Route path='/kanban-projects/:board' element={<Kanban />} />
            <Route path='Boards' element={<Board />} />
            <Route path='meeting' element={<Meet />} />
            <Route path='meeting/:roomID' element={<VideoMeet />} />
            <Route path='/meeting/create-meet/' element={<CreateMeeting />} />
            <Route path='notifications' element={<Notification />} />
            {/* <Route path='/people' element={role === 'MANAGER' ? <People /> : <Navigate to='/dashboard' />} /> */}
            <Route path='/people' element={<People />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    )
}

export default UserRoutes;