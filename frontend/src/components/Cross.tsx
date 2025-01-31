import './Cross.scss';

type CrossProps = {
    onClick?: Function,
    width?: number,
    height?: number
};

export default function Cross({onClick, width, height}: CrossProps) {
    return (
         <img className='cross' src="./images/cross.svg" alt="Cross" onClick={()=>onClick && onClick()} width={width||32} height={height||32} />
    );
}