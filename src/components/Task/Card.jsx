import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import OneCard from './OneCard';

const Card = ({ task, index }) => {
    const [showModal, setShowModal] = useState(false)


    return (
        <div>
            {/* Creating Draggable cards */}
            <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        // isDragging={snapshot.isDragging}
                    >
                        {/* cards details here and more info modal when click the event */}
                        <div
                            onClick={() => setShowModal(true)}
                            style={{ backgroundColor: task.colour }}
                            className={` h-32 uppercase rounded-xl px-4 py-4 text-white text-sm m-3 shadow-2xl`}>
                            <p className=' mb-3 w-fit bg-white rounded-xl 
                             lowercase px-2 text-sm font-thin  text-black shadow-lg'>
                                {task.priority}
                            </p>
                            <p className='text-lg font-normal'>{task.title}</p>
                            <p className='text-sm font-extralight'>{task.description}</p>

                            <p className='text-xs ml-20 font-thin py-2'>{new Date(task.createdAt).toLocaleDateString()}</p>
                        </div>

                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
            {showModal && <OneCard task={task} closeModal={() => setShowModal(false)} />}
        </div>
    )
}
export default Card