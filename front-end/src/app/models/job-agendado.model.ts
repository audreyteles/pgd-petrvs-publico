import { Base } from './base.model';

export class JobAgendado extends Base {
    public nome: string = "";
    public classe: string = "";
    public tenant_id: number = 0;
    public minutos: number|null = 0;
    public horas: number|null =  0;
    public dias: number|null =  0;
    public semanas: number|null = 0;
    public meses: number|null = 0;
    public expressao_cron: string = "";
    public ativo: boolean = true;
    public parameters: any;
    public constructor(data?: any) { super(); this.initialization(data); }

    [key: string]: any;
}