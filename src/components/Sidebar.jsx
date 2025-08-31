import React from 'react'
import Draggable from './Draggable'
import './Sidebar.css'

function Sidebar({isDeleteMode, setIsDeleteMode}) {
    return (
        <>
          <aside className='sidebar'>
            <h2>Elements</h2>
            <Draggable type='heading' text='Heading'/>
            <Draggable type='paragraph' text='Paragraph'/>
            <Draggable type='image' text='Image'/>
            <button className='delete-mode-button' onClick={() => setIsDeleteMode(!isDeleteMode)}>
              {isDeleteMode ? 'Exit Delete Mode' : 'Delete Elements'}
            </button>
          </aside>
        </>
    );
}

export default Sidebar