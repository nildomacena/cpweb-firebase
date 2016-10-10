export class Objeto{
    public name:string;
    constructor(name: string){ 
        this.name = name;
    }
}

export const LISTA_OBJETOS: Objeto [] = 
[
    new Objeto('Alimentos'),
    new Objeto('Ar Condicionado'),
    new Objeto('Cartão de Ponto'),
    new Objeto('Colchão'),
    new Objeto('Gás'),
    new Objeto('Copa e Cozinha'),
    new Objeto('Correlatos'),
    new Objeto('Enxoval'),
    new Objeto('Informática'),
    new Objeto('Material de combate a incêndio'),
    new Objeto('Material  de Expediente'),
    new Objeto('Material de Limpeza, Higienização e Descartáveis'),
    new Objeto('Medicamentos'),
    new Objeto('Recarga de Extintores'),
    new Objeto('Serviço de Material de Resgate'),
    new Objeto('Serviço de publicação'),
    new Objeto('Serviço de Buffet'),
    new Objeto('Serviços gráficos')
];