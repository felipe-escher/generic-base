import swal from 'sweetalert2';
import { IModalServiceInstance } from 'angular-ui-bootstrap';
import { FileUploaderFactory, FileUploader, FileItem } from 'angular-file-upload';
import 'angular-local-storage';
import LocalStorage = angular.local.storage;

import { IAppSettings } from '../core';
import { IAuthorizationData } from '../auth';
import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { DamsDataService, DamDto } from '../dams';

export class DamsImagensController extends BaseClassController {
    private modalInstance: IModalServiceInstance;
    private resolve: any;

    public caminhoImagem: string;
    public dam: DamDto;
    public exibeDeletar: boolean;
    public uploader: FileUploader;

    public static $inject: string[] = ['damsDataService', 'logger', 'FileUploader', 'localStorageService', 'appSettings'];
    constructor(
        private dataService: DamsDataService,
        logger: ILogger,
        fileUploader: FileUploaderFactory,
        private localStorageService: LocalStorage.ILocalStorageService,
        private appSettings: IAppSettings,
    ) {
        super(logger);
        let authData: IAuthorizationData = this.localStorageService.get<IAuthorizationData>('authorizationData');
        let headers: any = {
            'Authorization': 'Bearer ' + authData.token
        };
        this.uploader = new fileUploader({
            headers: headers
        });
        this.caminhoImagem = appSettings.caminhoImagem;
        this.exibeDeletar = true;
    }

    public $onInit = () => {
        this.dam = this.resolve.dam;
        this.uploader.url = this.appSettings.apiServiceBaseUri + '/api/dams/uploadImagem/' + this.dam.id;
        this.uploader.onCompleteItem = this.onCompleteUpload;
        if (this.dam.solucionadorId !== null) {
            this.exibeDeletar = false;
        }
    }

    public onCompleteUpload = (fileItem: FileItem, response: any, status: any, headers: any) => {
        this.dam = response;
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Imagem adicionada com sucesso.',
            timer: 2000,
            type: 'success'
        });

        this.logger.log(fileItem);
        this.logger.log(status);
        this.logger.log(headers);
    }

    public deleteImagem = (damId: number, imagemId: number) => {
        this.dataService
            .deleteImagem(damId, imagemId)
            .then((dam => {
                this.dam = dam;
                swal({
                    showConfirmButton: false,
                    title: 'Sucesso!',
                    text: 'Imagem removida com sucesso.',
                    timer: 2000,
                    type: 'success'
                });
            }))
            .catch(this.callbackFail);
    }

    public fecharModal = () => {
        this.modalInstance.dismiss('cancelar');
    }
}