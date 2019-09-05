import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfertasService } from  '../services/ofertas.service'
import { Observable, Subject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged ,catchError} from 'rxjs/operators'
import { Oferta } from '../shared/oferta.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit, OnDestroy {
  public ofertasObservable : Observable<Oferta[]>
  private subjectPesquisa : Subject<string> = new Subject
  public textoPesquisa : string

  constructor(private ofertasService : OfertasService ) {}

  ngOnInit() {
   this.ofertasObservable = this.subjectPesquisa.pipe(
      debounceTime(1000) , // executa a ação do switchMap após o tempo determinado em mili segundos
      distinctUntilChanged(), // faz uma comparação para saber se o termo já foi pesquisado
      switchMap(( termoDaBusca : string ) => {
          if(termoDaBusca.trim()=== ''){
            return of<Oferta[]>([]);
          }
            return this.ofertasService.pesquisaOferta( termoDaBusca )
        }),
        catchError( (erro : any ) =>{
          console.log( erro.status )
          return of<Oferta[]>([])
        })
    )
    
  }

  public pesquisa(termoDaBusca : string):void{
    /*
   this.ofertas = this.ofertasService.pesquisaOferta(termoDaBusca)
    this.ofertas.subscribe(
      (oferta : Oferta[])=> console.log(oferta),
      (erro : any) => console.log( 'Erro status' , erro.status),
      () => console.log('Fluxo de eventos completo')
    )
    */
      this.subjectPesquisa.next(termoDaBusca)
      
     }
     public limpaPesquisa():void{
       this.subjectPesquisa.next("")
       this.textoPesquisa = ""
     }

  ngOnDestroy(){
   
  }

}
