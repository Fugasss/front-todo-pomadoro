import React from 'react';
import Cross from '../Cross';
import './Modal.scss';

type ModalProps = {
    title: string,
    onClose: Function,
    children: React.ReactNode
}; 

export default class Modal extends React.Component<ModalProps> {
    constructor(props: ModalProps){
        super(props);
    }

    render(): React.ReactNode{
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{this.props.title}</h2>
                        <Cross width={36} height={36} onClick={()=>this.props.onClose()}/>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                </div>
            </div>);
    }
} 

// export default function Modal({title, onClose, children}: ModalProps) {

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h2>{title}</h2>
//                     <Cross width={36} height={36} onClick={()=>onClose()}/>
//                 </div>
//                 <div className="modal-body">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );

// }