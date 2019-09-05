import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../services/ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { CarrinhoService } from '../services/carrinho.service'

/*import { Observable, Observer, Subscription } from 'rxjs';
import {interval} from 'rxjs'
*/
@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService]
})
export class OfertaComponent implements OnInit , OnDestroy{
public oferta : Oferta

/*private tempoObservableSubscription : Subscription

private meuObservableTesteSubscription : Subscription
*/
  constructor(private route : ActivatedRoute, private ofertasService: OfertasService, private carrinhoService : CarrinhoService) { }

  ngOnInit() {  
   
   /* this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
    .then(( resposta : Oferta ) => { this.oferta = resposta })
    .catch(( erro : any ) => { console.log( erro ) })
    */
   
    this.route.params.subscribe((parametro : any ) => { 
      this.ofertasService.getOfertaPorId(parametro.id)
          .then( (resposta : Oferta) => this.oferta = resposta )},
          (erro)=> console.log(erro),
          ()=>console.log("processamento classificado como concluído !!! ")
    )
    
  
    /*
   let tempo = interval(2000)
   this.tempoObservableSubscription  = tempo.subscribe( (intervalo : number) => {
      console.log(intervalo)
    })


    //Observavel
    let meuObservavelTeste= Observable.create((observer: Observer<string>)=> {
      observer.next('primeiro evento da stream')
      observer.next('segundo evento da stream')
      observer.complete()
    })

    //Observador
   this.meuObservableTesteSubscription = meuObservavelTeste.subscribe(
      (instrucao : any)=> console.log(instrucao),
      (erro : any ) => console.log(erro),
      () => console.log('A stream de eventos foi finalizada')
      )
     */ 
  }


  ngOnDestroy(){}

 public adicionarAoCarrinho(oferta : Oferta){
    this.carrinhoService.adicionarItem(this.oferta)
    console.log(this.carrinhoService.exibirItens())
  } 

}
