"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const Template = __importStar(require("../controller/task_templates"));
const DatabaseOptions = {
    host: "db",
    user: "root",
    password: "root",
    database: "database",
    connectionLimit: 50
};
class MySQL {
    constructor() {
        this.connection = mysql.createPool(DatabaseOptions);
        this.connect();
    }
    connect() {
        this.connection.getConnection((err) => {
            if (err)
                throw err;
            console.log("Connected to MySQL");
            this.init();
        });
    }
    init() {
        this.connection.query("CREATE DATABASE IF NOT EXISTS ??", DatabaseOptions.database);
        this.connection.query("USE ??", DatabaseOptions.database);
        this.connection.query(Template.onCreateTableTask());
    }
    create(req, res, query) {
        this.connection.query(query, (err, result) => {
            if (err) {
                this.onError(res, { message: err });
            }
            else {
                this.onResponse(res, 201, { message: `Task ${req.body.task_name} has been added` });
            }
        });
    }
    remove(req, res, query) {
        this.connection.query(query, (err, result) => {
            if (err) {
                this.onError(res, { message: err });
            }
            else {
                this.onResponse(res, 202, { message: `Task id ${req.body.task_id} has been deleted` });
            }
        });
    }
    showTopPriorityTask(req, res, query) {
        this.connection.query(query, (err, result) => {
            if (err) {
                this.onError(res, { message: err });
            }
            else {
                this.onResponse(res, 200, result[0]);
            }
        });
    }
    onError(res, msg) {
        if (res)
            res.status(501).json(msg);
    }
    onResponse(res, code, msg) {
        if (res)
            res.status(code).json(msg);
    }
}
exports.MySQL = MySQL;
