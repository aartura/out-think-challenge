import "./App.css";

import React from "react";

import CountdownTimer from "./1";
import { throttledSayHello } from "./2";
import { converted } from "./3";

function App() {
    throttledSayHello("Correct Name");

    console.log(converted);
    return (
        <div className="App">
            <CountdownTimer countdownSeconds={30} onComplete={() => console.log("complete")} />
        </div>
    );
}

export default App;
