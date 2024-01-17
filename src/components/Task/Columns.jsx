import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { editColumn } from '../../server/Task/EditColumn'

import { MdModeEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import Card from './Card';


const Columns = ({ columnTitle, tasks, columnid, boardId }) => {
    const [editableFields, setEditableFields] = useState(false);
    const { access } = useSelector(state => state.usertoken)
    const [title, setTitle] = useState(columnTitle)


    // // when edit button clicked, ready only data make it editable 
    const makeEditable = (column) => {
  
        setEditableFields(true)
    }


    const handleColumnsEdit = (e) => {
        
        if(access && columnid && boardId){
          
           editColumn(access , title, columnid)
        }
        setEditableFields(false)
    

    }

    return (
        <div className='text-center font-bold bg-[#EEEAF5] rounded-xl m-3 flex-none w-[50%] md:w-[30%] sm:w-[40%] lg:w-[20%] h-full shadow-lg'>
            <div className='flex justify-around border-b border-[#ae8bec]'>
                <input className={`p-2  ${editableFields === true ? 'bg-white border' : 'bg-transparent text-black'}  uppercase w-full !outline-none`}
                    readOnly={!editableFields} onChange={(e)=>setTitle(e.target.value)} value={title}/>
         

                {!editableFields && <MdModeEdit  size={'10%'} color='red' className=' my-auto pr-2 ' onClick={() => makeEditable('column')} />}
                {editableFields && <button onClick={handleColumnsEdit}
                    className='size-4/4 bg-[#ae8bec] border rounded-md px-1 text-white '>
                    UPDATE
                </button>}

            </div>


            <Droppable droppableId={`${columnid}`}>
                 {(provided, snapshot) => (
                    <div
                    className='min-h-[18px]'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                       
                    >

                      
                         {tasks && tasks?.map((oneTask, index) => (
                            <Card key={oneTask.id} task={oneTask} index={index} />
                        ))
                        }

                        {provided.placeholder}
                    </div>
                )}  


            </Droppable>



        </div>
    )
}

export default Columns