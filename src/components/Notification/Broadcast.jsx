import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../Loading'

const Broadcast = ({ limit }) => {
  const load = useSelector(state => state.loading)
  const allNotifications = useSelector(state => state.notification.broadcast)
  const [result, setResult] = useState([])

  // setting limited notification for dashboard
  useEffect(() => {
    if (limit) {
      const filteredNotifications = allNotifications.slice(0, limit);
      setResult(filteredNotifications);
    }
    else {
      setResult(allNotifications);
    }
  }, [limit]);

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