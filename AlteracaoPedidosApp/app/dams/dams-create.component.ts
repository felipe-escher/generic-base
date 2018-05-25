import { IComponentOptions } from 'angular';

export class DamsCreateComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'damsCreateController';
        this.template = require('app/dams/dams-create.html!text');
    }
}