import React from 'react';
import firebaseConnectionTest from "./tests/firebaseConnectionTest";
import ColorTest from "./components/ColorTest";
import Combatfield from './components/Combatfield';

function App() {

    // firebaseConnectionTest();

    return (
        <div className="App">
            <p>Hello world!</p>
            <ColorTest />
            <Combatfield />
        </div>
    );
}

export default App;
