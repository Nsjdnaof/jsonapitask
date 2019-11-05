import { Request, Response } from 'express';
import { ValidateSchema } from '../validators/taskSchema';
import { ValidateFunction } from 'ajv';
import { MySQL } from '../db/mysql';
import { AlaSQL } from '../db/alasql';
import * as Template from './task_templates';

const TaskSchema = new ValidateSchema(Template.SchemaTask());

export interface ITask {
    task_id?: number,
    task_name: string,
    task_priority: number
}

let Database: any

export class Task {

    constructor(isTest: boolean){
        Database = (!isTest ? (new MySQL()) : (new AlaSQL()));
    }

    create(req: Request, res: Response) {
        req.body.task_priority = parseInt(req.body.task_priority);

        let isValidSchema: boolean|PromiseLike<ValidateFunction> = TaskSchema.validate(req.body);
        if(!isValidSchema) {
            let SchemaError: string = TaskSchema.getError();
            Database.onError(res, { message: SchemaError });
            return SchemaError;
        }

        let query: string = Template.onCreateTask(req.body);
        Database.create(req, res, query);
    }

    remove(req: Request, res: Response) {
        req.body.task_id = parseInt(req.body.task_id);

        let isValidSchema: boolean|PromiseLike<ValidateFunction> = TaskSchema.validate(req.body);
        if(!isValidSchema) {
            let SchemaError: string = TaskSchema.getError();
            Database.onError(res, { message: SchemaError });
            return SchemaError;
        }

        let id: number = req.body.task_id;
        let query: string = Template.onRemoveTask(id);
        Database.remove(req, res, query);
    }

    showTopPriorityTask(req: Request, res: Response) {
        let query: string = Template.onShowTopPriorityTask();

        return Database.showTopPriorityTask(req, res, query);
    }

}