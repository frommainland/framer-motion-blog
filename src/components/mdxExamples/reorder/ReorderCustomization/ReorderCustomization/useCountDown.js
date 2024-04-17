import { useEffect, useRef, useState } from 'react';

export const useCountDown = (total, ms = 1000, onEnd) => {
    const [counter, setCountDown] = useState(total);
    const [startCountDown, setStartCountDown] = useState(false);
    const intervalId = useRef();

    const start = () => setStartCountDown(true);
    const pause = () => setStartCountDown(false);
    const reset = () => {
        clearInterval(intervalId.current);
        setStartCountDown(false);
        setCountDown(total);
    };

    useEffect(() => {
        intervalId.current = setInterval(() => {
            if (startCountDown && counter > 0) {
                setCountDown(counter => counter - 1);
            } else if (counter === 0) {
                clearInterval(intervalId.current);
                if (onEnd) onEnd(); // Call the callback function when the countdown ends
            }
        }, ms);
        return () => clearInterval(intervalId.current);
    }, [startCountDown, counter, ms]);

    return [counter, start, pause, reset];
};