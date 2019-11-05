"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function onCreateTask(data) {
    let taskName = data.task_name;
    let taskPriority = data.task_priority;
    let queryString = `INSERT INTO TASKS(task_name, task_priority) VALUES('${taskName}', ${taskPriority})`;
    return queryString;
}
exports.onCreateTask = onCreateTask;
function onRemoveTask(id) {
    let queryString = `DELETE FROM TASKS WHERE task_id = ${id}`;
    return queryString;
}
exports.onRemoveTask = onRemoveTask;
function onShowTopPriorityTask() {
    let queryString = "SELECT * FROM TASKS ORDER BY task_priority DESC LIMIT 1";
    return queryString;
}
exports.onShowTopPriorityTask = onShowTopPriorityTask;
function onCreateTableTask() {
    let queryString = "CREATE TABLE IF NOT EXISTS TASKS ( task_id INT PRIMARY KEY AUTO_INCREMENT, task_name NVARCHAR(255), task_priority TINYINT NOT NULL)";
    return queryString;
}
exports.onCreateTableTask = onCreateTableTask;
function SchemaTask() {
    return {
        "properties": {
            "task_id": { "type": "number" },
            "task_name": { "type": "string", "maxLength": 255 },
            "task_priority": { "type": "number", "minimum": 0, "maximum": 100 }
        }
    };
}
exports.SchemaTask = SchemaTask;
