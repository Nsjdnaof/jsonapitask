import express = require('express');
import { Router } from 'express';
import { Task } from '../controller/task';

export const router: Router = Router();
const RouteTask = new Task(false);

router.route('/')
	.get(RouteTask.showTopPriorityTask)
	.post(RouteTask.create)
	.delete(RouteTask.remove);