import React from 'react'
import {useDrop} from 'react-dnd'
import {NativeTypes} from 'react-dnd-html5-backend'
import Dropped from './Dropped'
import './Canvas.css'

function Canvas({elements, 
                 setElements, 
                 selectedId, 
                 setSelectedId, 
                 isDeleteMode, 
                 editElementId, 
                 setEditElementId, 
                 selectedElement, 
                 setSelectedElement,
                 updateStyle,
                 handleImageUpload}) {
  // const moveElement = (dragIndex, hoverIndex) => {
  //   const newElements = [...elements];
  //   const [movedItem] = newElements.splice(dragIndex, 1);         //these commented out ones are for reordering
  //   newElements.splice(hoverIndex, 0, movedItem);
  //   setElements(newElements);
  // };

  const [{isOver, isOverFile}, drop] = useDrop(() => ({
    accept: ['element', 'dropped-element', NativeTypes.FILE], 
    drop: (item, monitor) => {
      if(monitor.didDrop()) {
        return;
      }
      if(item.files) {
        const file = item.files[0];
        if(file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const newElement = {
              id: Date.now(),
              type: 'image',
              content: '',
              style: {
                width: '200px',
                height: '300px',
                backgroundImage: `url(${reader.result})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              },
            };
            setElements((prevElements) => [...prevElements, newElement]);
          };
          reader.readAsDataURL(file);
        }
      } else {
        const newElement = {
          id: Date.now(),
          type: item.type,
          content: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`,
          style: {
            color: '#000000',
            fontSize: '16px',
            backgroundColor: 'transparent',
            fontFamily: 'Inter',
          },
        };
        setElements((prevElements) => [...prevElements, newElement]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverFile: monitor.isOver() && monitor.getItemType() === NativeTypes.FILE,
    }),
  }));
  const border = isOverFile ? '2px dashed green' : (isOver ? '2px solid #3498db' : '2px dashed rgba(102, 126, 234, 0.3)');

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id!==id));
    setSelectedId(null);
    setSelectedElement(null);
  };

  const editElement = (id, newContent) => {
    setElements(elements.map(el => el.id === id ? {...el, content: newContent} : el));
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(prevSelected => ({...prevSelected, content: newContent}));
    }
  };

  const handleCanvasClick = (e) => {
    if(e.target === e.currentTarget) {
      if(!isDeleteMode) {
        setSelectedId(null);
        setEditElementId(null);
        setSelectedElement(null);
      }
    }
  };

    return (
        <>
          <main ref={drop} className='canvas' style={{border}} onClick={handleCanvasClick}>
            <h2>Your Website</h2>
            {/* <Dropped key={el.id} id={el.id} content={el.content} index={index} moveElement={moveElement}/> */}
            {elements.filter(el=>el).map((el, index) => (
                    <Dropped 
                      key={el.id} 
                      id={el.id} 
                      element={el}
                      // content={el.content}
                      isSelected={!isDeleteMode && el.id==selectedId}
                      setSelectedId={setSelectedId}
                      setSelectedElement={setSelectedElement}
                      deleteElement={deleteElement}
                      isDeleteMode={isDeleteMode}
                      isEditing={el.id===editElementId}
                      setEditElementId={setEditElementId}
                      editElement={editElement}
                      handleImageUpload={handleImageUpload}
                      // style={el.style}
                      // updateStyles={updateStyles}
                    />
                ))}
          </main>
        </>
    );
}

export default Canvas 