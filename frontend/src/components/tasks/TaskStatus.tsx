import styles from './TaskStatus.module.scss';

type TaskStatusProps = {
    completed: boolean
};


export default function TaskStatus({completed}: TaskStatusProps) {

    const completeElement = <span className={styles.complete}>
        <img src='/images/icon-complete.svg'/>
    </span>;

    const incompleteElement = <span className={styles.incomplete}>
        <span/>
        <span/>
        <span/>
    </span>;

    return (completed ? completeElement : incompleteElement);

}