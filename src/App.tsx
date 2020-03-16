import React from 'react';
import './App.css';
import firebaseConnectionTest from "./tests/firebaseConnectionTest";

function App() {

    firebaseConnectionTest();

    return (
        <div className="App">
            <p>Hello world!</p>
        </div>
    );
}

export default App;
