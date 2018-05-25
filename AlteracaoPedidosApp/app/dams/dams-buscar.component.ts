import { IComponentOptions } from 'angular';

export class DamsBuscarComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'damsBuscarController';
        this.template = require('app/dams/dams-buscar.html!text');
    }
}