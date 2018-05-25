export class HeaderDataService {
    public atendenteConectado: boolean;

    public static $inject: string[] = [];
    constructor() {
        this.atendenteConectado = false;
    }
}