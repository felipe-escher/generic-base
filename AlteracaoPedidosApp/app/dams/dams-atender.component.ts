import { IComponentOptions } from 'angular';

export class DamsAtenderComponent implements IComponentOptions {
    public bindings: {[boundProperty: string]: string};
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'damsAtenderController';
        this.bindings = { 'modalInstance': '<', 'resolve': '<' };
        this.template = require('app/dams/dams-atender.html!text');
    }
}