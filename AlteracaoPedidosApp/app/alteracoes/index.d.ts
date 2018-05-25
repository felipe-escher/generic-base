export as namespace alteracoes;

export { AlteracoesDataService } from './alteracoes-data.service';

import { baseEfModel } from '../core';
export interface AlteracaoDto extends baseEfModel {
    [key: number]: number;
    numPedido?: string;
    pedidosCadados?: string;
    dataSolicitacao?: string;
    dataRecebido?: string;
    dataUltimaAlteracao?: string;
    solicitanteId?: number;
    solicitanteNome?: string;
    recebedorId?: number;
    recebedorNome?: string;
    filialDe?: string;
    filialPara?: string;
    horarioRetiradaDe?: string;
    horarioRetiradaPara?: string;
    enderecoEntrega?: string;
    numRomaneio?: string;
    motivo?: string;
    atendida?: boolean;
    observacoes?: string;
    setorRequisitante?: number;
    setorRequisitanteNome?: string;
}

export interface ParametrosBusca {
    DataDe: string;
    DataAte: string;
    NumPedido: string;
    SolicitanteId: number;
    SetorRequisitante: number;
    FilialDe: string;
    FilialPara: string;
}

export interface AlteracoesPorSetor {
    setorRequisitante: number;
    setorRequisitanteNome: string;
    quantidade: number;
}

export interface AlteracoesPorAtendentes {
    SolicitanteNome: string;
    quantidade: number;
}

export interface DashboardModel {
    alteracoesPorAtendentes: AlteracoesPorAtendentes[];
    alteracoesPorSetor: AlteracoesPorSetor[];
}
