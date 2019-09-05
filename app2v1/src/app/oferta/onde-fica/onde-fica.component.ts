import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../../services/ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers : [OfertasService]
})
export class OndeFicaComponent implements OnInit {
  public ondeFica : any 

  constructor( private route : ActivatedRoute , private ofertasService : OfertasService ) { }

  ngOnInit() {

    this.route.parent.params.subscribe(( parametro : any)=>{
      this.ofertasService.getOndeFicaOfertaPorId(parametro.id)
      .then(( resposta : string ) => { 
        this.ondeFica = resposta
        console.log(this.ondeFica[0])})
      .catch(( erro : any ) => console.log( erro ))
    })
  }

}
