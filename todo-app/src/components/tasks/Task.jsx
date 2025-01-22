import './Task.css';

export default function Task({name, completed}) {

    return (
        <div className="task">
            <h2>{name}</h2>
            <h2>{(completed===true)?"😎":"😥"}</h2>
        </div>
    ); 
}