"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const alasql = require('alasql');
const Template = __importStar(require("../controller/task_templates"));
class AlaSQL {
    constructor() {
        this.connect();
        this.init();
    }
    connect() {
        this.connection = new alasql.Database();
    }
    init() {
        let query = Template.onCreateTableTask();
        this.connection.exec(query);
    }
    create(req, res, query) {
        this.connection.exec(query);
    }
    remove(req, res, query) {
        this.connection.exec(query);
    }
    showTopPriorityTask(req, res, query) {
        return this.connection.exec(query);
    }
    onError(res, msg) { }
    onResponse(res, code, msg) { }
}
exports.AlaSQL = AlaSQL;
