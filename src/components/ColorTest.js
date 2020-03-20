import React, {useEffect, useState} from "react";

const ColorTest = () => {
    const [active, setActive] = useState(false);

    const firebase = require("firebase");
    const buttonColor = firebase
        .database()
        .ref()
        .child("button");

    const handleClick = () => {
        buttonColor.set({
            blue: !active
        });
    };

    useEffect(() => {
        buttonColor.on("value", snapshot => {
            let buttonState = snapshot.val();
            setActive(buttonState.blue);
        });
    }, []);

    return (
        <div>
            <button
                style={{color: active ? "blue" : "green"}}
                onClick={handleClick}
            >
                Change my color using our realtime db!
            </button>
        </div>
    );
};

export default ColorTest;
