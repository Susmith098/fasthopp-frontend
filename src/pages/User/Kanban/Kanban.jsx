import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from '../../../components/User/Header/Header'
import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { addingColumns, getAllColumns } from '../../../store/Task/ColumnsSlice'
import Columns from '../../../components/Task/Columns'
import Footer from '../../../components/User/Footer/Footer'
import { cardDragUpdate, cardsUpdate, getAllCards } from '../../../store/Task/cardSlice'
import CreateCard from '../../../components/Task/CreateCard'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import Loading from '../../../components/Loading'
import { setLoading } from '../../../store/Loading/loadingSlice';
import { CiFilter } from "react-icons/ci";

const Kanban = () => {
  const user = useSelector(state => state.userData)
  const access = useSelector(state => state.usertoken.access)
  const allboard = useSelector(state => state.boards)
  const allcolumns = useSelector(state => state.columns)
  const allcard = useSelector(state => state.cardData?.cards)
  const allassignee = useSelector(state => state.cardData?.assignee)
  const [columnsData, setColumnsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [memberData, setMemberData] = useState([])
  const [boardData, setBoardData] = useState()
  const [showForm, setShowForm] = useState(false)
  const [selectedMember, setSelectedMember] = useState('');
  const [showColumn, setShowColumn] = useState(false);
  const [columnTitle, setcolumnTitle] = useState('')
  const { board } = useParams();
  const dispatch = useDispatch()
  const load = useSelector(state => state.loading)
  const [showFilterModal, setShowFilterModal] = useState(false);

  //   choosing specific board from all board
  useEffect(() => {
    const thisBoard = () => {
      if (allboard) {
        // spilt board id from useparams
        const id = board
        const data = allboard?.find((board) => board.id.toString() === id)
        setBoardData(data)
      }
    }
    thisBoard()
  }, [])


  // redux data - columns and cards added to state data
  useEffect(() => {
    if (allcolumns) {
      setColumnsData(allcolumns)
    }
    if (allcard) {
      setCardsData(allcard)
      setMemberData(allcard?.assignee)
    }

  }, [allcard, allcolumns])




  // getting all columns and cards, also handle loading
  useEffect(() => {
    if (access && board) {
      dispatch(setLoading(true))
      dispatch(getAllColumns({ access, board }))
        .then((res) => {
          dispatch(getAllCards({ access, board }))
            .then((res) => {
              dispatch(setLoading(false))
            })
        })
    }
  }, [access])

  // handling card dragging
  const onDragEnd = async (result) => {

    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;   // If there is no destination or the drag is cancelled, return
    // Create a copy of columnsData and cardsData
    const updatedColumnsData = [...columnsData];
    const updatedCardsData = [...cardsData];

    // Find the source and destination columns
    const sourceColumn = updatedColumnsData.find(column => column.id === parseInt(source.droppableId));
    const destinationColumn = updatedColumnsData.find(column => column.id === parseInt(destination.droppableId));
    const draggedCard = updatedCardsData.find(card => card.id.toString() === draggableId);

    if (sourceColumn && destinationColumn && draggedCard) {

      // Update only the column property of the dragged card
      const updatedCards = updatedCardsData.map(card => {
        if (card.id.toString() === draggedCard.id.toString()) {
          return { ...card, boardColumnId: parseInt(destination.droppableId) };
        }

        return card;
      });

      // Update the state with the modified data
      await setCardsData(updatedCards)


      if (access) {
        const droppableId = destination.droppableId
        dispatch(cardDragUpdate({ droppableId, draggableId, access }))

      }
    }
  }

  //FilterModal for filter cards by members
  const FilterModal = () => (
    <div className='filter-modal'>
      <select
        onChange={(e) => {
          setSelectedMember(e.target.value);
          setShowFilterModal(false);
        }}
        value={selectedMember}
      >
        <option value='all'>Filter by member</option>
        {uniqueUserEmails?.length > 0 && (
          <>
            {uniqueUserEmails.map((uniqueUser) => (
              <option value={uniqueUser} key={uniqueUser}>
                {uniqueUser}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );


  // filtering card based on the user
  useEffect(() => {
    if (allcard && selectedMember) {
      if (selectedMember === 'all') {
        setCardsData(allcard);
      } else {
        const filteredCards = allcard.filter((card) => {
          return (
            card.assignee && // Check if assignee array is defined
            Array.isArray(card.assignee) && // Check if assignee is an array
            card.assignee.some(
              (assignee) => assignee && assignee.userEmail === selectedMember
            )
          );
        });
        setCardsData(filteredCards);
      }
    }
  }, [selectedMember, allcard]);

  // console.log(allcard, "allcard");

  // Filter based on the existence of card.assignee
  // console.log(allcard.filter((card) => card.assignee), "allcard assignee");

  // Extract unique user emails from all assignees
  const uniqueUserEmails = Array.from(
    new Set(
      allcard
        ?.flatMap((card) => card?.assignee)
        ?.filter((assignee) => assignee?.userEmail)
        ?.map((assignee) => assignee?.userEmail) || []
    )
  );
  // console.log(uniqueUserEmails, "unique user emails");



  // adding more columns
  const addColumns = (e) => {
    e.preventDefault();
    const position = allcolumns?.length;
    const newPosition = position + 1;
    console.log(allcolumns?.length, "all columns length")
    console.log(position, "all columns length")
    console.log(access, board, columnTitle, newPosition, "all kanban")
    dispatch(addingColumns({ access, board, columnTitle, newPosition }));
  };

  return (
    <div>
      <Header />

      <div className='px-4'>
        {/* <h3 className='my-2 text-lg font-bold'>{boardData.name}</h3> */}
        <p className='my-2 text-lg font-bold'>Board Name: {boardData?.name}</p>
        <p className='text-lg text-black font-semibold text-left  mb-1 pb-1'>Description: {boardData?.description}</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd} >

        <div className='px-4 m-3 py-2 flex rounded-lg justify-end bg-[#EEEAF5] shadow-lg' >
          <div className='mr-6'>
            {boardData && user && (
              <>
                <button
                  onClick={() => setShowFilterModal(true)}
                  className='text-sm text-white text-center px-3 mb-2 bg-[#a57ee8] shadow-lg rounded-lg mt-1 p-1 mr-10'
                >
                  <CiFilter size={26} color='#ffffff' /> {/* Use the filter icon */}
                  {/* Filter by member */}
                </button>
                {showFilterModal && <FilterModal />}
              </>
            )}
          </div>
          <div className='me-2'>
            <button onClick={() => setShowForm(true)}
              className='text-sm text-white text-center px-3 mb-2 bg-[#a57ee8] shadow-lg rounded-lg mt-1 p-1 mr-10'>
              NEW CARD <span className='font-bold text-lg px-1 py-0.5 mx-1 my-0.5 shadow-lg rounded-lg bg-white text-[#a57ee8]'>+</span>
            </button>
          </div>
        </div>

        <div className='flex overflow-auto rounded-lg p-3 w-full h-[100%] m-auto '>
          {load && <Loading />}
          {columnsData?.length > 0 && columnsData?.map((column) => {
            const matchingCards = cardsData?.length > 0 && cardsData?.filter(
              card => {
                return board == card?.boardId && column.id === card.boardColumnId;
              }
            )

            return (
              <Columns key={column.id}
                columnTitle={column.name}
                tasks={matchingCards}
                columnid={column.id}
                boardId={board}
              />
            )
          })
          }

          <div className='m-3'>
            <button
              onClick={(e) => setShowColumn(!showColumn)}
              className=' text-center  font-bold bg-[#ffffff] py-3 w-[200px] 
              uppercase rounded-xl'
            >
              Add More Colums+
            </button>
            {showColumn && (<div className='flex relative'>
              <input
                className='px-2 py-1 border mt-1 '
                name='column' placeholder='Enter the column name'
                value={columnTitle} onChange={(e) => setcolumnTitle(e.target.value)}
              />
              <IoCheckmarkDoneCircle onClick={addColumns} color='green' size={'20px'}
                className='absolute right-1 top-3' />
            </div>)}
          </div>


        </div>

        {showForm && <CreateCard id={board} closeModal={() => setShowForm(false)} />}

      </DragDropContext>

      {/* </div > */}
      <Footer />
    </div>
  )
}

export default Kanban