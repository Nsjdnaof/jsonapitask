"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
class ValidateSchema {
    constructor(data) {
        this.schema = ajv.compile(data);
    }
    validate(data) {
        return this.schema(data);
    }
    getError() {
        return ajv.errorsText(this.schema.errors);
    }
}
exports.ValidateSchema = ValidateSchema;
