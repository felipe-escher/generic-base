export class Logger implements logger.ILogger {
    private $log: ng.ILogService;
    private toastr: Toastr;

    public static $inject: string[] = ['$log', 'toastr'];
    constructor($log: ng.ILogService, toastr: Toastr) {
        this.$log = $log;
        this.toastr = toastr;
    }

    // Sem toastr
    public log(...args: any[]): void {
        this.$log.log(args);
    }

    public error(mensagem: string, data?: {}, titulo?: string, options?: ToastrOptions): JQuery {
        this.$log.error('Erro: ' + mensagem, '\nResumo:', titulo, '\nDetalhes:', data);
        return this.toastr.error(mensagem, titulo, options);
    }

    public info(mensagem: string, data?: {}, titulo?: string, options?: ToastrOptions): JQuery {
        this.$log.info('Info: ' + mensagem, '\nResumo:', titulo, '\nDetalhes:', data);
        return this.toastr.info(mensagem, titulo, options);
    }

    public success(mensagem: string, data?: {}, titulo?: string, options?: ToastrOptions): JQuery {
        this.$log.info('Successo: ' + mensagem, '\nResumo:', titulo, '\nDetalhes:', data);
        return this.toastr.success(mensagem, titulo, options);
    }

    public warning(mensagem: string, data?: {}, titulo?: string, options?: ToastrOptions): JQuery {
        this.$log.warn('Aviso: ' + mensagem, '\nResumo:', titulo, '\nDetalhes:', data);
        return this.toastr.warning(mensagem, titulo, options);
    }

    public clear(toast: JQuery): void {
        this.toastr.clear(toast);
    }
}