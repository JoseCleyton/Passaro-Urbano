import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../../app/services/ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../services/carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public itensCarrinho : ItemCarrinho [] = []
  public idPedidoCompra : number 
  public formulario : FormGroup =  new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)] ),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento':new FormControl(null),
    'formaPagamento':new FormControl(null, Validators.required)

  })

  constructor(private ordemCompraService: OrdemCompraService , public carrinhoService : CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho= this.carrinhoService.exibirItens()
   
  }

  public confirmarCompra(): void {
    // Uma das formas de controlar o envio do formulário válidando as informações passadas 
/*
    if(this.formulario.status === 'INVALID'){      
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()

      console.log("Formulário está inválido")
    }
    console.log("Formulário está válido")
    */

   
   if(this.itensCarrinho.length === 0 ){
     alert("Carrinho vazio")

    }else{
         let pedido = new Pedido(
         this.formulario.value.endereco, 
         this.formulario.value.numero, 
         this.formulario.value.complemento,
         this.formulario.value.formaPagamento,
         this.itensCarrinho
         )
         console.log("PEDIDO" +pedido)
        
        this.ordemCompraService.efetivarCompra(pedido)
        .subscribe( ( pedidoResposta : Pedido ) => {
           console.log(pedido); 
           this.idPedidoCompra = pedidoResposta.id ;
            this.carrinhoService.excluirCarrinho()
      })
      }
    
  }

  public diminuirQuantidade(id : number): void{
    this.carrinhoService.diminuirQuantidade(id);
  }
  public aumentarQuantidade(id : number):void{
    this.carrinhoService.aumentarQuantidade(id)
  }
}
