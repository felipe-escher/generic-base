export as namespace usuarios;

export { UsuariosDataService } from './usuarios-data.service';

import { baseEfModel } from '../core';
export interface UsuarioDto extends baseEfModel {
    id?: number;
    guid?: string;
    login?: string;
    nome?: string;
    email?: string;
    permissoes?: any;
    ativo?: boolean;
}
