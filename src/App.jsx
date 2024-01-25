import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Public/Home/Home';
import Register from './pages/Public/Register/Register';
import Login from './pages/Public/Login/Login';
import Contact from './pages/Public/Contact/Contact';
import About from './pages/Public/About/About';
import UserRoutes from './routes/UserRoutes';
import { userDetail } from './store/User/userdataSlice';
import { useEffect } from 'react';
import { getAllBoards } from './store/Task/BoardSlice';
import { alluserDetails } from './store/User/userslistSlice';
import { getAllMeeting } from './store/Meet/MeetingSlice';
import { getBroadcastNotification } from './store/Notification/notificationSlice'



function App() {

  const dispatch = useDispatch()
  const { access, is_authenticated } = useSelector(state => state.usertoken)
  const userData = useSelector(state => state.userData)
  const allboards = useSelector(state=>state.allboards)
  const userslist = useSelector(state => state.users)

  useEffect(() => {
    if (access) {
      dispatch(userDetail(access));
    }
  }, [access])

 // getting all boards data
  useEffect(() => {
    if (access && userData?.companyName ) {
      const companyName = userData?.companyName
      if(companyName){
        dispatch(getAllBoards({ access, companyName }))

      }
       
    }
}, [access, userData?.companyName , dispatch])

// get all meeting 
useEffect(() => {
  if (access && userData?.companyName) {
    const companyName = userData?.companyName
    if (companyName) {
      dispatch(getAllMeeting({ access, companyName }))
    }
  }
}, [access, userData?.companyName, dispatch])

  // getting all notifications
  useEffect(() => {
    const fetchNotification = async () => {
        const companyName = userData?.companyName
        if (companyName) {
          await dispatch(getBroadcastNotification({ access, companyName }));
          
        }
    };
    fetchNotification();
  }, [dispatch, access, userData?.companyName]);

// get all user
useEffect(() => {
  if (userData && userslist?.length === 0) {
    if (userData?.role === 'MANAGER') {
      const companyName = userData?.companyName
      if (companyName) {
        dispatch(alluserDetails({ access, companyName }))
      }
    }
  }
})

  return (
    <Router>
      < Routes >

      {/* protected routes */}
      <Route path='/*' element={<UserRoutes role={userData?.role }/>} />
      
      {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!is_authenticated ? <Login /> : <Navigate to='/dashboard' />} />
        <Route path='register' element={!is_authenticated ? <Register /> : <Navigate to='/dashboard' />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about' element={<About />} />

      </Routes>
    </Router>

  )
}

export default App
