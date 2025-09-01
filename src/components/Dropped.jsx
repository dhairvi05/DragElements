import React, {useRef} from 'react'
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
                handleImageUpload}) {    
    
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
        <div className={`dropped-element ${isDeleteMode ? 'delete-mode' : ''} ${isSelected ? 'selected' : ''}`}
             onClick={(e)=> {
                e.stopPropagation();
                if (!isDeleteMode) {
                    setSelectedId(id);
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