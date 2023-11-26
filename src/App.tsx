import "./App.css";

import React from "react";

import CountdownTimer from "./1";

function App() {
    return (
        <div className="App">
            <CountdownTimer countdownSeconds={30} onComplete={() => console.log("complete")} />
        </div>
    );
}

export default App;
