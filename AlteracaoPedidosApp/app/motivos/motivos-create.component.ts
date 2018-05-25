import { IComponentOptions } from 'angular';

export class MotivosCreateComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'motivosCreateController';
        this.template = require('app/motivos/motivos-create.html!text');
    }
}