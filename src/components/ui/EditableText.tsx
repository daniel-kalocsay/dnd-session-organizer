import React, {useState, useEffect, useRef, CSSProperties} from "react";

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
                    style={styles.input}
                    ref={inputRef}
                    value={props.initialText}
                    onChange={(e) => {
                        props.saveText(e.target.value);
                    }}
                />
            ) : (
                <span
                    style={styles.text}
                    onClick={() => setInputVisible(true)} >
                    {props.initialText}
                </span>
            )}
        </div>
    );
};

export default EditableText;

const styles = {
    text: {
        fontSize: "3em"
    },
    input: {
        fontSize: "2.75em",
        textAlign: "center"
    } as CSSProperties
};
