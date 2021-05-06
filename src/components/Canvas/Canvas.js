import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import './Canvas.css';

export const Canvas = () => {
    const { width, height } = useWindowSize()
        return (
            <Confetti id='confetti' run={true} width={width} height={height} recycle={true} numberOfPieces={500} />
                
        )
    }