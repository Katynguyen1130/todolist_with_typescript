import React, { useState } from 'react';
import propTypes from 'prop-types';
import styles from './taskList.module.scss';
import { Task } from '../../@types/task.type';
import { TaskType } from '../../Proptype/task.proptypes';


interface TaskListProps {
    done: boolean,
    taskList: Task[],
    toggleTodoStatus: (id: string, finished: boolean) => void,
    getCurrentTask: (name: string) => void,
    deleteTask: (id: string) => void
}


export default function TaskList(props: TaskListProps) {
    const { done, taskList, toggleTodoStatus, getCurrentTask, deleteTask } = props;
    const handleFinishStatus = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        toggleTodoStatus(id, event.target.checked);
    }

    return (
        <div>
            <h2 className={styles.title}>
                {done ? "Finished" : "To Do"}
            </h2>
            <div className={styles.tasks}>
                {taskList.map(task => {
                    return (
                        <div className={styles.task} key={task.id}>
                            <input type="checkbox" checked={task.finished} onChange={handleFinishStatus(task.id)} />
                            <span className={styles.taskname}> {task.name} </span>
                            <div className={styles.taskActions}>
                                <button className={styles.taskBtn} onClick={() => { getCurrentTask(task.id) }}>
                                    🖋️
                                </button>
                                <button className={styles.taskBtn} onClick={() => { deleteTask(task.id) }}>
                                    🗑️
                                </button>
                            </div>

                        </div>
                    )
                })}

            </div>
        </div>
    )
}

TaskList.propTypes = {
    done: propTypes.bool,
    TaskList: propTypes.arrayOf(TaskType),
    toggleTodoStatus: propTypes.func,
    getCurrentTask: propTypes.func,
    deleteTask: propTypes.func,
}