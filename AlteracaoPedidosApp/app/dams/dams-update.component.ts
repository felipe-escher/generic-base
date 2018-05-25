import { IComponentOptions } from 'angular';

export class DamsUpdateComponent implements IComponentOptions {
    public template: string;
    public controller: string;
    public bindings: {[boundProperty: string]: string};

    constructor() {
        this.bindings = { 'damId': '<' };
        this.controller = 'damsUpdateController';
        this.template = require('app/dams/dams-update.html!text');
    }
}