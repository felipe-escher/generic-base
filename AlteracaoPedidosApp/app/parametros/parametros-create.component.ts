import { IComponentOptions } from 'angular';

export class ParametrosCreateComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'parametrosCreateController';
        this.template = require('app/parametros/parametros-create.html!text');
    }
}