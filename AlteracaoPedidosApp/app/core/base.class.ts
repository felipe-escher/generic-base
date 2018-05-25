import * as swal from 'sweetalert';

export class BaseClassController {
    protected logger: logger.ILogger;

    public carregando: boolean;

    constructor(logger: logger.ILogger) {
        this.logger = logger;
    }

    protected callbackFail: (erro: any) => void = (erro: any) => {
        this.desativaCarregando();
        this.logger.log(erro.data);
        if (erro.status === 304) {
            swal({
                showConfirmButton: false,
                title: 'Sem alterações!',
                text: 'Nenhuma alteração realizada.',
                timer: 2000,
                type: 'warning'
            });
        } else if (erro.data !== null) {
            this.logger.log(erro.data);
            swal({
                title: 'Erro!',
                text: erro.data.exceptionMessage,
                type: 'error'
            });
        } else {
            this.logger.log(erro);
            swal({
                title: 'Erro!',
                text: erro,
                type: 'error'
            });
        }
    }

    public ativaCarregando: () => void = () => {
        this.carregando = true;
    }

    public desativaCarregando: () => void = () => {
        this.carregando = false;
    }
}