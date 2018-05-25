import { IComponentOptions } from 'angular';

export class MotivosUpdateComponent implements IComponentOptions {
    public template: string;
    public controller: string;
    public bindings: {[boundProperty: string]: string};

    constructor() {
        this.bindings = { 'motivoId': '<' };
        this.controller = 'motivosUpdateController';
        this.template = require('app/motivos/motivos-update.html!text');
    }
}