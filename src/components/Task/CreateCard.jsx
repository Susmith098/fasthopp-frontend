import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { newCardCreate } from '../../store/Task/cardSlice';
import { useEffect } from 'react';
import { setLoading } from '../../store/Loading/loadingSlice';
import Loading from '../Loading';
import { IoIosCloseCircle } from "react-icons/io";

const CreateCard = ({ closeModal, id }) => {
    const access = useSelector(state => state.usertoken.access)
    const users = useSelector(state => state.users)
    const allboard = useSelector(state => state.boards)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [maxNum, setMaxNum] = useState(0);
    const [selectedColor, setSelectedColor] = useState()
    const [priority, setPriority] = useState()
    const [boardData, setBoardData] = useState({})
    const [error, setError] = useState('')
    const [email, setEmail] = useState([''])
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch()
    const load = useSelector(state => state.loading)

    // Taking specific boards from all boards and set it to boardData
    useEffect(() => {
        const singleBoard = () => {
            if (allboard) {
                const data = allboard?.find((board) => board.id == id)
                setBoardData(data)
            }
        }
        singleBoard()
    }, [allboard])


    // maximum memeber change should not go below zero
    const maxmemberChange = (e) => {
        if (e.target.value > '0') {
            setMaxNum(e.target.value)
        } else {
            setMaxNum(0)
        }
    }

    // email suggestions
    useEffect(() => {
        if (users && users?.length > 0) {
            const emails = users?.map((user) => user.email)
            setEmail(emails)
        }
    }, [users])

    // suggestion input change
    const handleInputChange = (event) => {
        const value = event.target.value;
        console.log(value.length)
        setInputValue(value);
        if (value === '') {
            setSuggestions([]); // Clear suggestions when the input is empty
        } else if (value.length > 3) {
            const newSuggestions = getSuggestions(value);
            setSuggestions(newSuggestions);
        }
    };

    // when suggested email clicked
    const handleSuggestionClick = (suggestion) => {
        setInputValue('');
        if (selectedEmails.includes(suggestion)) {
            setError('Already added the member')
        } else {
            setSelectedEmails([...selectedEmails, suggestion]);
        }
        setSuggestions([]);
    };

    // removing assignee from card
    const handleRemoveEmail = (email) => {
        const updatedEmails = selectedEmails.filter((e) => e !== email);
        setSelectedEmails(updatedEmails);
    };

    // based on user input, giving suggestions
    const getSuggestions = (input) => {
        return email.filter((suggestion) =>
            suggestion.toLowerCase().includes(input.toLowerCase())
        );
    };

    // creating a new cards based on given details
    const handleCreate = (e) => {
        e.preventDefault()
        const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
        if (access && id && trimmedTitle && trimmedDescription && selectedColor && priority) {
            if (maxNum < selectedEmails.length) {
                setError('Seleted members are more than maximum members count ')
            } else {
                console.log(access, id, trimmedTitle, trimmedDescription, maxNum, selectedEmails, selectedColor, priority, "create card")
                dispatch(setLoading(true))
                dispatch(newCardCreate({ access, id, title: trimmedTitle, description: trimmedDescription, maxNum, selectedEmails, selectedColor, priority })).then((res) => {
                    dispatch(setLoading(false))
                    closeModal();
                })
                .catch((error) => {
                    dispatch(setLoading(false));
                    setError('Error creating card');
                });
            }
        } else {
            setError('Please fill all details required')
        }
    }

    return (
        <div className='overlay'>
            <div className='modal-content !rounded-lg  !w-[50%]'>
                {load && <Loading/>}
                <button
                    className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] flex
                     justify-center items-center mt-4 rounded-full'
                    onClick={closeModal}>
                    <IoIosCloseCircle />
                </button>
                <h3 className=' font-bold text-center'>CREATE CARD</h3>
                <form className=" px-4 py-4 mb-4 w-full">
                    <div className='mb-3'>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            name="name"
                            type='text'
                            placeholder='Card title'
                        />
                    </div>
                    <div className='mb-2 '>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            name='description'
                            placeholder='Description'
                        />
                    </div>

                    <div className='mb-2'>
                        <select
                            value={priority} onChange={(e) => setPriority(e.target.value)}
                            className="shadow-lg appearance-none border rounded w-full py-2 px-3
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2"
                            required
                        >
                            <option className='rounded-lg'>Priority</option>
                            <option value='high' className='rounded-lg'>High</option>
                            <option value='moderate' className='rounded-lg'>Moderate</option>
                            <option value='low' className='rounded-lg'>Low</option>
                        </select>
                    </div>

                    <div className='mb-2 '>
                        <label className='pr-1'>Pick a color</label>
                        <input
                            value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}
                            className="shadow-lg appearance-none border rounded  py-1 px-3
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2"
                            name='selectedColor' type='color' placeholder='Select a color' required
                        />

                    </div>


                    <>
                        <div className='mb-2 '>
                        <label className='pr-1'>Max members for this issue</label>
                            <input
                                value={maxNum} onChange={maxmemberChange}
                                className="shadow-lg appearance-none border rounded py-2 px-3
                                     text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2"
                                name='maximum member' type='number' placeholder='Maximum member'
                            />
                        </div>

                        <>
                            <div className='flex'>
                                <label htmlFor="inviteNewMember" className="  mr-2 text-left font-bold mb-2 my-2">
                                    Select New Member
                                </label>

                                <input className='rounded-lg border shadow-lg'
                                    type="text"
                                    id="email"
                                    placeholder=' Select new members'
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                {suggestions.length > 0 && (
                                    <ul>
                                        {suggestions.map((suggestion, index) => (
                                            <div
                                                className='bg-[#d4c5ed] m-1 border w-[60%] rounded-2xl px-3 py-1 my-2 shadow-lg' >
                                                <li
                                                    key={index} onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    {suggestion}
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {selectedEmails.length > 0 && (
                                <div className='flex text-start mt-2  '>
                                    <strong className='mr-2'>Selected Emails:</strong>
                                    <ul>
                                        {selectedEmails.map((email, index) => (
                                            <li
                                                key={index}
                                                className='bg-[#c9b4ef] rounded-lg px-2 py-1 mb-2'

                                            >
                                                {email}{' '}

                                                <button
                                                    className=' bg-[#cccdd7] text-[#7d55c8] text-sm rounded-full font-bold '
                                                    type='button'
                                                    onClick={() => handleRemoveEmail(email)}
                                                >
                                                    <IoIosCloseCircle />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>




                        {/*  */}

                    </>


                    <div className='flex justify-center text-center mt-3 p-3'>
                        <button onClick={handleCreate} className=' bg-[#ae8bec] shadow-lg text-white w-full rounded-lg m-2 py-1 text-center'>CREATE</button>
                    </div>
                    <p>{error}</p>
                </form>
            </div>
        </div>

    )
}

export default CreateCard