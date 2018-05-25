import { IComponentOptions } from 'angular';

export class DamsImagensComponent implements IComponentOptions {
    public bindings: {[boundProperty: string]: string};
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'damsImagensController';
        this.bindings = { 'modalInstance': '<', 'resolve': '<' };
        this.template = require('app/dams/dams-imagens.html!text');
    }
}