import React, { useState } from 'react';

export default function TextBlock({ text, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(text);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleSave = () => {
        onChange(tempText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempText(text);
        setIsEditing(false);
    };

    return (
        <div className="text-block">
            {isEditing ? (
                <div className="text-block-edit">
                    <textarea
                        className="text-block-textarea"
                        value={tempText}
                        onChange={(e) => setTempText(e.target.value)}
                    />
                    <div className="text-block-actions">
                        <button className="text-block-save" onClick={handleSave}>Save</button>
                        <button className="text-block-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="text-block-view">
                    <div className="text-block-content">{text}</div>
                    <div className="text-block-actions">
                        <button className="text-block-copy" onClick={handleCopy}>Copy</button>
                        <button className="text-block-edit" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="text-block-delete" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}
