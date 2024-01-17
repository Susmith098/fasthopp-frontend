import React, { useEffect, useState } from 'react'
import Header from '../../../components/User/Header/Header'
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { updateBoarddDeletion } from '../../../store/Task/BoardSlice';
import { MdDelete } from "react-icons/md";
import CreateBoard from '../../../components/Task/CreateBoard';
import { Link } from 'react-router-dom';
import Footer from '../../../components/User/Footer/Footer';
import { deleteBoard } from '../../../server/Task/DeleteBoard';
import DeletePopup from '../../../components/User/PopUp/DeletePopup';


const Board = () => {
    const [showForm, setShowForm] = useState(false)
    const access = useSelector(state => state.usertoken.access)
    const { companyName, userId, role } = useSelector(state => state.userData)
    const allboards = useSelector(state => state.boards)
    const dispatch = useDispatch()
    const [searchname, setSearchName] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [boardData, setBoardData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if (allboards) {
            setBoardData(allboards)
        }
    }, [allboards])


    const handleDeleteBoard = (e, id) => {

        if (access) {
            deleteBoard(access, id).then((response) => {

                if (response.data) {
                    console.log("going", id)
                    dispatch(updateBoarddDeletion(id))
                    setError('')

                }
                else {
                    setError('Something went wrrong, try again')
                }
            }).catch((error) => {

                setError('An error occurred while deleting the board');
            });
        }

    }

    return (
        <>
            <Header />

            <div className='px-4'>
                <h3 className='my-2 text-lg font-bold'>Kanban Boards</h3>
            </div>

            <div className='flex '>

                <div className="p-7 m-5 rounded-lg w-full bg-[#EEEAF5] shadow-lg">

                    <div className='bg-[#43247c] md:flex md:items-center rounded-t-lg flex justify-between p-3 border-b border-black'>

                        <div>
                        <button onClick={() => setShowForm(true)} className={`bg-[#ae8bec] text-sm shadow-lg font-bold text-center text-white px-5 py-1 rounded-lg ${role === 'MANAGER' ? '' : 'hidden'}`}>
    CREATE BOARD<span className='font-bold text-lg ml-3 bg-white rounded-lg px-2 py-0.5 text-[#ae8bec] shadow-lg'>+ </span>
</button>
                        </div>

                        <p className='text-white'>{error}</p>

                        <div className='relative'>

                            <input
                                value={searchname || ''} // Ensure it's not null
                                onChange={(e) => setSearchName(e.target.value)}
                                className='font-medium border border-white text-center shadow-lg
    text-[#ae8bec] placeholder-[#ae8bec] placeholder:text-sm placeholder:font-normal px-2 py-1 m-2 rounded'
                                name='user'
                                type='text'
                                placeholder='search board'
                            />
                            <button
                                className='absolute top-2 right-2 pt-1 '>
                                <CiSearch size={'1.5em'} />
                            </button>
                        </div>
                    </div>

                    <div className='bg-[#ae8bec] p-2 rounded-b-lg shadow-lg'>

                        {searchname && (
                            <p className='text-sm text-white mb-2'>
                                Showing results for "{searchname}"
                            </p>
                        )}

                        {boardData?.length > 0 ? boardData?.map((board) => (
                            // Check if there is no search term or if the board name includes the search term
                            !searchname || board.name.includes(searchname) ? (

                                <div className='flex justify-between m-4 rounded-md bg-[#FFFFFF] p-4 shadow-lg' key={board.id}>

                                    <Link to={`/kanban-projects/${board.id}`} className='' key={board.id}>
                                        <p className='text-2xl hover:text-3xl font-bold'>{board.name}</p>

                                        <p className='text-sm font-bold shadow-lg my-2 p-2 rounded-lg bg-[#dbcef1]'>{board.description}</p>
                                    </Link>
                                    <div className='p-2 bg-[#d3c0f4] rounded-lg shadow-lg'>

                                        {
                                            role === 'MANAGER' ? (
                                                <button>
                                                    <MdDelete onClick={(e) => setShowModal(true)} color='firebrick' size={'35px'} />
                                                </button>
                                            ) : (
                                                showModal && (
                                                    <button>
                                                        <MdDelete onClick={(e) => setShowModal(false)} color='firebrick' size={'35px'} />
                                                    </button>
                                                )
                                            )
                                        }


                                        {showModal &&
                                            <DeletePopup type={'board'} access={access} id={board.id}
                                                closeModal={() => setShowModal(false)} />}

                                    </div>
                                </div>



                            ) : null
                        )) : (
                            <p className='text-center m-3 p-3 uppercase text-white font-semibold'>
                                {searchname ? 'No matching boards' : 'No boards, go ahead and create boards'}
                            </p>
                        )}

                        {showForm && <CreateBoard closeModal={() => setShowForm(false)} />}



                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Board