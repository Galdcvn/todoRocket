import { ChangeEvent, useState } from 'react';
import { Trash } from 'phosphor-react';
import styles from './Task.module.css'

interface taskType {
    text: string;
    id: string;
    deleteTasks: (taskId: string) => void;
    completedTasks: (value: number) => void;
}

export function Task({text, id, deleteTasks, completedTasks}: taskType){
    
    const [textClass, setTextClass] = useState<string>(styles.normalText)

    function handleChangeCheckbox(event: ChangeEvent<HTMLInputElement>){
        if(event.currentTarget.checked){
            completedTasks(1)
            setTextClass(styles.lineThroughText)
        } else {
            completedTasks(-1)
            setTextClass(styles.normalText)
        }
    }

    function handleDeleteTasks() {
        deleteTasks(id)
    }

    return (
        <div className={styles.task}>
            <div>
                <input type="checkbox" id={id} onChange={handleChangeCheckbox}/>
                <label htmlFor={id}></label>
            </div>
            <p className={textClass}>{text}</p>
            <button onClick={handleDeleteTasks} className={styles.deleteButton}><Trash size={14} /></button>
        </div>
    )
}