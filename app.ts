import express = require('express');
import bodyParser = require('body-parser');
import { Application } from 'express';
import { router } from './routers/taskRoutes';

export class App {
    private app: Application
    private PORT: string|number

    constructor(port: number) {

        this.app = express();
        this.PORT = process.env.PORT || port;
        this.configure();
    }

    configure() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(router);
    }

    run() {
        this.app.listen(this.PORT, () => {
            console.log(`Server has been started on port ${this.PORT}`);
        });
    }
}

let app = new App(3000);
app.run();