import { IComponentOptions } from 'angular';

export class DamsBuscarMedicoComponent implements IComponentOptions {
    public bindings: {[boundProperty: string]: string};
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'damsBuscarMedicoController';
        this.bindings = { 'modalInstance': '<', 'resolve': '<' };
        this.template = require('app/dams/dams-buscarMedico.html!text');
    }
}