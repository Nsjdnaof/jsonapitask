"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("../controller/task");
exports.router = express_1.Router();
const RouteTask = new task_1.Task(false);
exports.router.route('/')
    .get(RouteTask.showTopPriorityTask)
    .post(RouteTask.create)
    .delete(RouteTask.remove);
