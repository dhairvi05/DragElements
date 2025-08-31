import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Canvas from './Canvas'
import Properties from './Properties'
import './Builder.css'

function Builder() {
    const [elements, setElements] = useState([]); //this will hold all dropped elements
    const [selectedId, setSelectedId] = useState(null);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [editElementId, setEditElementId] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    const updateStyle = (id, newStyle) => {
      setElements(prevElements => 
        prevElements.map(el => 
          el.id === id ? {...el, style: newStyle} : el
        )
      );
      if(selectedElement && selectedElement.id === id) {
        setSelectedElement(prevSelected => ({...prevSelected, style: newStyle}));
      }
    };

    const handleImageUpload = (id, file) => {
      if(!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const element = elements.find(el=>el.id===id)
        if(element) {
          const newStyle = { ...element.style, 
                             src: reader.result,
                             backgroundImage: `url(${reader.result})`,
                             backgroundSize: 'contain',
                             backgroundRepeat: 'no-repeat',
                             backgroundPosition: 'center'
                           }; 
                           updateStyle(id, newStyle);
        }
      };
      reader.readAsDataURL(file);
    };
    
    return (
        <>
          <div className='container'>
            <Sidebar isDeleteMode={isDeleteMode} setIsDeleteMode={setIsDeleteMode}/>
            <Canvas
              elements={elements} 
              setElements={setElements}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              isDeleteMode={isDeleteMode}
              editElementId={editElementId}
              setEditElementId={setEditElementId}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              updateStyle={updateStyle}
              handleImageUpload={handleImageUpload}
            />
            <Properties selectedElement={selectedElement} updateStyle={updateStyle}/>
          </div>
        </>
    );
}

export default Builder
