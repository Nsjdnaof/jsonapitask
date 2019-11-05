"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskSchema_1 = require("../validators/taskSchema");
const mysql_1 = require("../db/mysql");
const alasql_1 = require("../db/alasql");
const Template = __importStar(require("./task_templates"));
const TaskSchema = new taskSchema_1.ValidateSchema(Template.SchemaTask());
let Database;
class Task {
    constructor(isTest) {
        Database = (!isTest ? (new mysql_1.MySQL()) : (new alasql_1.AlaSQL()));
    }
    create(req, res) {
        req.body.task_priority = parseInt(req.body.task_priority);
        let isValidSchema = TaskSchema.validate(req.body);
        if (!isValidSchema) {
            let SchemaError = TaskSchema.getError();
            Database.onError(res, { message: SchemaError });
            return SchemaError;
        }
        let query = Template.onCreateTask(req.body);
        Database.create(req, res, query);
    }
    remove(req, res) {
        req.body.task_id = parseInt(req.body.task_id);
        let isValidSchema = TaskSchema.validate(req.body);
        if (!isValidSchema) {
            let SchemaError = TaskSchema.getError();
            Database.onError(res, { message: SchemaError });
            return SchemaError;
        }
        let id = req.body.task_id;
        let query = Template.onRemoveTask(id);
        Database.remove(req, res, query);
    }
    showTopPriorityTask(req, res) {
        let query = Template.onShowTopPriorityTask();
        return Database.showTopPriorityTask(req, res, query);
    }
}
exports.Task = Task;
