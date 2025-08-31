import React from 'react'
import {useDrag} from 'react-dnd'
import Sidebar from './Sidebar'

function Draggable({type, text}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type:'element',
        item: {type},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const opacity = isDragging ? 0.4 : 1;

    return (
        <>
          <div ref={drag} className='draggable-element' style={{opacity}}>{text}</div>
        </>
    );
}

export default Draggable