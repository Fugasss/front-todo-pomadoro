import './Cross.scss';

type CrossProps = {
    onClick?: Function,
    width?: number,
    height?: number
};

export default function Cross({onClick, width, height}: CrossProps) {
    return (
         <img className='cross' src="./cross.svg" alt="Cross" onClick={()=>onClick && onClick()} width={width||48} height={height||48} />
    );
}