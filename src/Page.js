/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import TextBlock from './TextBlock';

/**
 * Component for displaying a page in the notebook.
 * @param {object} props - Component props
 * @param {import('./App').Page} props.page - The page to display
 * @param {function} props.onChange - The function to call when the page content changes
 * @returns
 */
export default function Page({ page, onChange }) {
    const [showTextBlocks, setShowTextBlocks] = useState(false);
    
    // Initialize textBlocks if it doesn't exist
    const textBlocks = page.textBlocks || [];
    
    const handleAddTextBlock = () => {
        const newTextBlocks = [...textBlocks, { id: Date.now(), text: '' }];
        onChange({ ...page, textBlocks: newTextBlocks });
    };
    
    const handleTextBlockChange = (index, newText) => {
        const newTextBlocks = [...textBlocks];
        newTextBlocks[index] = { ...newTextBlocks[index], text: newText };
        onChange({ ...page, textBlocks: newTextBlocks });
    };
    
    const handleTextBlockDelete = (index) => {
        const newTextBlocks = [...textBlocks];
        newTextBlocks.splice(index, 1);
        onChange({ ...page, textBlocks: newTextBlocks });
    };

    return (
        <div className="flex-container flexFlowColumn">
            <div className="flex-container alignItemsCenter">
                <input placeholder="Enter a title..." className="text_pole flex1" type="text" value={page.title} onChange={(event) => onChange({ ...page, title: event.target.value })} />
                <i className="right_menu_button fa-solid fa-trash" onClick={() => confirm('Are you sure?') && onChange(null)}></i>
            </div>
            
            <div className="page-content-toggle">
                <button 
                    className={`toggle-button ${!showTextBlocks ? 'active' : ''}`} 
                    onClick={() => setShowTextBlocks(false)}
                >
                    Rich Text
                </button>
                <button 
                    className={`toggle-button ${showTextBlocks ? 'active' : ''}`} 
                    onClick={() => setShowTextBlocks(true)}
                >
                    Text Blocks
                </button>
            </div>
            
            {!showTextBlocks ? (
                <ReactQuill 
                    placeholder="What's on your mind?" 
                    theme="snow" 
                    value={page.content} 
                    onChange={(content) => onChange({ ...page, content })} 
                    scrollingContainer={document.getElementById('notebookPanelHolder')} 
                />
            ) : (
                <div className="text-blocks-container">
                    {textBlocks.map((block, index) => (
                        <TextBlock
                            key={block.id}
                            text={block.text}
                            onChange={(newText) => handleTextBlockChange(index, newText)}
                            onDelete={() => handleTextBlockDelete(index)}
                        />
                    ))}
                    <button className="add-text-block" onClick={handleAddTextBlock}>
                        <i className="fa-solid fa-plus"></i> Add Text Block
                    </button>
                </div>
            )}
        </div>
    );
}
