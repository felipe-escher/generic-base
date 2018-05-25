import { IComponentOptions } from 'angular';

export class HeaderComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'HeaderController';
        this.template = require('app/layout/header/header.html!text');
    }
}