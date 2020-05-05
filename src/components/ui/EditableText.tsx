import React, { useState, useEffect, useRef } from "react";

const EditableText = (props: any) => {
    const inputRef = useRef(null);
    const [inputVisible, setInputVisible] = useState(false);

    useEffect(() => {
        // Handle outside clicks on mounted state
        if (inputVisible) {
            document.addEventListener("mousedown", onClickOutside);
        }

        // This is a necessary step to "dismount" unnecessary events when we destroy the component
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    });

    const onClickOutside = (e: any) => {
        // Check if user is clicking outside of <input>
        if (inputRef.current) {
            let input = inputRef.current as any;
            if (!input.contains(e.target)) {
                setInputVisible(false);
            }
        }
    };

    return (
        <div>
            {inputVisible ? (
                <input
                    ref={inputRef}
                    value={props.initialText}
                    onChange={(e) => {
                        props.saveText(e.target.value);
                    }}
                />
            ) : (
                <span onClick={() => setInputVisible(true)}>
                    {props.initialText}
                </span>
            )}
        </div>
    );
};

export default EditableText;
