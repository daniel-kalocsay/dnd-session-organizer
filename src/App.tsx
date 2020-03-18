import React from 'react';
import './App.css';
import firebaseConnectionTest from "./tests/firebaseConnectionTest";
import ColorTest from "./components/ColorTest";

function App() {

    // firebaseConnectionTest();

    return (
        <div className="App">
            <p>Hello world!</p>
            <ColorTest />
        </div>
    );
}

export default App;
