import { ItemCarrinho } from '../shared/item-carrinho.model'
import { Oferta } from '../shared/oferta.model'

export class CarrinhoService {
    
public  itens : ItemCarrinho [] = []
constructor(){}

    public exibirItens(): ItemCarrinho[]{
        return this.itens
    }

    public adicionarItem(oferta : Oferta){

        let itemCarrinho : ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

      let itemCarrinhoEncontrado =  this.itens.find((item : ItemCarrinho)=> item.id === itemCarrinho.id )

      if(itemCarrinhoEncontrado){
           itemCarrinhoEncontrado.quantidade++ 
      }else{
          this.itens.push(itemCarrinho)
      }
   
    }

    public valorTotalPedido():number{
       let valorTotalPedido : number =0  
       this.itens.map( (item : ItemCarrinho ) =>{
           valorTotalPedido += item.quantidade * item.valor
       })
      return valorTotalPedido
    } 
    
    public diminuirQuantidade(id:number):void{
       let itemDiminuirQtd = this.itens.find( (item : ItemCarrinho)=>{
         return  item.id === id
       })
       if(itemDiminuirQtd.quantidade===1){
         this.itens.splice(this.itens.indexOf(itemDiminuirQtd), 1)
       }else if(itemDiminuirQtd.quantidade > 0){
         itemDiminuirQtd.quantidade--
       }      
    }
    public aumentarQuantidade(id:number):void{
        let itemAumentarQtd = this.itens.find( (item : ItemCarrinho)=>{
          return  item.id === id
        })
            itemAumentarQtd.quantidade++           
        
     }

     public excluirCarrinho(){
       this.itens = []
     }
}