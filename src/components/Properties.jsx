import React from "react"
import './Properties.css'

function Properties({selectedElement, updateStyle}) {
    if(!selectedElement) {
        return(
            <div className='property-placeholder'>
                <p>Select an element to edit in properties</p>
            </div>
        );
    }
    const editElement = (property, value) => {
        const newStyle = {...selectedElement.style, [property]: value};
        updateStyle(selectedElement.id, newStyle);
    };

    const fontFamilies = [
        'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 
        'Verdana', 'Courier New', 'sans-serif', 'serif', 'monospace'
    ];

    return (
        <>
          <aside className='properties'>
            <h3>Properties</h3>
            {selectedElement.type!=='image' && (
                <>
                  <div className='property-group'>
                    <label>Text Color</label>
                    <input type='color' value={selectedElement.style.color === '#000000'}
                           onChange={(e) => editElement('color', e.target.value)}
                    />
                  </div>
                  <div className='property-group'>
                    <label>Font Size</label>
                    <input type='number' value={parseInt(selectedElement.style.fontSize)}
                           onChange={(e) => editElement('fontSize', `${e.target.value}px`)}
                    />
                 </div>
                 <div className='property-group'>
                    <label>Font Family</label>
                    <select value={selectedElement.style.fontFamily} onChange={(e) => editElement('fontFamily', e.target.value)}>
                        {fontFamilies.map((font) => (
                            <option key={font} value={font}>
                                {font}
                            </option>
                        ))}
                    </select>
                 </div>
                </>
            )}
            <div className='property-group'>
                <label>Background Color</label>
                <input type="color" value={selectedElement.style.backgroundColor === 'transparent' ? '#ffffff' : selectedElement.style.backgroundColor} 
                       onChange={(e) => editElement('backgroundColor', e.target.value)} />
            </div>
          </aside>
        </>
    );
}

export default Properties