import React from 'react';
import Cross from '../Cross';
import styles from './Modal.module.scss';

type ModalProps = {
    title: string,
    onClose: ()=>void,
    children: React.ReactNode
}; 

export default function Modal({title, onClose, children}: ModalProps) {

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <Cross width={36} height={36} onClick={()=>onClose()}/>
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    );
};