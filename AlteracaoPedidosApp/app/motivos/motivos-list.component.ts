import { IComponentOptions } from 'angular';

export class MotivosListComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'motivosListController';
        this.template = require('app/motivos/motivos-list.html!text');
    }
}