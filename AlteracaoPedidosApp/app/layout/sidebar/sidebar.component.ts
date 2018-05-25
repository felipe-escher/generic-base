import { IComponentOptions } from 'angular';

export class SidebarComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'sidebarController';
        this.template = require('app/layout/sidebar/sidebar.html!text');
    }
}