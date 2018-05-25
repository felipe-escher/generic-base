import { IComponentOptions } from 'angular';

export class DamsHistoricoComponent implements IComponentOptions {
    public bindings: {[boundProperty: string]: string};
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'damsHistoricoController';
        this.bindings = { 'modalInstance': '<', 'resolve': '<' };
        this.template = require('app/dams/dams-historico.html!text');
    }
}