export as namespace motivos;

export { MotivosDataService } from './motivos-data.service'

import { baseEfModel } from '../core';
export interface MotivoDto extends baseEfModel {
    [key: number]: number;
    descricao?: string;
    ativo?: boolean;
}
