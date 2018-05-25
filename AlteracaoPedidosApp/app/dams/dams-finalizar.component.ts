import { IComponentOptions } from 'angular';

export class DamsFinalizarComponent implements IComponentOptions {
    public bindings: {[boundProperty: string]: string};
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'damsFinalizarController';
        this.bindings = { 'modalInstance': '<', 'resolve': '<' };
        this.template = require('app/dams/dams-finalizar.html!text');
    }
}