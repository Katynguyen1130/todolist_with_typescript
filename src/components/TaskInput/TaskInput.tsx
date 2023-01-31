import React, { useState } from 'react';
import styles from './taskInput.module.scss';
import { Task } from '../../@types/task.type'


interface TaskInputProps {
    addTask: (name: string) => void,
    currentTask: Task | null,
    editTask: (value: string) => void,
    finishEditTask: (currentTask: Task) => void,
}

export default function TaskInput(props: TaskInputProps) {
    const { addTask, currentTask, editTask, finishEditTask } = props;

    const [name, setName] = useState<string>('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currentTask) {
            finishEditTask(currentTask)
        } else {
            addTask(name);

        }
        setName('');
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (currentTask) {
            editTask(value)

        } else {
            setName(value);
        }


    }
    console.log("curenttask,", currentTask)

    return (
        <div className={styles.taskInput}>
            <h1 className={styles.title}>
                To Do List with Typescript
            </h1>
            <form className={styles.form} onSubmit={(event) => { handleSubmit(event) }}>
                <input type="text" placeholder='Task to do'
                    value={currentTask ? currentTask.name : name}
                    onChange={handleInputChange} />
                <button type="submit" >
                    {
                        currentTask ? '✔️' : '➕'
                    }

                </button>
            </form>
        </div>
    )
}
function editTask(value: string) {
    throw new Error('Function not implemented.');
}

