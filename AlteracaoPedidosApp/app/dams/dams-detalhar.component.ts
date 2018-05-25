import { IComponentOptions } from 'angular';

export class DamsDetalharComponent implements IComponentOptions {
    public template: string;
    public controller: string;
    public bindings: {[boundProperty: string]: string};

    constructor() {
        this.bindings = { 'damId': '<' };
        this.controller = 'damsDetalharController';
        this.template = require('app/dams/dams-detalhar.html!text');
    }
}