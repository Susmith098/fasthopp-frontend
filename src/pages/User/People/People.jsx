import React, { useEffect, useState } from 'react'
import Header from '../../../components/User/Header/Header'
import Footer from '../../../components/User/Footer/Footer'
import { CiSearch } from "react-icons/ci";
import UserRegistration from '../../../components/User/UserRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { alluserDetails, userBlockUpdate } from '../../../store/User/userslistSlice'
import UserProfile from '../../../components/User/UserProfile';
import { blockUser, unblockUser } from '../../../server/User/blockUser';
import '../user.css'
import ManagerRegistration from '../../../components/User/ManagerRegistration';
import { IoIosCloseCircle } from "react-icons/io";

export const People = () => {

    const [showform, setShowform] = useState(false)
    const [showformManager, setShowformManager] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const access = useSelector(state => state.usertoken.access)
    const userDetail = useSelector(state => state.userData)
    const [userSelected, setUserSelected] = useState('')
    const [searchname, setSearchName] = useState(null);
    const [result, setResult] = useState([]);
    const dispatch = useDispatch()
    const userslist = useSelector(state => state.users)
    const companyName = userDetail?.companyName
    const [selectedRole, setSelectedRole] = useState('All');



    //    getting all user detail and handling loading
    useEffect(() => {

        const fetchData = async () => {
            if (userDetail && userslist?.length === 0) {
                if (userDetail?.role === 'MANAGER') {
                    // dispatch(setLoading(true))
                    dispatch(alluserDetails({ access })).then((res) => {
                        // dispatch(setLoading(false))
                    })
                }
            }
        };
        fetchData();
        if (userslist?.length !== 0) {
            setResult(userslist)
        }
    }, [userslist]);

    // registration modal visibility handle for user role
    const handleForm = () => {
        console.log("user register")
        setShowform(true)
    }

    // registration modal visibility handle for manager role
    const handleFormManager = () => {
        console.log("manager register")
        setShowformManager(true)
    }

    // View user profile modal visibility handle
    const viewProfile = (id) => {
        setShowModal(true)
        setUserSelected(id)
    }

    // user block and unblock handle
    const handleAction = (id, e) => {
        const value = e.target.value;
        const isBlocked = value === 'Block';

        const updateUserStatus = (blocked) => {
            dispatch(userBlockUpdate({ id, value, blocked }));
            setResult((prevResult) => {
                return prevResult.map((user) => {
                    if (user.userId === id) {
                        return {
                            ...user,
                            blocked,
                        };
                    }
                    return user;
                });
            });
        };

        if (isBlocked) {
            // Block user
            blockUser(id, access)
                .then(() => updateUserStatus(true))
                .catch((error) => console.error(error));
        } else {
            // Unblock user
            unblockUser(id, access)
                .then(() => updateUserStatus(false))
                .catch((error) => console.error(error));
        }
    };

    // search specific user by name
    const handleSearch = async () => {
        if (searchname && searchname.trim() !== '') {
            const lowerCaseSearch = searchname.toLowerCase();
            const foundUsers = userslist?.filter(user =>
                user.name.toLowerCase().includes(lowerCaseSearch)
            );
            setResult(foundUsers || []);
        } else {
            setResult(userslist);
        }
    };


    // search and filter specific users
    const handleSearchAndFilter = async () => {
        let filteredUsers = userslist;

        // Apply role filter
        if (selectedRole !== 'All') {
            filteredUsers = filteredUsers.filter(user => user.role === selectedRole);
        }

        // Apply search filter
        if (searchname && searchname.trim() !== '') {
            const lowerCaseSearch = searchname.toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(lowerCaseSearch)
            );
        }

        setResult(filteredUsers);
    };

    // search and filter button click handler
    const handleSearchAndFilterClick = () => {
        handleSearchAndFilter();
    };


    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const filteredUsers = userslist?.filter(user => {
        if (selectedRole === 'All') {
            return true; // Show all users
        } else {
            return user.role === selectedRole; // Filter by selected role
        }
    });

    const loggedInUserId = useSelector(state => state.userData?.userId);

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Change this value based on your requirement

    // Calculate the index of the last item to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate the index of the first item to display on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Slice the data to display only the items for the current page
    const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>

            <Header />

            <div className='px-4'>
                <h3 className='my-2 text-lg font-bold'>All Users</h3>
            </div>



            <div className='px-4 m-3 py-2 flex rounded-lg justify-end bg-[#EEEAF5] shadow-lg' >
                <div className='mx-6'>
                    <button
                        onClick={handleFormManager}
                        className='bg-[#ae8bec] text-sm text-center text-white shadow-lg
                        px-3 py-1.5 rounded-lg '>
                        CREATE MANAGER
                        <span className='font-bold text-lg rounded-md mx-3 shadow-lg bg-white px-1 text-black'>+ </span>
                    </button>
                </div>
                <div className='mx-6'>
                    <button
                        onClick={handleForm}
                        className='bg-[#ae8bec] text-sm shadow-lg text-center text-white 
                        px-3 py-1.5 rounded-lg '>
                        CREATE USER
                        <span className='font-bold text-lg rounded-lg mx-3 shadow-lg bg-white px-1 text-black'>+ </span>
                    </button>
                </div>
                <div className='relative '>
                    <input
                        value={searchname || ''}
                        onChange={(e) => setSearchName(e.target.value)}
                        className='border mx-6 ml-auto rounded-lg px-4 py-1.5 shadow-lg' placeholder='Search' />
                    <button
                        onClick={handleSearchAndFilterClick} className='absolute right-10 pt-0.5 mt-1.5'>
                        <CiSearch size={'1.5em'} />
                    </button>
                </div>

                <div>
                    <select
                        className='rounded-lg text-lg text-app-bg px-4 py-1.5 shadow-lg'
                        value={selectedRole}
                        onChange={handleRoleChange}
                    >
                        <option value='All'>All</option>
                        <option value='MANAGER'>Manager</option>
                        <option value='USER'>User</option>
                    </select>
                    <button
                        className='bg-[#ae8bec] text-sm text-center text-white px-4 py-2 rounded-lg ml-2 shadow-lg'
                        onClick={handleSearchAndFilterClick}
                    >
                        Apply Filter
                    </button>
                </div>

            </div>

            <div className='m-3 p-1 bg-app-light-bg max-h-fit rounded-lg shadow-lg'>
            <div className='flex'>
                <div className="p-7 w-full overflow-hidden  ">

                    {/* data starts here */}
                    <div className="py-2 align-middle overflow-x-auto ">
                        {searchname && (
                            <p className='text-sm text-black mb-2'>
                                Showing results for "{searchname}"
                            </p>
                        )}
                        <div className="shadow-lg justify-between  overflow-hidden border md:rounded-lg ">

                            <table className="text-sm  text-white min-w-full ">
                                <thead className="bg-[#43247c] text-xs uppercase font-medium ">
                                    <tr>

                                        <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                            Joining Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                            More Details
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-[#ae8bec]">
                                    {result?.length !== 0 ? (
                                        currentItems.map((user) => (
                                            user?.userId !== loggedInUserId && (
                                                <tr key={user?.userId} className="bg-black bg-opacity-20">
                                                    <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user?.role}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {new Date(user?.joinedAt).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            className='bg-[#fdfdfd] shadow-2xl text-center text-black font-normal rounded px-4 py-2'
                                                            onClick={() => viewProfile(user?.userId)}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                    <td className="flex px-6 py-4 whitespace-nowrap">
                                                        <select
                                                            value={user?.blocked ? 'Block' : 'Active'}
                                                            onChange={(e) => handleAction(user?.userId, e)}
                                                            className={`font-semibold rounded px-4 py-2 ${user?.blocked ? 'text-red-800' : 'text-green-300'}`}
                                                        >
                                                            <option className='rounded-lg shadow-lg' value={'Active'}>
                                                                Active
                                                            </option>
                                                            <option className='rounded-lg text-red-800 shadow-lg' value={'Block'}>
                                                                Block
                                                            </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center m-3 p-3 uppercase text-white font-semibold">
                                                {searchname ? 'No matching users' : 'No users available'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>


                            </table>
                        </div>
                        <div className="pagination">
                            <ul className="flex justify-center space-x-2 p-2 ">
                                {Array.from({ length: Math.ceil(result.length / itemsPerPage) }, (_, index) => (
                                    <li key={index} className={`cursor-pointer  ${currentPage === index + 1 ? 'text-white' : 'text-black'}`}>
                                        <button className='bg-[#cbb7ed] p-2 rounded-lg shadow-lg' onClick={() => paginate(index + 1)}>{index + 1}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>



                </div>


                {showformManager &&
                    <ManagerRegistration closeModal={() =>
                        setShowformManager(false)
                    } />
                }

                {showform &&
                    <UserRegistration closeModal={() =>
                        setShowform(false)
                    } />
                }


                {showModal && <UserProfile user_id={userSelected} closeModal={() => {
                    setShowModal(false)
                }} />}


            </div>
            </div>

            <Footer />


        </div>
    )
}
