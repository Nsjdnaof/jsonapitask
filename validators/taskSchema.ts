import Ajv = require('ajv');
import { ValidateFunction } from 'ajv';
import { ITask } from '../controller/task';

const ajv = new Ajv({allErrors: true});

export class ValidateSchema {

    private schema: ValidateFunction

    constructor(data: any) {

        this.schema = ajv.compile(data);
    }

    validate(data: ITask): boolean|PromiseLike<ValidateFunction> {
        return this.schema(data);
    }

    getError(): string {
        return ajv.errorsText(this.schema.errors);
    }
}