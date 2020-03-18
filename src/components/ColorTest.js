import React, {useEffect, useState} from "react";

const ColorTest = () => {
    const [active, setActive] = useState(false);

    const firebase = require("firebase");
    const status = firebase.database().ref().child("button");

    const handleClick = () => {
        status.set({
            blue: !active
        });

        setActive(!active);
    };


    useEffect( () => {
        status.on("value", (snapshot) => {
            let state = snapshot.val();
            console.log(`current value of blue: ${state.blue}`);
        });
    }, []);



    return (
        <div>
            <button style={ {color: active ? "blue" : "green"} } onClick={handleClick} >button</button>
        </div>
    )
};

export default ColorTest;