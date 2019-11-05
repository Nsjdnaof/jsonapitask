"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes_1 = require("./routers/taskRoutes");
class App {
    constructor(port) {
        this.app = express();
        this.PORT = process.env.PORT || port;
        this.configure();
    }
    configure() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(taskRoutes_1.router);
    }
    run() {
        this.app.listen(this.PORT, () => {
            console.log(`Server has been started on port ${this.PORT}`);
        });
    }
}
exports.App = App;
let app = new App(3000);
app.run();
