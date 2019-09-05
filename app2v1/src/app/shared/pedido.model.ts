import { ItemCarrinho } from './item-carrinho.model';

export class Pedido {
    public id : number 
    constructor(public endereco : string ,
         public numero : string ,
         public complemento : string , 
         public formaPagamento : string,
         public itensCarrinho: ItemCarrinho []
         ){}
}