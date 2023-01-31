import React, { useState, useEffect } from 'react';


import TaskInput from "../TaskInput/TaskInput";
import TaskList from "../TaskList";
import styles from "./todoList.module.scss";
import { Task } from '../../@types/task.type'

interface handleNewTask {
    (tasks: Task[]): Task[]
}
const syncToLocal = (handleNewTask: handleNewTask) => {
    const localTasks = localStorage.getItem('tasks');
    const localTasksObj: Task[] = JSON.parse(localTasks || '[]');
    const newTaskObj = handleNewTask(localTasksObj);
    localStorage.setItem('tasks', JSON.stringify(newTaskObj))
}

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const unfinishedTasks = tasks.filter(task => !task.finished);
    const finishedTasks = tasks.filter(task => task.finished)

    useEffect(() => {
        const localTasks = localStorage.getItem('tasks');
        const localTasksObj: Task[] = JSON.parse(localTasks || '[]');
        setTasks(localTasksObj);
    }, [])

    const getCurrentTask = (id: string) => {
        const thisTask = tasks.find(task => task.id === id);
        if (thisTask) { setCurrentTask(thisTask) }
    }

    const editTask = (name: string) => {

        setCurrentTask((prev) => {
            return prev ? { ...prev, name } : null
        })

    }

    const finishEditTask = (currentTask: Task) => {

        const handler = (taskObj: Task[]) => {
            return taskObj.map((task) => {
                if (task.id === currentTask.id) {
                    return currentTask
                } else { return task }
            })
        }
        setTasks(handler);

        setCurrentTask(null);
        syncToLocal(handler);
    }



    const addTask = (name: string) => {

        const task: Task = {
            name: name,
            finished: false,
            id: new Date().toISOString(),
        }

        const handler = (taskObj: Task[]) => {
            return [...taskObj, task]
        }
        setTasks(prev => ([...prev, task]));
        syncToLocal(handler);

    }
    const toggleTodoStatus = (id: string, finished: boolean) => {
        const handler = (taskObj: Task[]) => {
            return taskObj.map(task => {
                if (task.id === id) {
                    return { ...task, finished: finished }
                } else return task;
            })
        }
        setTasks(handler);
        syncToLocal(handler);
    }

    const deleteTask = (id: string) => {
        const handler = (taskObj: Task[]) => {
            return taskObj.filter(task => task.id !== id)
        }
        setTasks(handler)
        if (currentTask && currentTask.id === id) {
            setCurrentTask(null)
        }
        syncToLocal(handler)
    }



    return (
        <div className={styles.todoList}>
            <div className={styles.todoWrap}>
                <TaskInput addTask={addTask} currentTask={currentTask} editTask={editTask}
                    finishEditTask={finishEditTask} />
                <TaskList taskList={unfinishedTasks}
                    done={false}
                    toggleTodoStatus={toggleTodoStatus}
                    getCurrentTask={getCurrentTask}
                    deleteTask={deleteTask}
                />
                <TaskList taskList={finishedTasks}
                    done
                    toggleTodoStatus={toggleTodoStatus}
                    getCurrentTask={getCurrentTask}
                    deleteTask={deleteTask} />
            </div>
        </div>
    )
}
