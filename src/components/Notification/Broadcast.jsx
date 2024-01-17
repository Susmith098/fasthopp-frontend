import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/Loading/loadingSlice'
import { getBroadcastNotification } from '../../store/Notification/notificationSlice'
import Loading from '../Loading'

const Broadcast = ({ limit }) => {
  const access = useSelector(state => state.usertoken.access)
  const userData = useSelector(state => state.userData)
  const load = useSelector(state => state.loading)
  const allNotifications = useSelector(state => state.notification.broadcast)
  const [result, setResult] = useState([])
  const dispatch = useDispatch()


  // setting 3 notification for dashboard
  useEffect(() => {
    if (limit) {
      const filteredNotifications = allNotifications.slice(0, limit);
      setResult(filteredNotifications);
    }
    else {
      setResult(allNotifications);
    }
  }, [limit]);

  // getting all notifications
  // useEffect(() => {
  //   const fetchNotification = async () => {
  //     try {
  //       dispatch(setLoading(true));
  //       const companyName = userData?.companyName
  //       if (companyName) {
  //         await dispatch(getBroadcastNotification({ access, companyName }));
  //         dispatch(setLoading(false));
  //       }

  //     } catch (error) {
  //       // Handle error if needed
  //       dispatch(setLoading(false));
  //     }
  //   };
  //   fetchNotification();
  // }, [dispatch, access, userData?.companyName]);

  return (
    <>
    {load && <Loading />}
      {result?.length > 0 &&
        result.map((notification) => {
          return (
            <div
              className='bg-[#FFFFFF]  border p-3 m-2  flex   
              justify-around rounded-md text-justify shadow-lg'
            >
              <p className='font-normal text-black text-medium'>
                New user  <span className='font-bold'>{notification.username}</span> is joined in your workspace {notification.companyName}
              </p>
              <p className='pt-4 text-black font-sm text-sm'>
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>)
        })}
    </>

  )
}

export default Broadcast