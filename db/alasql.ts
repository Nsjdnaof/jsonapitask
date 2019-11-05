const alasql = require('alasql');
import { Request, Response } from 'express';
import { ITask } from '../controller/task';
import * as Template from '../controller/task_templates';

export class AlaSQL {

    private connection: any

    constructor() {

        this.connect();
        this.init();
    }

    private connect() {
        this.connection = new alasql.Database();
    }

    private init() {
        let query: string = Template.onCreateTableTask();
        this.connection.exec(query);
    }

    create(req: Request, res: Response, query: string) {
        this.connection.exec(query);
    }

    remove(req: Request, res: Response, query: string) {
        this.connection.exec(query);
    }

    showTopPriorityTask(req: Request, res: Response, query: string) {
        return this.connection.exec(query);
    }

    onError(res: Response, msg: string) { }
    private onResponse(res: Response, code: number, msg: any) { }

}

