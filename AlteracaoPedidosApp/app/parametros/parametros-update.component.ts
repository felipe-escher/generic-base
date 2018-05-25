import { IComponentOptions } from 'angular';

export class ParametrosUpdateComponent implements IComponentOptions {
    public template: string;
    public controller: string;
    public bindings: {[boundProperty: string]: string};

    constructor() {
        this.bindings = { 'parametroId': '<' };
        this.controller = 'parametrosUpdateController';
        this.template = require('app/parametros/parametros-update.html!text');
    }
}