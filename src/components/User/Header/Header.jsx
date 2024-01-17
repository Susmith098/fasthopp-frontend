import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearUser } from '../../../store/User/userdataSlice';
import { clearUsers } from '../../../store/User/userslistSlice';
import { clearColumns } from '../../../store/Task/ColumnsSlice';
import { clearCards } from '../../../store/Task/cardSlice';
import { clearMeeting } from '../../../store/Meet/MeetingSlice';
import { Logout } from '../../../store/User/authSlice';
import { clearBoard } from '../../../store/Task/BoardSlice';
import { clearNotification } from '../../../store/Notification/notificationSlice'
import { clearLoading } from '../../../store/Loading/loadingSlice';
import profileImage from '../../../assets/images/profile-img.png';


export default function Header() {
    const userdata = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // while logging out, cleared user data from state and redirect logging page
  const logoutUser = () => {
    dispatch(clearUser())
    dispatch(clearUsers())
    dispatch(clearBoard())
    dispatch(clearColumns())
    dispatch(clearCards())
    dispatch(clearMeeting())
    dispatch(clearNotification())
    dispatch(clearLoading())
    dispatch(Logout())
    navigate('/login')
  }

    // console.log(userdata, ' i am testing')
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/dashboard" className="flex items-center">
                        {/* <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        /> */}
                        <p className='text-xl font-sans font-semibold border-2 border-black shadow-xl p-1 rounded-lg'>Fasthopp</p>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            onClick={logoutUser}
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Logout
                        </Link>

                        <div className="isolate flex -space-x-2">


                            <Link to="/profile"><img
                                className="relative z-10 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src={profileImage}
                                alt="Profile Image"

                            /></Link>



                        </div>


                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>


                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Dashboard
                                </NavLink>


                            </li>
                            <li>
                                <NavLink
                                    to="/boards"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Kanban Boards
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink
                                    to="/meeting"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Meet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/notifications"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Notifications
                                </NavLink>
                            </li>
                            <li>
                                {userdata?.role === 'MANAGER' && (
                                    <NavLink
                                        to="/people"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        People
                                    </NavLink>
                                )}
                            </li>
                            <li>
                                <div className="ml-2 lg:hidden">





                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}