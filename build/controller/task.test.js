"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./task");
const taskSchema_1 = require("../validators/taskSchema");
const Template = __importStar(require("./task_templates"));
let res = {};
let req = { body: {} };
let controller;
const TaskSchema = new taskSchema_1.ValidateSchema(Template.SchemaTask());
class TaskController {
    constructor() {
        controller = new task_1.Task(true);
    }
    create(data) {
        req.body = data;
        controller.create(req, res);
    }
    pool(data) {
        data.map((val) => {
            this.create(val);
        });
    }
    remove(id) {
        req.body = { task_id: id };
        controller.remove(req, res);
    }
    showTopPriorityTask() {
        req.body = {};
        return controller.showTopPriorityTask(req, res);
    }
}
describe('Task queries test', () => {
    it('should return empty array', () => {
        let Controller = new TaskController();
        let result = Controller.showTopPriorityTask();
        expect(result).toEqual([]);
    });
    it('should return only one result', () => {
        let Controller = new TaskController();
        let TaskData = [
            { task_name: "1st Task", task_priority: 3 },
            { task_name: "2nd Task", task_priority: 9 },
            { task_name: "3th Task", task_priority: 9 }
        ];
        Controller.pool(TaskData);
        let result = Controller.showTopPriorityTask();
        expect(result).toHaveLength(1);
    });
    it('should return schema error by task_name (length > 255)', () => {
        let str = new Array(500).join('A'); // srt.length == 499
        let Controller = new TaskController();
        req.body = { task_name: str, task_priority: 3 };
        let result = controller.create(req, res);
        expect(result).toMatch("data.task_name should NOT be longer than 255 characters");
    });
    it('should have correct properties', () => {
        let Controller = new TaskController();
        let TaskData = { task_name: "123task", task_priority: 10 };
        Controller.create(TaskData);
        let result = Controller.showTopPriorityTask();
        expect(result[0]).toHaveProperty("task_id");
        expect(result[0]).toHaveProperty("task_name");
        expect(result[0]).toHaveProperty("task_priority");
    });
    it('check for correct json schema', () => {
        let Controller = new TaskController();
        let TaskData = { task_name: "String", task_priority: 1 };
        Controller.create(TaskData);
        let result = Controller.showTopPriorityTask();
        expect(TaskSchema.validate(result[0])).toBeTruthy();
    });
    it('should return schema error by task_priority < 0', () => {
        let Controller = new TaskController();
        req.body = { task_name: "taskname", task_priority: -5 };
        let result = controller.create(req, res);
        expect(result).toMatch("data.task_priority should be >= 0");
    });
    it('should return schema error by task_priority > 100', () => {
        let Controller = new TaskController();
        req.body = { task_name: "taskname2", task_priority: 99999 };
        let result = controller.create(req, res);
        expect(result).toMatch("data.task_priority should be <= 100");
    });
    it('should return top priority task', () => {
        let Controller = new TaskController();
        let TaskData = [
            { task_name: "some task", task_priority: 5 },
            { task_name: "next task", task_priority: 17 },
            { task_name: "another task", task_priority: 36 },
            { task_name: "Top Priority Task", task_priority: 95 },
            { task_name: "5nd task", task_priority: 89 },
            { task_name: "last", task_priority: 57 }
        ];
        Controller.pool(TaskData);
        let result = Controller.showTopPriorityTask();
        expect(result[0].task_priority).toBe(95);
        expect(result[0].task_name).toMatch("Top Priority Task");
    });
    it('should return task with low priority', () => {
        let Controller = new TaskController();
        let TaskData = [
            { task_name: "Top priority task", task_priority: 99 },
            { task_name: "Low priority task", task_priority: 11 }
        ];
        Controller.pool(TaskData);
        let result = Controller.showTopPriorityTask();
        Controller.remove(result[0].task_id);
        result = Controller.showTopPriorityTask();
        expect(result[0].task_priority).toBe(11);
        expect(result[0].task_name).toMatch("Low priority task");
    });
    it('should return task with correct id', () => {
        let Controller = new TaskController();
        let TaskData = [
            { task_name: "task_100", task_priority: 3 },
            { task_name: "task_90", task_priority: 6 },
            { task_name: "task_80", task_priority: 9 },
            { task_name: "task_70", task_priority: 12 },
            { task_name: "task_60", task_priority: 15 },
            { task_name: "task_50", task_priority: 18 } //task_id == 6
        ];
        Controller.pool(TaskData);
        let result = Controller.showTopPriorityTask();
        expect(result[0].task_id).toBe(6);
    });
    it('should return correct object', () => {
        let Controller = new TaskController();
        let TaskData = { task_name: "Test", task_priority: 5 };
        Controller.create(TaskData);
        let result = Controller.showTopPriorityTask();
        expect(result).toMatchObject([{
                task_id: 1,
                task_name: "Test",
                task_priority: 5
            }]);
    });
    it('should return task schema error by task_priority field', () => {
        let Controller = new TaskController();
        req.body = { task_name: "Test schema", task_priority: 102 };
        let result = controller.create(req, res);
        expect(result).toMatch("data.task_priority should be <= 100");
    });
});
