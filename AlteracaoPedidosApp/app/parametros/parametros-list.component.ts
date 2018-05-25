import { IComponentOptions } from 'angular';

export class ParametrosListComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'parametrosListController';
        this.template = require('app/parametros/parametros-list.html!text');
    }
}