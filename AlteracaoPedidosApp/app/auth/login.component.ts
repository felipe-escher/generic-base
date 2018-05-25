import { IComponentOptions } from 'angular';

export class LoginComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'loginController';
        this.template = require('app/auth/login.html!text');
    }
}