import React from 'react';
import ColorTest from "./components/ColorTest";
import CombatField from './components/CombatField';

function App() {

    return (
        <div className="App" style={styles.appWrapper}>
            <p>Hello world!</p>
            <ColorTest />
            <CombatField />
        </div>
    );
}

export default App;

const styles = {
    appWrapper: {
        display: "grid"
    },
    header: {

    },
    grid: {

    }
};
