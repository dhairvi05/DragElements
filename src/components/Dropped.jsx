import React, {useRef} from 'react'
// import {useDrag, useDrop} from 'react-dnd'
import Canvas from './Canvas'

function Dropped({id, 
                  element, 
                  isSelected, 
                  setSelectedId, 
                  setSelectedElement, 
                  deleteElement, 
                  isDeleteMode, 
                  isEditing, 
                  setEditElementId, 
                  editElement,
                handleImageUpload}) {    //({id, content, index, moveElement})
    // const [{isDragging}, drag] = useDrag(() => ({
    //     type: 'dropped-element',
    //     item: {id,index},                                     //these commented out ones are for reordering
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));
    // const [, drop] = useDrop(() => ({
    //     accept: 'dropped-element',
    //     hover(item, monitor) {
    //         if (!monitor.isOver({ shallow: true })) {
    //             return;
    //         }
    //         const dragIndex = item.index;
    //         const hoverIndex = index;
    //         if(dragIndex === hoverIndex) {
    //             return;
    //         }
    //         moveElement(dragIndex, hoverIndex);
    //         item.index = hoverIndex;
    //     },
    // }));
    // const opacity = isDragging ? 0 : 1;
    
    const fileInputRef = useRef(null);
    const handleDoubleClick = () => {
        if(!isDeleteMode) {
            if(element.type === 'image') {
                fileInputRef.current.click();
            } else {
                setEditElementId(element.id);
            }
        }
    }

    console.log('Element style:', element.style);
    console.log('Background image:', element.style.backgroundImage);   

    return (
        // <div ref={(node) => drag(drop(node))} className='dropped-element'>
        <div className={`dropped-element ${isDeleteMode ? 'delete-mode' : ''} ${isSelected ? 'selected' : ''}`}
             onClick={(e)=> {
                e.stopPropagation();
                if (!isDeleteMode) {
                    setSelectedId(id);
                    // setEditElementId(null);
                    setSelectedElement(element);
                }
             }}
             onDoubleClick={handleDoubleClick}
             style={element.style}
            >
                {element.type === 'image' ? (
                    element.style.backgroundImage ? (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: element.style.backgroundImage,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: 'none',
                        backgroundColor: 'transparent'
                    }} />
                ) : (
                <div className='image-container'>
                    <span>Double-click and drag to upload image</span>
                </div>
                )) : isEditing ? (
                    <input type='text' value={element.content} 
                           onChange={(e) => {
                            editElement(element.id, e.target.value)
                           }} 
                           onBlur={() => setEditElementId(null)}
                           autoFocus
                    />
                ) : (
                    <div>{element.content}</div>
                )}
                {isDeleteMode && (
                    <button className='delete-button'
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteElement(id);
                            }}>
                                &times;
                    </button>
                )}
                <input type='file' ref={fileInputRef} style={{display: 'none'}} 
                       onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            handleImageUpload(element.id, e.target.files[0])
                        }
                       }}
                />
        </div>
    );
}

export default Dropped

// onDoubleClick={(e) => {
//                 e.stopPropagation();
//                 if(!isDeleteMode) {
//                     setEditElementId(id);
//                 }
//              }}
// {isEditing ? (
//                 <input type='text' value={element.content} 
//                        onChange={(e) => editElement(id, e.target.value)}
//                        onBlur={() => setEditElementId(null)}
//                        autoFocus
//                 />
//             ) : (
//                 <div>{element.content}</div>
//             )}