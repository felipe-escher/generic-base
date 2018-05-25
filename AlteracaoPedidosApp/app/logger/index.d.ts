export as namespace logger;

export = logger;

declare namespace logger {
    export interface ILogger {
        info: (mensagem: string, data?: {}, titulo?: string, options?: ToastrOptions) => JQuery;
        error: (mensagem: string, data?: {}, titulo?: string, options?: ToastrOptions) => JQuery;
        success: (mensagem: string, data?: {}, titulo?: string, options?: ToastrOptions) => JQuery;
        warning: (mensagem: string, data?: {}, titulo?: string, options?: ToastrOptions) => JQuery;
        log: (...args: any[]) => void;
        clear: (toast: JQuery) => void;
    }
}