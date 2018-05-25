import { IAuthService } from '../../auth';

export class SidebarController {
    public static $inject: string[] = ['AuthService'];
    constructor(public authService: IAuthService) { }
}
