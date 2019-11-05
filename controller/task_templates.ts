import { ITask } from './task';

export function onCreateTask(data: ITask): string {

    let taskName: string = data.task_name;
    let taskPriority: number = data.task_priority;

    let queryString: string = `INSERT INTO TASKS(task_name, task_priority) VALUES('${taskName}', ${taskPriority})`;
    return queryString;
}

export function onRemoveTask(id: number): string {

    let queryString = `DELETE FROM TASKS WHERE task_id = ${id}`;
    return queryString;
}

export function onShowTopPriorityTask(): string {

    let queryString = "SELECT * FROM TASKS ORDER BY task_priority DESC LIMIT 1";
    return queryString;
}

export function onCreateTableTask(): string {

    let queryString = "CREATE TABLE IF NOT EXISTS TASKS ( task_id INT PRIMARY KEY AUTO_INCREMENT, task_name NVARCHAR(255), task_priority TINYINT NOT NULL)";
    return queryString;
}

export function SchemaTask() {

    return {
        "properties": {
            "task_id": { "type": "number" },
            "task_name": { "type": "string", "maxLength": 255 },
            "task_priority": { "type": "number", "minimum": 0, "maximum": 100 }
        }
    }
}