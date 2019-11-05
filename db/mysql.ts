import mysql = require('mysql');
import { Request, Response } from 'express';
import { ITask } from '../controller/task';
import * as Template from '../controller/task_templates';

const DatabaseOptions = {
    host: "db",
    user: "root",
    password: "root",
    database: "database",
    connectionLimit: 50
}

export class MySQL {

	private connection: any

    constructor() {

        this.connection = mysql.createPool(DatabaseOptions);
        this.connect();
    }

    private connect() {
        this.connection.getConnection((err: any) => {
            if(err) throw err;
            console.log("Connected to MySQL");

            this.init();
        });
    }

    private init() {

        this.connection.query("CREATE DATABASE IF NOT EXISTS ??", DatabaseOptions.database);
        this.connection.query("USE ??", DatabaseOptions.database);
        this.connection.query(Template.onCreateTableTask());
	}

    create(req: Request, res: Response, query: string) {

        this.connection.query(query, (err: any, result: any) => {
            if(err) {
                this.onError(res, { message: err });
            } else {
                this.onResponse(res, 201, { message: `Task ${req.body.task_name} has been added` });
            }
        });
    }

    remove(req: Request, res: Response, query: string) {

        this.connection.query(query, (err: any, result: any) => {
            if(err) {
                this.onError(res, { message: err });
            } else {
                this.onResponse(res, 202, { message: `Task id ${req.body.task_id} has been deleted` });
            }
        });
    }

    showTopPriorityTask(req: Request, res: Response, query: string) {

        this.connection.query(query, (err: any, result: any) => {
            if(err) {
                this.onError(res, { message: err });
            } else {
                this.onResponse(res, 200, result[0]);
            }
        });
    }

    onError(res: Response, msg: any) {
    	if(res)	res.status(501).json(msg);
    }

    private onResponse(res: Response, code: number, msg: any) {
        if(res)	res.status(code).json(msg);
    }

}

