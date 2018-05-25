import { IComponentOptions } from 'angular';

export class DamsAtivosComponent implements IComponentOptions {
    public bindings: {[boundProperty: string]: string};
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'damsAtivosController';
        this.bindings = { ativos: '<', damId: '<', atender: '<' };
        this.template = require('app/dams/dams-ativos.html!text');
    }
}
