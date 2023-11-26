// Create a TypeScript-React function-component (as opposed to a class-based component)
//  using React-hooks for any stateful behaviour/side-effects.
// The component should have two properties: coundownSeconds:number
// and an optional onComplete:() => void dispatch property.
// These should be defined in an interface that  is also used in the component declaration.
// The component might be used as follows:
// <CountdownTimer
// countdownSeconds = {30}
// onComplete = {() => console.log("complete")} />

// The component should display a countdown timer from
// coundownSeconds seconds down  to zero. When the countdown reaches zero,
//
// The UI should comprise of the current value of the timer
// to 1 decimal-place of accuracy (e.g.  25.7), and this should
// displayed in the exact centre (both vertical and horizontal) of the  viewport.
// The countdown should start the moment the component is mounted and stop at zero.
// Ensure that appropriate clean-up measures are taken
// if the component is unmounted before the countdown is complete.
//  onComplete is expected to not be called in this case.

import React, { useEffect, useRef, useState } from "react";

interface CountdownTimerProps {
    countdownSeconds: number;
    onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ countdownSeconds, onComplete }) => {
    const [timer, setTimer] = useState(countdownSeconds);
    const intervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
                const newTimer = prevTimer - 0.1;
                if (newTimer <= 0) {
                    clearInterval(intervalRef.current!);
                    if (onComplete) {
                        onComplete();
                    }
                    return 0;
                }
                return newTimer;
            });
        }, 100);

        return () => {
            clearInterval(intervalRef.current!);
        };
    }, [onComplete]);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <div style={{ fontSize: "2em" }}>{timer.toFixed(1)}</div>
        </div>
    );
};

export default CountdownTimer;
