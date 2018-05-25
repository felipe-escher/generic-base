import { IComponentOptions } from 'angular';

export class DashboardComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'dashboardController';
        this.template = require('app/dashboard/dashboard.html!text');
    }
}