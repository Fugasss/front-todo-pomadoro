import React from 'react';
import styles from './Overlay.module.scss';

export enum Position{
    TopLeft
};

type OverlayProps = {
    position: Position,
    children: React.ReactNode
};

export default function Overlay({position, children}: OverlayProps) {    

    let x: number;
    let y: number;

    switch (position) {
        case Position.TopLeft:
            x = 25;
            y = 25;
            break;
    
        default:
            x = 0;
            y = 0;
            break;
    }

    return <div className={styles.wrapper} style={{
        left: x,
        top: y
    }}>
        {children}
    </div>
}